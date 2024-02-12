import { Dialog, Transition, Menu } from '@headlessui/react'
import { Fragment, useState, useEffect, useRef, } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function CheckIn(props) {
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
               className="w-[104px] h-8 px-[15px] py-2.5 bg-sky-700 rounded-[30px] justify-center items-center gap-2.5 flex"
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
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                           <Dialog.Title
                              as="h3"
                              className="text-lg font-medium leading-6 text-gray-900"
                           >
                              John Smith
                           </Dialog.Title>
                           <div>
                              <p className="text-xs text-gray-500 pb-[10px]">
                                 Thursday, Febuary 8 2024 @ 1pm
                              </p>
                           </div>

                           <div class="w-full h-[0px] border border-slate-300"></div>

                           <div className='py-[10px] flex flex-col'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Customer Name *
                              </h3>
                              <div className='inline-flex gap-1'>
                                 <input className='border rounded-[10px] p-2' placeholder='First Name'/>
                                 <input className='border rounded-[10px] p-2' placeholder='Last Name'/>
                              </div>
                           </div>

                           <div className='py-[10px] flex flex-col'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Contact Information *
                              </h3>
                              <div className='inline-flex gap-1'>
                                 <input className='border rounded-[10px] p-2' placeholder='Email Address'/>
                                 <input className='border rounded-[10px] p-2' placeholder='Phone Number'/>
                              </div>
                           </div>

                           <div className='py-[10px] flex flex-col'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Passengers *
                              </h3>
                              <div className='inline-flex gap-1'>
                                 <input className='border rounded-[10px] p-2' placeholder='Email Address'/>
                                 <input className='border rounded-[10px] p-2' placeholder='Phone Number'/>
                              </div>
                           </div>

                           <div className="mt-4">
                              <button
                                 type="button"
                                 className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                 onClick={closeModal}
                              >
                                 Got it, thanks!
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
