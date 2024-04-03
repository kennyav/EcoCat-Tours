import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import httpClient from '../../httpClient'
import moment from 'moment'
import { printBoardingPass } from '../../helper/boardingPass'
import { updateRefresh } from '../../reducers/refreshSlice'
import { useSelector, useDispatch } from 'react-redux'

// components
export default function CheckIn(props) {
   const calendarInformation = useSelector((state) => state.calendarInformation)
   const dispatch = useDispatch()
   const refresh = useSelector((state) => state.refresh.value)
   const url = useSelector((state) => state.development.value)
   let [isOpen, setIsOpen] = useState(false)
   const p = props.passenger
   const numberOfPassengers = p.adult_passengers + p.children_passengers + p.infant_passengers;

   const checkIn = async () => {
      const checkedIn = true
      try {
         const resp = await httpClient.put(`${url}:8000/bookings/update-checkedin/${props.passenger.id}`, {
            checkedIn
         })
         console.log(resp.data)
         closeModal()
      } catch (error) {
         closeModal()
         console.log("Error", error)
      } finally {
         for (let i = 0; i < numberOfPassengers; i++) {
            printBoardingPass({
               firstName: p.first_name,
               lastName: p.last_name,
               date: calendarInformation.date.month.toString() + " " + calendarInformation.date.day.toString() + ", " + calendarInformation.date.year,
               time: calendarInformation.date.time,
               numberOfPassengers: numberOfPassengers,
               pricePerPassenger: p.adult_price,
               foodOption: p.food,
               tShirtOption: p.t_shirt,
               otherDetails: 'Please provide a window seat if possible',
            })
         }
      }
   }

   function closeModal() {
      dispatch(updateRefresh(!refresh))
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
               className="w-[104px] h-8 px-[15px] py-2.5 bg-sky-700 rounded-[30px] justify-center items-center gap-2.5 flex hover:shadow-md"
            >
               <p className="w-[86px] text-center text-white text-[10px] font-semibold font-['Kumbh Sans']">Check In</p>
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
                                 <h1 className='border rounded-[10px] p-2'>{props.passenger.email}</h1>
                                 <h1 className='border rounded-[10px] p-2'>{props.passenger.phone}</h1>
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
                                    <h1 className='border-2 border-[#0E5BB5] rounded-lg px-5 py-2'>{props.passenger.adult_passengers}</h1>
                                    <h1 className='border-2 border-[#0E5BB5] rounded-lg px-5 py-2'>${props.passenger.adult_price}</h1>
                                    <div>
                                       <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>Adults</h1>
                                       <h1 className='text-xs text-left font-light text-gray-900'>Ages 12+</h1>
                                    </div>
                                 </div>
                                 <div className='inline-flex gap-16 items-center'>
                                    <h1 className='border-2 border-[#0E5BB5] rounded-lg px-5 py-2'>{props.passenger.children_passengers}</h1>
                                    <h1 className='border-2 border-[#0E5BB5] rounded-lg px-5 py-2'>${props.passenger.children_price}</h1>

                                    <div>
                                       <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>Children</h1>
                                       <h1 className='text-xs text-left font-light text-gray-900'>Ages 5-11</h1>
                                    </div>
                                 </div>
                                 <div className='inline-flex gap-16 items-center'>
                                    <h1 className='border-2 border-[#0E5BB5] rounded-lg px-5 py-2'>{props.passenger.infant_passengers}</h1>
                                    <h1 className='border-2 border-[#0E5BB5] rounded-lg px-5 py-2'>${props.passenger.infant_price}</h1>
                                    <div>
                                       <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>Infant</h1>
                                       <h1 className='text-xs text-left font-light text-gray-900'>Ages 0-4</h1>
                                    </div>
                                 </div>
                              </div>
                           </div>


                           <div className="inline-flex mt-4 w-full justify-between">
                              <button
                                 type="button"
                                 className="inline-flex justify-center rounded-md border-2 border-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E5BB5] focus-visible:ring-offset-2"
                                 onClick={closeModal}
                              >
                                 Cancel
                              </button>
                              <button
                                 type="button"
                                 className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E5BB5] focus-visible:ring-offset-2"
                                 onClick={() => checkIn()}
                              >
                                 Print Pass
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
