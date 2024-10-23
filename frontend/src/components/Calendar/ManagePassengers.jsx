import httpClient from '../../httpClient'
// time handling
import moment from 'moment'
// components
import RadioGroup from './RadioGroup'
import { Fragment, useState, useContext, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import CheckIn from './CheckIn'
import { EventContext } from '../Calendar/SideMenuEventInfo';
// redux
import { useSelector, useDispatch } from 'react-redux'
import { updateRefresh } from '../../reducers/refreshSlice'

// helper function

//constants
import { SOURCE, STATUS, RECEIVED, FIAT } from '../../helper/passengerHelper'
import { prettyDOM } from '@testing-library/react'

export default function ManagePassengers(props) {
   const { event, eventTimeInfo } = useContext(EventContext)
   const url = useSelector((state) => state.development.value)
   const refresh = useSelector((state) => state.refresh.value)
   const dispatch = useDispatch()
   const p = props.passenger

   const [isOpen, setIsOpen] = useState(false)
   const [previousExtra, setPreviousExtra] = useState(0)
   const [openDelete, setOpenDelete] = useState(false)
   const [edit, setEdit] = useState(false)
   const [selectTotals, setSelectTotals] = useState({
      adult: p.adult_passengers * p.adult_price,
      children: p.children_passengers * p.children_price,
      infant: p.infant_passengers * p.infant_price,
      total: p.total_price
   })

   // t-shirt is going to be the extra price

   // Grouped state for passenger details
   const [passengerState, setPassengerState] = useState({
      firstName: p.first_name,
      lastName: p.last_name,
      phoneNumber: p.phone,
      email: p.email,
      adultNumber: p.adult_passengers,
      childrenNumber: p.children_passengers,
      infantNumber: p.infant_passengers,
      adultPrice: p.adult_price,
      childrenPrice: p.children_price,
      infantPrice: p.infant_price,
      paymentSource: p.payment_type,
      paymentStatus: p.payment_status,
      partialPayment: p.partial_payment,
      extra: p.t_shirt,
      fiat: p.fiat !== "0",
      commissionReceived: p.commission_received,
      notes: p.notes,
   })

   const inputClass = 'border-2 border-[#0E5BB5] rounded-lg px-5 py-2'


   const handleChange = (e) => {
      const { name, value } = e.target
      setPassengerState((prevState) => ({
         ...prevState,
         [name]: value,
      }))
   }


   function handlePaxPriceChange(e) {
      const { id, name, value } = e.target;

      // Update the price for the selected passenger category
      setPassengerState((prevState) => ({
         ...prevState,
         [name]: value,  // Update price for 'adultPrice', 'childrenPrice', or 'infantPrice'
      }));

      // Calculate the total for the category using the latest passengerState in the callback
      setSelectTotals((prevTotals) => {
         const passengerCount = passengerState[id + 'Number'] || 0;  // Get the number of people for the category
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
         const numberOfPeople = parseInt(passengerState[people.name + 'Number'], 10) || 0; // Ensure it's a number
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
            setPassengerState((prevState) => ({
               ...prevState,
               [people.name + 'Price']: pricePerPerson,
            }))
            setSelectTotals((prevState) => ({
               ...prevState,
               [people.name]: pricePerPerson * passengerState[people.name + 'Number']
            }))
         } else {
            setPassengerState((prevState) => ({
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
         const updatedPrice = newPaxTotal / parseInt(passengerState[name + 'Number'], 10) || 0
         // Update both the passenger totals and prices
         setPassengerState((prevFormData) => ({
            ...prevFormData,
            [name + 'Price']: updatedPrice
         }));

         return {
            ...updatedTotals,
            total: totalPax, // Update the total passenger count
         };
      });
   }



   const deletePassenger = async () => {
      try {
         const resp = await httpClient.delete(`${url}/bookings/delete/${p.id}`)
         console.log(resp.data)
      } catch (error) {
         console.log('Error', error)
      }
      closeModal()
   }

   const editPassenger = async () => {
      const totalPrice = selectTotals.total

      try {
         const resp = await httpClient.put(`${url}/bookings/edit-passenger/${p.id}`, {
            ...passengerState,
            totalPrice,
         })
         console.log(resp.data)
      } catch (error) {
         console.log('Error', error)
      }
      closeModal()
   }

   function closeModal() {
      dispatch(updateRefresh(!refresh))
      setOpenDelete(false)
      setEdit(false)
      setIsOpen(false)
   }

   function openModal() {
      setIsOpen(true)
   }

   return (
      <>
         <div>
            <button
               type="button"
               onClick={openModal}
               className="w-[104px] h-8 px-[15px] py-2.5 bg-[#0E5BB5] rounded-[30px] justify-center items-center gap-2.5 flex hover:shadow-md"
            >
               <p className="w-[86px] text-center text-white text-[10px] font-semibold font-['Kumbh Sans']">Manage</p>
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
                        <Dialog.Panel className="w-full max-w-screen-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                           <Dialog.Title
                              as="h3"
                              className="text-lg font-medium leading-6 text-gray-900"
                           >
                              {props.passenger.first_name} {props.passenger.last_name}
                           </Dialog.Title>
                           <div>
                              <p className="text-xs text-gray-500 pb-[10px]">
                                 {eventTimeInfo}
                              </p>
                           </div>

                           <div className="w-full h-[0px] border border-slate-300"></div>

                           <div className='py-[10px] flex flex-col'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Customer Name
                              </h3>
                              <div className='inline-flex gap-12'>
                                 <input disabled={!edit} name='firstName' value={passengerState.firstName} onChange={(e) => handleChange(e)} className='border rounded-[10px] p-2' />
                                 <input disabled={!edit} name='lastName' value={passengerState.lastName} onChange={(e) => handleChange(e)} className='border rounded-[10px] p-2' />
                              </div>
                           </div>


                           {/* Contact Information Section */}
                           <div className='py-[10px] flex flex-col'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Contact Information
                              </h3>
                              <div className='flex gap-1'>
                                 <input disabled={!edit} name='email' value={passengerState.email} onChange={(e) => handleChange(e)} className='border rounded-[10px] p-2 w-1/3' />
                                 <input disabled={!edit} name='phoneNumber' value={passengerState.phoneNumber} onChange={(e) => handleChange(e)} className='border rounded-[10px] p-2' />
                              </div>
                           </div>


                           {/* Number of Passenger section*/}
                           <div className='py-[10px] grid grid-cols-4 grid-row-col gap-1'>

                              <div className="flex flex-col w-full gap-1 z-[999]">
                                 <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                    Passengers
                                 </h3>
                                 <input
                                    name='adultNumber'
                                    id='adult'
                                    disabled={!edit}
                                    value={passengerState.adultNumber}
                                    onChange={(e) => {
                                       handleChange(e)
                                       handlePaxNumberChange(e, passengerState.adultPrice)
                                    }} className={`${inputClass}`} />
                                 <input
                                    name='childrenNumber'
                                    id='children'
                                    disabled={!edit}
                                    value={passengerState.childrenNumber}
                                    onChange={(e) => {
                                       handleChange(e)
                                       handlePaxNumberChange(e, passengerState.childrenPrice)
                                    }} className={`${inputClass}`} />
                                 <input
                                    name='infantNumber'
                                    id='infant'
                                    disabled={!edit}
                                    value={passengerState.infantNumber}
                                    onChange={(e) => {
                                       handleChange(e)
                                       handlePaxNumberChange(e, passengerState.infantPrice)
                                    }} className={`${inputClass}`} />

                              </div>

                              <div className="flex flex-col w-full gap-1 z-[999]">
                                 <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900 z-[999]'>
                                    Prices Per Person
                                 </h3>
                                 <input name='adultPrice' id='adult' disabled={!edit} value={passengerState.adultPrice} onChange={(e) => handlePaxPriceChange(e)} className={`${inputClass}`} />
                                 <input name='childrenPrice' id='children' disabled={!edit} value={passengerState.childrenPrice} onChange={(e) => handlePaxPriceChange(e)} className={`${inputClass}`} />
                                 <input name='infantPrice' id='infant' disabled={!edit} value={passengerState.infantPrice} onChange={(e) => handlePaxPriceChange(e)} className={`${inputClass}`} />
                              </div>
                              <div className="flex flex-col w-full gap-1">
                                 <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                    Total Per Group
                                 </h3>
                                 <input disabled={!edit} name='adult' price={passengerState.adultPrice} value={selectTotals.adult} onChange={(e) => handlePaxTotalChange(e)} className={`${inputClass}`} />
                                 <input disabled={!edit} name='children' price={passengerState.childrenPrice} value={selectTotals.children} onChange={(e) => handlePaxTotalChange(e)} className={`${inputClass}`} />
                                 <input disabled={!edit} name='infant' price={passengerState.infantPrice} value={selectTotals.infant} onChange={(e) => handlePaxTotalChange(e)} className={`${inputClass}`} />
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
                                    disabled={!edit}
                                    label={"Fiat Currency*"}
                                    plans={FIAT}
                                    setCurrent={(value) =>
                                       setPassengerState((prevState) => ({
                                          ...prevState,
                                          fiat: value,
                                       }))}
                                    name={passengerState.fiat} />
                              </div>
                              <div className="flex flex-col w-1/2 justify-center pl-3 pr-[10.5rem]">
                                 <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                    Total Price
                                 </h3>
                                 <input disabled={!edit} value={selectTotals.total} onChange={(e) => handleTotalChange(e)} className={`${inputClass}`} />
                              </div>
                           </div>


                           <div className="flex flex-col w-1/2 justify-center pl-3 pr-[10.5rem]">
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Extras?
                              </h3>
                              <input
                                 name='extra'
                                 disabled={!edit}
                                 value={passengerState.extra | 0}
                                 onChange={(e) => {
                                    const newValue = Number(e.target.value) || 0; // Ensure new value is a number
                            
                                    // Adjust total by subtracting the previous extra value and adding the new one
                                    setSelectTotals((prevState) => ({
                                      ...prevState,
                                      total: prevState.total - previousExtra + newValue,
                                    }));
                            
                                    // Update the previous extra value to the current one
                                    setPreviousExtra(newValue);
                            
                                    handleChange(e); // Continue handling the change
                                  }}
                                 className={`${inputClass}`} />
                           </div>

                           <div className='inline-flex w-full justify-between'>
                              <RadioGroup
                                 disabled={!edit}
                                 label={"Payment Source*"}
                                 plans={SOURCE}
                                 setCurrent={(value) =>
                                    setPassengerState((prevState) => ({
                                       ...prevState,
                                       paymentSource: value,
                                    }))}
                                 name={passengerState.paymentSource} />
                              <RadioGroup
                                 disabled={!edit}
                                 label={"Payment Status*"}
                                 plans={STATUS}
                                 setCurrent={(value) =>
                                    setPassengerState((prevState) => ({
                                       ...prevState,
                                       paymentStatus: value,
                                    }))}
                                 name={passengerState.paymentStatus} />
                              <RadioGroup
                                 disabled={!edit}
                                 label={"Commission Recieved*"}
                                 plans={RECEIVED}
                                 setCurrent={(value) =>
                                    setPassengerState((prevState) => ({
                                       ...prevState,
                                       commissionReceived: value,
                                    }))}
                                 name={passengerState.commissionReceived} />
                           </div>

                           {passengerState.paymentStatus === "Partial Payment" &&
                              <div className="" >
                                 <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>Partial Payment</h1>
                                 <input
                                    disabled={!edit}
                                    value={passengerState.partialPayment}
                                    onChange={(e) => handleChange(e)}
                                    className='border rounded-[10px] p-2'
                                    placeholder='Payment Amount' />
                              </div>}

                           <div className='py-[10px] flex flex-col'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Reservation Notes
                              </h3>
                              <textarea disabled={!edit} rows={5} value={passengerState.notes} onChange={(e) => handleChange(e)} className='border rounded-[10px] p-2' />
                           </div>


                           <div className="flex justify-between mt-4">
                              <div>
                                 <button
                                    className={`inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${edit ? 'hidden' : ''}`}
                                    onClick={() => setEdit(true)}
                                 >
                                    Edit
                                 </button>

                                 <button
                                    className={`inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${!edit ? 'hidden' : ''}`}
                                    onClick={() => editPassenger()}
                                 >
                                    Save
                                 </button>
                              </div>
                              <CheckIn passenger={p} />
                              <button
                                 className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-black hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                 onClick={() => setOpenDelete(true)}
                              >
                                 Delete
                              </button>
                              <button
                                 className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                 onClick={() => closeModal()}
                              >
                                 Cancel
                              </button>
                           </div>
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </Dialog>
         </Transition >

         <Transition appear show={openDelete} as={Fragment}>
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
                        <Dialog.Panel className="w-full max-w-screen-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                           <Dialog.Title
                              as="h3"
                              className="text-lg font-medium leading-6 text-gray-900 text-center"
                           >
                              Confirm Passenger Deletion
                           </Dialog.Title>

                           <div className="inline-flex mt-4 w-full justify-between">
                              <button
                                 type="button"
                                 className="inline-flex justify-center rounded-md border-2 border-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                 onClick={() => setOpenDelete(false)}
                              >
                                 Cancel
                              </button>
                              <button
                                 type="button"
                                 className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-black hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                 onClick={() => deletePassenger()}
                              >
                                 Delete
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
