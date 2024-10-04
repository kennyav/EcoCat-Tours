import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

// time handling
import moment from 'moment'

// redux
import { updateRefresh } from '../../reducers/refreshSlice'
import { useSelector, useDispatch } from 'react-redux'

// receipt
import PrintReceipt from '../TransactionComponents/Receipt'

// axios request
import httpClient from '../../httpClient';

export default function CheckIn(props) {
   const url = useSelector((state) => state.development.value)
   //redux
   const dispatch = useDispatch()
   const refresh = useSelector((state) => state.refresh.value)
   // open state
   let [isOpen, setIsOpen] = useState(false)
   // passengers states
   const p = props.passenger

   function closeModal() {
      dispatch(updateRefresh(!refresh))
      setIsOpen(false)
   }
   function openModal() {
      setIsOpen(true)
   }


   const checkIn = async () => {
      const checkedIn = true
      try {
         const resp = await httpClient.put(`${url}/bookings/update-checkedin/${p.id}`, {
            checkedIn
         })
         console.log(resp.data)
      } catch (error) {
         console.log("Error", error)
      } finally {
         setIsOpen(false)
      }
   }

   return (
      <>
         <div>
            <button
               type="button"
               onClick={openModal}
               className="inline-flex justify-center rounded-md bg-green-200 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            >Check In
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
                                 {moment().format('dddd, MMMM Do YYYY')}
                              </p>
                           </div>

                           <div className="w-full h-[0px] border border-slate-300"></div>

                           <div className='py-[10px] flex flex-col'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Customer Name
                              </h3>
                              <div className='inline-flex gap-1'>
                                 <h1 className='border rounded-[10px] p-2'>{props.passenger.first_name} {props.passenger.last_name}</h1>
                              </div>
                           </div>


                           {/* Contact Information Section */}
                           <div className='py-[10px] flex flex-col'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Contact Information
                              </h3>
                              <div className='inline-flex gap-1'>
                                 <h1 className='border rounded-[10px] p-2 w-[20%]'>{props.passenger.email || "No Email"}</h1>
                                 <h1 className='border rounded-[10px] p-2 w-[20%]'>{props.passenger.phone.length > 2 ? props.passenger.phone.length : "No Number"}</h1>
                              </div>
                           </div>


                           {/* Number of Passenger section*/}
                           <div className='py-[10px] flex flex-col'>
                              <div className="inline-flex gap-5">
                                 <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                    Passengers
                                 </h3>
                                 <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                    Price
                                 </h3>
                              </div>

                              <div className='flex flex-col gap-2'>
                                 <div className='inline-flex gap-16 items-center'>
                                    <h1 className='border-2 border-[#0E5BB5] rounded-lg px-5 py-2 w-[10%]'>{props.passenger.adult_passengers}</h1>
                                    <h1 className='border-2 border-[#0E5BB5] rounded-lg px-5 py-2 w-[10%]'>${props.passenger.adult_price}</h1>
                                    <div>
                                       <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>Adults</h1>
                                       <h1 className='text-xs text-left font-light text-gray-900'>Ages 12+</h1>
                                    </div>
                                 </div>
                                 <div className='inline-flex gap-16 items-center'>
                                    <h1 className='border-2 border-[#0E5BB5] rounded-lg px-5 py-2 w-[10%]'>{props.passenger.children_passengers}</h1>
                                    <h1 className='border-2 border-[#0E5BB5] rounded-lg px-5 py-2 w-[10%]'>${props.passenger.children_price}</h1>

                                    <div>
                                       <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>Children</h1>
                                       <h1 className='text-xs text-left font-light text-gray-900'>Ages 5-11</h1>
                                    </div>
                                 </div>
                                 <div className='inline-flex gap-16 items-center'>
                                    <h1 className='border-2 border-[#0E5BB5] rounded-lg px-5 py-2 w-[10%]'>{props.passenger.infant_passengers}</h1>
                                    <h1 className='border-2 border-[#0E5BB5] rounded-lg px-5 py-2 w-[10%]'>${props.passenger.infant_price}</h1>
                                    <div>
                                       <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>Infant</h1>
                                       <h1 className='text-xs text-left font-light text-gray-900'>Ages 0-4</h1>
                                    </div>
                                 </div>
                              </div>
                           </div>


                           <div className="inline-flex mt-4 w-full justify-between items-end">
                              <button
                                 type="button"
                                 className="inline-flex h-[1%] justify-center rounded-md border-2 border-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E5BB5] focus-visible:ring-offset-2"
                                 onClick={closeModal}
                              >
                                 Cancel
                              </button>
                              {/* <button
                                 type="button"
                                 className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E5BB5] focus-visible:ring-offset-2"
                                 onClick={() => checkIn()}
                              >
                                 Print Pass
                              </button> */}
                              {/* <PrintReceipt passenger={p} /> */}
                              <button
                                 className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E5BB5] focus-visible:ring-offset-2"
                                 onClick={() => {
                                    checkIn()
                                 }}>
                                 Confirm Check In
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
