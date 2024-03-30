import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom';
import httpClient from '../httpClient'

export default function Event({ event, days, schedule }) {
   const [isOpen, setIsOpen] = useState(false)
   const navigate = useNavigate();
   const eventId = event.id
   let deleteEventURL = "http://127.0.0.1:8000/events/delete/" + eventId
   // Function to format the time
   const formatTime = (timeStr) => {
      const date = new Date(timeStr);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'GMT' })
   };

   // Format start and end times
   const startTime = formatTime(schedule.start_time);
   const endTime = formatTime(schedule.end_time);

   const handleClick = (event) => {
      console.log(event)
      navigate('/edit-events', { state: { event: event } });
   }

   function closeModal() {
      setIsOpen(false)
   }

   function openModal() {
      setIsOpen(true)
   }

   const deleteEvent = async () => {
      try {
         const resp = await httpClient.delete(deleteEventURL)
         setIsOpen(false)
         return resp.data
      } catch (error) {
         setIsOpen(false)
         throw new Error('Failed to delete event')
      }
   }


   // props.title, props.info, props.days, props.time
   return (
      <div className='flex flex-col w-full h-auto rounded-lg bg-white font-KumbhSans'>

         <div className='flex flex-row items-center justify-between px-[30px] pt-[30px]'>
            <div>
               <h1 className='text-[20px] font-bold'>{event.title}</h1>
               <p className='text-[10px]'>{event.info}</p>
            </div>
            <button
               onClick={() => handleClick(event)}
               className='bg-transparent hover:bg-[#0E5BB5] hover:text-white py-2.5 px-8 border border-[#0E5BB5] hover:border-transparent rounded-full text-[10px]'>
               Edit
            </button>
         </div>

         <div className='flex flex-row items-center justify-between px-[30px] py-[30px]'>
            <div className="">
               <h1 className='text-[14px] font-bold'>Availability</h1>
               <p className='text-[10px]'>Days: {days}</p>
               <p className='text-[10px]'>Times: {startTime} to {endTime}</p>
            </div>
            <button
               onClick={openModal}
               className='bg-transparent hover:bg-red-500 hover:text-white py-2.5 px-8 border border-[#0E5BB5] hover:border-transparent rounded-full text-[10px]'>
               Delete
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
                              className="text-lg font-medium leading-6 text-gray-900 text-center"
                           >
                              Confirm Event Deletion
                           </Dialog.Title>

                           <div className="inline-flex mt-4 w-full justify-between">
                              <button
                                 type="button"
                                 className="inline-flex justify-center rounded-md border-2 border-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                 onClick={closeModal}
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

      </div>
   )
}
