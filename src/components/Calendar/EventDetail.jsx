import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function EventDetail(props) {
   let [isOpen, setIsOpen] = useState(false)

   function closeModal() {
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
                                 className="text-lg font-medium leading-6 text-white"
                              >
                                 Thursday, Febuary 8 2024 @ 1pm
                              </Dialog.Title>
                           </div>

                           <div className='py-[10px] flex flex-col gap-3'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 When
                              </h3>
                              <input type='date' className='border rounded-[10px] p-2 w-1/4' />

                              <div className='inline-flex gap-4 items-center'>
                                 <input type='time' className='border rounded-[10px] p-2 w-1/4' />
                                 <h1>to</h1>
                                 <input type='time' className='border rounded-[10px] p-2 w-1/4' />
                              </div>
                           </div>

                           {/* Capacity section */}
                           <div className='py-[10px] flex flex-col'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Capacity
                              </h3>
                              <input className='border rounded-[10px] p-2 w-1/4' />
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
                                    <input className='border rounded-[10px] p-2' placeholder='Price' />
                                 </div>
                                 <div className='inline-flex gap-5 items-center'>
                                    <div className='w-1/12'>
                                       <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>Children</h1>
                                       <h1 className='text-xs text-left font-light text-gray-900'>Ages 5-11</h1>
                                    </div>
                                    <input className='border rounded-[10px] p-2' placeholder='Price' />
                                 </div>
                                 <div className='inline-flex gap-5 items-center'>
                                    <div className='w-1/12'>
                                       <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>Infant</h1>
                                       <h1 className='text-xs text-left font-light text-gray-900'>Ages 0-4</h1>
                                    </div>
                                    <input className='border rounded-[10px] p-2' placeholder='Price' />
                                 </div>
                              </div>
                           </div>

                           {/* Event History */}
                           <div className='py-[10px] flex flex-col overflow-scroll'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900 '>
                                 Event History
                              </h3>
                              
                           </div>

                           <div className="mt-4">
                              <button
                                 type="button"
                                 className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                 onClick={closeModal}
                              >
                                 Edit
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
