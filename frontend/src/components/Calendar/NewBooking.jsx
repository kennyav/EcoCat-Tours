import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import httpClient from '../../httpClient'

// helper functions
import { creatingNewBooking } from '../../helper/formHelper'

// components
import DropDownMenu from './NBDropDown'
import RadioGroup from './RadioGroup'
import { useSelector, useDispatch } from 'react-redux'
import { updateRefresh } from '../../reducers/refreshSlice'
import Tabs from './Tab'

import { SOURCE, STATUS, RECEIVED, FIAT } from '../../helper/passengerHelper'

export default function NewBooking(props) {
   // redux vars
   const url = useSelector((state) => state.development.value)
   const dispatch = useDispatch()
   const refresh = useSelector((state) => state.refresh.value)
   const salesmanId = useSelector((state) => state.salesman.value)

   // extra
   const passengerNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
   const scheduledEventId = props.scheduledEvent.id
   const [atCapacity, setAtCapacity] = useState(false)
   const [bookerId, setBookerId] = useState('')
   const [isOpen, setOpen] = useState(false)
   const [previousExtra, setPreviousExtra] = useState(0)

   // route vars
   const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      notes: '',
      email: '',
      adultNumber: 0,
      childrenNumber: 0,
      infantNumber: 0,
      adultPrice: 0,
      childrenPrice: 0,
      infantPrice: 0,
      shirts: 0,
      partialPayment: 0,
      t_shirt: 0,
   });

   // states for the drop down
   const [foodOptions, setFoodOption] = useState(0)
   const [paymentSource, setPaymentSource] = useState('')
   const [paymentStatus, setPaymentStatus] = useState('')
   const [fiat, setFiat] = useState('')
   const [commissionReceived, setCommissionReceived] = useState(false)
   const isCreateButtonDisabled = !formData.firstName || !formData.lastName || !formData.adultNumber;
   const inputClass = 'border-2 border-[#0E5BB5] rounded-lg px-5 py-2'
   const [selectTotals, setSelectTotals] = useState({
      adult: 0,
      children: 0,
      infant: 0,
      total: 0
   })

   useEffect(() => {
      const capacity = parseInt(formData.adultNumber,10) + parseInt(formData.childrenNumber) + parseInt(formData.infantNumber)
      if (capacity > props.scheduledEvent.capacity) {
         setAtCapacity(true)
      } else {
         setAtCapacity(false)
      }

   }, [formData.adultNumber, formData.childrenNumber, formData.infantNumber, props.scheduledEvent.capacity])

   useEffect(() => {
      (async () => {
         try {
            const resp = await httpClient.get(`${url}/auth/@me`);
            setBookerId(resp.data.id);
         } catch (error) {
            console.log("Not authenticated");
         }
      })();
   }, [url]);



   function closeModal() {
      dispatch(updateRefresh(!refresh));
      setOpen(false);
   }

   function openModal() {
      setOpen(true)
   }

   const handleInputChange = (key, value) => {
      setFormData(prevState => ({ ...prevState, [key]: value }));
   };

   function handlePaxPriceChange(e) {
      const { id, name, value } = e.target;

      // Update the price for the selected passenger category
      setFormData((prevState) => ({
         ...prevState,
         [name]: value,  // Update price for 'adultPrice', 'childrenPrice', or 'infantPrice'
      }));

      // Calculate the total for the category using the latest formData in the callback
      setSelectTotals((prevTotals) => {
         const passengerCount = formData[id + 'Number'] || 0;  // Get the number of people for the category
         const updatedTotal = value * passengerCount;  // Calculate updated total for the category

         // Calculate the overall sum using the previous state for the totals
         const newSum = {
            ...prevTotals,
            [id]: updatedTotal,  // Set the updated total for this category
         };

         // Sum all the individual totals (adult, children, infant)
         const totalSum = newSum.adult + newSum.children + newSum.infant;

         return {
            ...newSum,
            total: totalSum,  // Update the total sum
         };
      });
   }


   function handlePaxNumberChange(e, price) {
      // if price exists then we can successfully update the total
      const { id, value } = e.target
      if (price) {
         const update = (value * price)
         setSelectTotals((prevState) => {
            const updatedTotals = {
               ...prevState,
               [id]: update,
            };
            // Calculate the new total by summing adult, children, and infant totals
            const newTotal = updatedTotals.adult + updatedTotals.children + updatedTotals.infant;

            return {
               ...updatedTotals,
               total: newTotal,
            };
         });
      }
   }

   function handleTotalChange(e) {
      // we only want to set the price per person
      // for categories that have people
      let peopleTracker = [{ name: 'adult', exists: false }, { name: 'children', exists: false }, { name: 'infant', exists: false }]
      let totalPeople = 0
      let pricePerPerson = 0
      const { value } = e.target


      setSelectTotals((prevState) => ({
         ...prevState,
         ['total']: value,
      }))

      // Loop through people tracker and update the boolean if people exist
      peopleTracker.forEach((people) => {
         const numberOfPeople = parseInt(formData[people.name + 'Number'], 10) || 0; // Ensure it's a number
         if (numberOfPeople > 0) {
            people.exists = true;
            totalPeople += numberOfPeople; // Add the number of people to totalPeople
         }
      });

      pricePerPerson = totalPeople > 0 ? value / totalPeople : 0;
      totalPeople = 0

      // loop through each person and set the price
      peopleTracker.forEach((people) => {
         if (people.exists) {
            setFormData((prevState) => ({
               ...prevState,
               [people.name + 'Price']: pricePerPerson,
            }))
            setSelectTotals((prevState) => ({
               ...prevState,
               [people.name]: pricePerPerson * formData[people.name + 'Number']
            }))
         } else {
            setFormData((prevState) => ({
               ...prevState,
               [people.name + 'Price']: 0,
            }))
            setSelectTotals((prevState) => ({
               ...prevState,
               [people.name]: 0
            }))
         }
      })
   }

   function handlePaxTotalChange(e) {
      const { name, value } = e.target;
   
      // Parse the new passenger count, default to 0 if invalid
      const newPaxTotal = parseInt(value, 10) || 0;
   
      // Update both total passengers and prices in one go
      setSelectTotals((prevState) => {
         const updatedTotals = {
            ...prevState,
            [name]: newPaxTotal, // Update the specific passenger category
         };
   
         // Calculate the total passengers
         const totalPax = updatedTotals.adult + updatedTotals.children + updatedTotals.infant;
         const updatedPrice = newPaxTotal / parseInt(formData[name+'Number'],10) || 0
         // Update both the passenger totals and prices
         setFormData((prevFormData) => ({
            ...prevFormData,
            [name+'Price']: updatedPrice
         }));
   
         return {
            ...updatedTotals,
            total: totalPax, // Update the total passenger count
         };
      });
   }
   
    
    


   return (
      <>
         <div>
            <button
               type="button"
               onClick={openModal}
            >
               <p className="text-white text-sm font-semibold font-['Kumbh Sans']">New Booking</p>
            </button>
         </div>

         <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
               <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
               >
                  <div className="fixed inset-0 bg-black/25" />
               </Transition.Child>

               <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                     <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                     >
                        <Dialog.Panel className="w-full max-w-screen-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                           <Dialog.Title
                              as="h3"
                              className="text-lg font-medium leading-6 text-gray-900"
                           >
                              New Booking
                           </Dialog.Title>
                           <div>
                              <p className="text-xs text-gray-500 pb-[10px]">
                                 {props.scheduledEvent.start_time}
                              </p>
                           </div>

                           <div className="w-full h-[0px] border border-slate-300"></div>

                           {/* Customer information */}
                           <div className='py-[10px] flex flex-col'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Customer/Party Name *
                              </h3>
                              <div className='inline-flex gap-1'>
                                 <input
                                    value={formData.firstName}
                                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                                    className='border rounded-[10px] p-2'
                                    placeholder='First Name' />
                                 <input
                                    value={formData.lastName}
                                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                                    className='border rounded-[10px] p-2'
                                    placeholder='Last Name' />
                              </div>
                           </div>

                           {/* For attaching a salesman to the booking */}
                           <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                              Salesman Information
                           </h3>
                           <Tabs />

                           {/* Number of Passenger section*/}
                           <div className='py-[10px] grid grid-cols-4 grid-row-col gap-1'>

                              <div className="flex flex-col w-full gap-1 z-[999]">
                                 <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                    Passengers
                                 </h3>
                                 <input
                                    name='adultNumber'
                                    id='adult'
                                    value={formData.adultNumber}
                                    onChange={(e) => {
                                       handleInputChange(e.target.name, e.target.value)
                                       handlePaxNumberChange(e, formData.adultPrice)
                                    }} className={`${inputClass}`} />
                                 <input
                                    name='childrenNumber'
                                    id='children'
                                    value={formData.childrenNumber}
                                    onChange={(e) => {
                                       handleInputChange(e.target.name, e.target.value)
                                       handlePaxNumberChange(e, formData.childrenPrice)
                                    }} className={`${inputClass}`} />
                                 <input
                                    name='infantNumber'
                                    id='infant'
                                    value={formData.infantNumber}
                                    onChange={(e) => {
                                       handleInputChange(e.target.name, e.target.value)
                                       handlePaxNumberChange(e, formData.infantPrice)
                                    }} className={`${inputClass}`} />

                              </div>

                              <div className="flex flex-col w-full gap-1 z-[999]">
                                 <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900 z-[999]'>
                                    Prices Per Person
                                 </h3>
                                 <input name='adultPrice' id='adult' value={formData.adultPrice} onChange={(e) => handlePaxPriceChange(e)} className={`${inputClass}`} />
                                 <input name='childrenPrice' id='children' value={formData.childrenPrice} onChange={(e) => handlePaxPriceChange(e)} className={`${inputClass}`} />
                                 <input name='infantPrice' id='infant' value={formData.infantPrice} onChange={(e) => handlePaxPriceChange(e)} className={`${inputClass}`} />
                              </div>
                              <div className="flex flex-col w-full gap-1">
                                 <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                    Total Per Group
                                 </h3>
                                 <input name='adult' price={formData.adultPrice} value={selectTotals.adult} onChange={(e) => handlePaxTotalChange(e)} className={`${inputClass}`} />
                                 <input name='children' price={formData.childrenPrice} value={selectTotals.children} onChange={(e) => handlePaxTotalChange(e)} className={`${inputClass}`} />
                                 <input name='infant' price={formData.infantPrice} value={selectTotals.infant} onChange={(e) => handlePaxTotalChange(e)} className={`${inputClass}`} />
                              </div>

                              <div className="flex flex-col w-full pl-4 gap-2">
                                 <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                    Category
                                 </h3>
                                 <div className="flex flex-col">
                                    <h1 className='text-sm text-gray-900'>Adult</h1>
                                    <p className='text-xs text-gray-900'>Ages 12+</p>
                                 </div>
                                 <div className="flex flex-col">
                                    <h1 className='text-sm text-gray-900'>Children</h1>
                                    <p className='text-xs text-gray-900'>Ages 5-11</p>
                                 </div>
                                 <div className="flex flex-col">
                                    <h1 className='text-sm text-gray-900'>Infants</h1>
                                    <p className='text-xs text-gray-900'>Ages 0-4</p>
                                 </div>
                              </div>
                           </div>

                           <div className="flex gap-1">
                              <div className="-ml-4 -mt-16 w-1/2">
                                 <RadioGroup
                                    label={"Fiat Currency*"}
                                    plans={FIAT}
                                    setCurrent={setFiat}
                                    name={fiat} />
                              </div>
                              <div className="flex flex-col w-1/2 justify-center pl-3 pr-[10.5rem]">
                                 <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                    Total Price
                                 </h3>
                                 <input value={selectTotals.total} onChange={(e) => handleTotalChange(e)} className={`${inputClass}`} />
                              </div>
                           </div>


                           <div className="flex flex-col w-1/2 justify-center pl-3 pr-[10.5rem]">
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Extras?
                              </h3>
                              <input 
                              name='t_shirt' 
                              value={formData.t_shirt}  
                              onChange={(e) => {
                                 const newValue = Number(e.target.value) || 0; // Ensure new value is a number
                         
                                 // Adjust total by subtracting the previous extra value and adding the new one
                                 setSelectTotals((prevState) => ({
                                   ...prevState,
                                   total: prevState.total - previousExtra + newValue,
                                 }));
                         
                                 // Update the previous extra value to the current one
                                 setPreviousExtra(newValue);
                         
                                 handleInputChange(e.target.name, e.target.value) // Continue handling the change
                               }}
                              className={`${inputClass}`} />
                           </div>


                           <div className='inline-flex w-full justify-between'>
                              <RadioGroup label={"Payment Source*"} plans={SOURCE} setCurrent={setPaymentSource} name={paymentSource} />
                              <RadioGroup label={"Payment Status*"} plans={STATUS} setCurrent={setPaymentStatus} name={paymentStatus} />
                              <RadioGroup label={"Commission Recieved*"} plans={RECEIVED} setCurrent={setCommissionReceived} name={commissionReceived} />
                           </div>

                           {paymentStatus === "Partial Payment" &&
                              <div className="" >
                                 <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>Partial Payment</h1>
                                 <input
                                    value={formData.partialPayment}
                                    onChange={(e) => handleInputChange("partialPayment", e.target.value)}
                                    className='border rounded-[10px] p-2'
                                    placeholder='Payment Amount' />
                              </div>}


                           {/* Reservation Notes section*/}
                           <div className='py-[10px] flex flex-col'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Reservation Notes
                              </h3>
                              <textarea
                                 rows={5}
                                 value={formData.notes}
                                 onChange={(e) => handleInputChange("notes", e.target.value)}
                                 className='border rounded-[10px] p-2'
                              />
                           </div>



                           <div className="flex w-full justify-between  mt-4">
                              <button
                                 disabled={atCapacity || isCreateButtonDisabled}
                                 type="button"
                                 className={`inline-flex justify-center rounded-md border border-transparent ${atCapacity || isCreateButtonDisabled ? "bg-red-100 text-red-900 focus-visible:ring-red-500" : "bg-blue-100 text-blue-900 hover:bg-blue-200 focus-visible:ring-blue-500"} px-4 py-2 text-sm font-medium  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                                 onClick={() => {
                                    creatingNewBooking({ formData, bookerId, salesmanId, scheduledEventId, paymentSource, paymentStatus, commissionReceived, foodOptions, url, totalPrice: selectTotals.total, fiatValue: fiat}).then(
                                       closeModal()
                                    )
                                 }}
                              >
                                 Create
                              </button>
                              {atCapacity && "* at capacity"}
                              {isCreateButtonDisabled && "*There are missing fields"}
                              <button
                                 type="button"
                                 className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                 onClick={() => closeModal(true)}
                              >
                                 Cancel
                              </button>
                           </div>
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </Dialog>
         </Transition>
      </>
   )
}
