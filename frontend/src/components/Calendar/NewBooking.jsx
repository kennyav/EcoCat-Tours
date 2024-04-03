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

const SOURCE = [{ name: 'Cash', value: 'Cash' }, { name: 'Credit Card', value: 'Credit Card' }, { name: 'Voucher', value: 'Voucher' }]
const STATUS = [{ name: 'In Full', value: 'In Full' }, { name: 'Partial Payment', value: 'Partial Payment' }, { name: 'No Payment', value: 'No Payment' }]
const RECEIVED = [{ name: 'No', value: false }, { name: 'Yes', value: true }]

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
   });

   // states for the drop down
   const [foodOptions, setFoodOption] = useState(0)
   const [paymentSource, setPaymentSource] = useState('')
   const [paymentStatus, setPaymentStatus] = useState('')
   const [commissionReceived, setCommissionReceived] = useState(false)
   const isCreateButtonDisabled = !formData.firstName || !formData.lastName || !formData.adultNumber;


   useEffect(() => {
      const capacity = formData.adultNumber + formData.childrenNumber + formData.infantNumber
      if (capacity > props.scheduledEvent.capacity) {
         setAtCapacity(true)
      } else {
         setAtCapacity(false)
      }

   }, [formData.adultNumber, formData.childrenNumber, formData.infantNumber, props.scheduledEvent.capacity])

   useEffect(() => {
      (async () => {
         try {
            const resp = await httpClient.get(`${url}:8000/auth/@me`);
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
                           <div className='py-[10px] flex flex-col'>
                              <div className="flex w-full justify-between">
                                 <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                    Passengers *
                                 </h3>
                                 <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                    Price Per Passenger*
                                 </h3>
                              </div>
                              <div className='flex flex-col gap-2'>
                                 <div className='inline-flex gap-5 justify-between items-center'>

                                    <input
                                       value={formData.adultNumber || 0}
                                       onChange={(e) => handleInputChange("adultNumber", parseInt(e.target.value))}
                                       className='w-20 h-12 rounded-full border-2 py-2 text-center border-[#0E5BB5] cursor-pointer'
                                    />

                                    <div>
                                       <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>Adults</h1>
                                       <h1 className='text-xs text-left font-light text-gray-900'>{props.event.above_drinking_age ? "Ages 21+" : "Ages 12+"}</h1>
                                    </div>

                                    <input
                                       value={formData.adultPrice}
                                       onChange={(e) => handleInputChange("adultPrice", parseInt(e.target.value) || 0)}
                                       className='border-2 border-[#0E5BB5] rounded-[10px] p-2'
                                       placeholder='Price'
                                    />

                                 </div>

                                 {!props.event.above_drinking_age &&
                                    <div className="flex flex-col gap-2">
                                       <div className='inline-flex justify-between gap-5 items-center'>

                                          <input
                                             value={formData.childrenNumber || 0}
                                             onChange={(e) => handleInputChange("childrenNumber", parseInt(e.target.value))}
                                             className='w-20 h-12 rounded-full border-2 border-[#0E5BB5] py-2 text-center cursor-pointer'
                                          />

                                          <div>
                                             <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>Children</h1>
                                             <h1 className='text-xs text-left font-light text-gray-900'>Ages 5-11</h1>
                                          </div>

                                          <input
                                             value={formData.childrenPrice}
                                             onChange={(e) => handleInputChange("childrenPrice", parseInt(e.target.value) || 0)}
                                             className='border-2 border-[#0E5BB5] rounded-[10px] p-2'
                                             placeholder='Price'
                                          />

                                       </div>

                                       <div className='inline-flex gap-5 justify-between items-center'>

                                          <input
                                             value={formData.infantNumber || 0}
                                             onChange={(e) => handleInputChange("infantNumber", parseInt(e.target.value))}
                                             className='w-20 h-12 rounded-full py-2 text-center border-2 border-[#0E5BB5] cursor-pointer'
                                          />
                                          <div>
                                             <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>Infant</h1>
                                             <h1 className='text-xs text-left font-light text-gray-900'>Ages 0-4</h1>
                                          </div>

                                          <input
                                             value={formData.infantPrice}
                                             onChange={(e) => handleInputChange("infantPrice", parseInt(e.target.value) || 0)}
                                             className='border-2 border-[#0E5BB5] rounded-[10px] p-2'
                                             placeholder='Price'
                                          />

                                       </div>
                                    </div>}
                              </div>
                           </div>

                           {/* Booking Addition section*/}
                           <div className='py-[10px] flex flex-col'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Booking Additions
                              </h3>
                              <div className='inline-flex justify-between gap-2'>
                                 <DropDownMenu list={passengerNumbers} setCurrent={setFoodOption} current={foodOptions} />
                                 <div>
                                    <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>
                                       (FOOD OPTION) Select how many people want to upgrade to include our BBQ Hamburgers [NOTE: Base ticket does not include food. Please select this option if you wish to eat onboard!]
                                    </h1>
                                    <h1 className='text-xs text-left font-light text-gray-900'>$9.99</h1>
                                 </div>
                              </div>
                           </div>

                           <div className='inline-flex w-full justify-between'>
                              <RadioGroup label={"Payment Source*"} plans={SOURCE} setCurrent={setPaymentSource} name={paymentSource} />
                              <RadioGroup label={"Payment Status*"} plans={STATUS} setCurrent={setPaymentStatus} name={paymentStatus} />
                              <RadioGroup label={"Commission Recieved*"} plans={RECEIVED} setCurrent={setCommissionReceived} name={commissionReceived} />
                           </div>


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
                                    creatingNewBooking({formData, bookerId, salesmanId, scheduledEventId, paymentSource, paymentStatus, commissionReceived, foodOptions, url}).then(
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
