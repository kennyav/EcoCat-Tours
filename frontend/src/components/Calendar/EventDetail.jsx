import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import moment from 'moment'
import httpClient from '../../httpClient'
import { updateRefresh } from '../../reducers/refreshSlice'
import { useSelector, useDispatch } from 'react-redux'

export default function EventDetail({ event, scheduledEvent }) {
   const url = useSelector((state) => state.development.value)
   const dispatch = useDispatch()
   const refresh = useSelector((state) => state.refresh.value)
   let [isOpen, setIsOpen] = useState(false)
   const [openDelete, setOpenDelete] = useState(false)
   const [startTime, setStartTime] = useState(scheduledEvent.start_time)
   const [endTime, setEndTime] = useState(scheduledEvent.end_time)
   const [adults, setAdults] = useState(scheduledEvent.adult_passengers)
   const [children, setChildren] = useState(scheduledEvent.children_passengers)
   const [infants, setInfants] = useState(scheduledEvent.infant_passengers)
   const [edit, setEdit] = useState(false)
   // Parse the original datetime string
   const parsedStartDatetime = moment(scheduledEvent.start_time);
   const parsedEndDatetime = moment(scheduledEvent.end_time)

   const handleTimeChange = (e, setTime, parsedDatetime) => {
      // Extract hour and minute from the input value
      const [hour, minute] = e.target.value.split(":");
      // Extract the date part and create a new datetime with the updated time
      const updatedDatetime = parsedDatetime.clone().set({ hour: hour, minute: minute, second: 0 });
      // Format the updated datetime
      const updatedDatetimeString = updatedDatetime.format("ddd, DD MMM yyyy HH:mm:ss");

      setTime(updatedDatetimeString);
   };

   const editSingleEvent = async () => {
      const start = moment(startTime).format('yyyy-DD-MM HH:mm:ss')
      const end = moment(endTime).format('yyyy-DD-MM HH:mm:ss')
      try {
         const resp = await httpClient.put(`${url}:8000/events/edit-event/${scheduledEvent.id}`,
            {
               start,
               end,
               adults,
               children,
               infants
            });
         console.log(resp.data)
      } catch (error) {
         console.log("Error", error);
      }
      closeModal()
   }

   const deleteEvent = async () => {
      try {
         const resp = await httpClient.delete(`${url}:8000/events/delete-single-event/${scheduledEvent.id}`);
         console.log(resp.data)
      } catch (error) {
         console.log("Error", error);
      }
      setOpenDelete(false)
      closeModal()
   }


   function closeModal() {
      dispatch(updateRefresh(!refresh))
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
            >
               <p className="text-stone-900 text-sm font-semibold font-['Kumbh Sans']">Event Details</p>
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

                           {/* Date and time section */}
                           <div className='w-full h-auto rounded-[15px] bg-[#0E5BB5] p-4'>
                              <Dialog.Title
                                 as="h3"
                                 className="flex flex-col text-lg font-medium leading-6 text-white"
                              >
                                 {event.title}
                                 <div className="text-sm">
                                    {moment.utc(scheduledEvent.start_time).format('dddd, MMMM Do YYYY')}
                                 </div>
                              </Dialog.Title>
                           </div>

                           <div className='py-[10px] flex flex-col gap-3'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 When
                              </h3>
                              <div className='inline-flex gap-4 items-center'>
                                 <input disabled={!edit} type="time" value={moment.utc(startTime).format("HH:mm")} onChange={(e) => handleTimeChange(e, setStartTime, parsedStartDatetime)} />
                                 <h1>to</h1>
                                 <input disabled={!edit} type="time" value={moment.utc(endTime).format("HH:mm")} onChange={(e) => handleTimeChange(e, setEndTime, parsedEndDatetime)} />
                              </div>
                           </div>

                           {/* Number of Passenger section*/}
                           <div className='py-[10px] flex flex-col'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Passengers
                              </h3>
                              <div className='flex flex-col gap-2'>
                                 <div className='inline-flex gap-5 items-center'>
                                    <div className='w-1/12'>
                                       <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>Adults</h1>
                                       <h1 className='text-xs text-left font-light text-gray-900'>Ages 12+</h1>
                                    </div>
                                    <input disabled={!edit} className='border rounded-[10px] p-2' value={adults} onChange={(e) => setAdults(e.target.value)} />
                                 </div>
                                 <div className='inline-flex gap-5 items-center'>
                                    <div className='w-1/12'>
                                       <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>Children</h1>
                                       <h1 className='text-xs text-left font-light text-gray-900'>Ages 5-11</h1>
                                    </div>
                                    <input disabled={!edit} className='border rounded-[10px] p-2' value={children} onChange={(e) => setChildren(e.target.value)} />
                                 </div>
                                 <div className='inline-flex gap-5 items-center'>
                                    <div className='w-1/12'>
                                       <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>Infant</h1>
                                       <h1 className='text-xs text-left font-light text-gray-900'>Ages 0-4</h1>
                                    </div>
                                    <input disabled={!edit} className='border rounded-[10px] p-2' value={infants} onChange={(e) => setInfants(e.target.value)} />
                                 </div>
                              </div>
                           </div>


                           {/* Event History */}
                           <div className='py-[10px] flex flex-col overflow-scroll'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900 '>
                                 Event History
                              </h3>
                              <div className='flex flex-col h-[25%] bg-gray-100 rounded-[25px] p-2 overflow-y-scroll'>
                                 History coming soon
                              </div>

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
                                    onClick={() => editSingleEvent()}
                                 >
                                    Save
                                 </button>
                              </div>
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
         </Transition>

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
                              Confirm Event Deletion
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
                                 onClick={() => deleteEvent()}
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
