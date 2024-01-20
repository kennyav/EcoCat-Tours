import React, { useState } from 'react';
// icons
import { NewBookingIcon } from '../Icons';
import { EventDetailsIcon } from '../Icons';
// import { Fragment } from 'react'

// export default function Event(props) {
//    return (
//       <div className="w-full max-w-sm px-4">
//          <Popover className="relative">
//             {({ open }) => (
//                <>
//                   {console.log("Open ", open)}
//                   {/* {open ? props.setEventClick(true) : props.setEventClick(false)} */}
//                   <Popover.Button
//                      className={`
//                 ${open ? 'text-black bg-[#00B628]' : 'text-black/90 bg-[#C4D2DC]'}
//                 group relative rounded-md text-[10px] text-left px-3 py-2 font-medium hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
//                   >
//                      {open ? props.setEventClick(true) : props.setEventClick(false)}
// <p className='font-semibold'>
//    {props.time}
//    {" "}
//    {props.title}
// </p>
// <p>{props.openings}</p>
//                   </Popover.Button>
// <Transition
//    as={Fragment}
//    enter="transition ease-out duration-200"
//    enterFrom="opacity-0 translate-y-1"
//    enterTo="opacity-100 translate-y-0"
//    leave="transition ease-in duration-150"
//    leaveFrom="opacity-100 translate-y-0"
//    leaveTo="opacity-0 translate-y-1"
// >
//    <Popover.Panel className="absolute left-1/2 z-10 mt-3 max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
//       <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
//          <div className="relative bg-white p-7">
//             <a
//                href={'newbooking'}
//                className="-m-3 flex items-center bg-[#0E5BB5] rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
//             >
//                <NewBookingIcon />
//                <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-900">
//                      New Booking
//                   </p>
//                </div>
//             </a>
//             <a
//                href={'event'}
//                className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
//             >
//                <EventDetailsIcon />
//                <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-900">
//                      Event Details
//                   </p>
//                   {/* <p className="text-sm text-gray-500">
//                      placeholder
//                   </p> */}
//                </div>
//             </a>

//          </div>
//       </div>
//    </Popover.Panel>
// </Transition>
//                </>
//             )}
//          </Popover>
//       </div>
//    )
// }

// import { Dialog, Transition } from '@headlessui/react'
// import { Fragment, useState } from 'react'

// export default function Event(props) {
//    let [isOpen, setIsOpen] = useState(true)

//    function closeModal() {
//       setIsOpen(false)
//    }

//    function openModal() {
//       setIsOpen(true)
//    }

//    return (
//       <>
//          <div className="">
//             <button
//                type="button"
//                onClick={openModal}
//                className={`${isOpen ? 'text-black bg-[#00B628]' : 'text-black/90 bg-[#C4D2DC]'} 
//           group relative rounded-md text-[10px] text-left px-3 py-2 font-medium hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
//             >
//                <p className='font-semibold'>
//                   {props.time}
//                   {" "}
//                   {props.title}
//                </p>
//                <p>{props.openings}</p>
//             </button>
//          </div>
//          <Transition appear show={isOpen} as={Fragment}>
//             <Dialog as="div" className="relative z-10" onClose={closeModal}>
//                <Transition.Child
//                   as={Fragment}
//                   enter="ease-out duration-300"
//                   enterFrom="opacity-0"
//                   enterTo="opacity-100"
//                   leave="ease-in duration-200"
//                   leaveFrom="opacity-100"
//                   leaveTo="opacity-0"
//                >
//                   <div className="fixed inset-0" />
//                </Transition.Child>

//                <div className="fixed inset-0 overflow-y-auto">
//                   <div className="flex min-h-full items-center justify-center p-4 text-center">
//                      <Transition.Child
//                         as={Fragment}
//                         enter="ease-out duration-300"
//                         enterFrom="opacity-0 scale-95"
//                         enterTo="opacity-100 scale-100"
//                         leave="ease-in duration-200"
//                         leaveFrom="opacity-100 scale-100"
//                         leaveTo="opacity-0 scale-95"
//                      >
//                         <Dialog.Panel className="max-w-md transform overflow-hidden rounded-2xl bg-[#F2F8FC] p-1 text-left align-middle shadow-xl transition-all">
//                            <a
//                               href='new-booking'
//                               className="inline-flex hover:shadow-md items-center rounded-lg p-[10px] gap-2 text-md font-medium text-white bg-[#0E5BB5]"
//                            >
//                               <NewBookingIcon />
//                               New Booking
//                            </a>
//                            <div className="mt-2">
//                               <a
//                                  href='event-detail'
//                                  className="inline-flex hover:shadow-md items-center rounded-lg p-[10px] gap-2 text-md font-medium text-stone-900"
//                               >
//                                  <EventDetailsIcon />
//                                  Event Detail
//                               </a>
//                            </div>
//                            <div className="mt-2">
//                               <div className="text-stone-900 text-md font-normal font-['Kumbh Sans']">20 Adults</div>
//                               <div className="text-stone-900 text-md font-normal font-['Kumbh Sans']">10 Children</div>
//                            </div>

//                            <div className="mt-4">
//                               <button
//                                  type="button"
//                                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                                  onClick={closeModal}
//                               >
//                                  Close
//                               </button>
//                            </div>
//                         </Dialog.Panel>
//                      </Transition.Child>
//                   </div>
//                </div>
//             </Dialog>
//          </Transition>
//       </>
//    )
// }

export default function Event(props) {
   const [open, setOpen] = useState(false)

   function handleClick() {
      setOpen(!open)
      props.setEventClick(!open)
   }

   return (
      <div className='relative'>
         <button 
         onClick={() => handleClick()}
         className={`w-full h-[50px] p-[11px] ${open ? 'text-black bg-[#00B628]' : 'text-black/90 bg-[#C4D2DC]'} rounded-[10px] justify-start items-start gap-1 hover:shadow-lg`}>
            <div className="justify-start items-start gap-2">
               <div className="text-stone-900 text-[10px] font-semibold font-['Kumbh Sans']">1pm Snorkel Cruise </div>
               <div className="text-stone-900 text-[10px] font-normal font-['Kumbh Sans']">90 Openings</div>
            </div>
         </button>
         {open &&
            <div className="w-[174px] h-auto relative bg-[#F2F8FC] rounded-[10px]">
               <div className='inline-flex items-center p-[10px] gap-2 w-full rounded-[10px] bg-[#0E5BB5]'>
                  <NewBookingIcon />
                  <a href='new-booking' className="text-white text-sm font-semibold font-['Kumbh Sans'] cursor-pointer">New Booking</a>
               </div>
               <div className='inline-flex items-center p-[7px] gap-2 w-full rounded-[10px]'>
                  <EventDetailsIcon />
                  <a href='edit-event' className="text-stone-900 text-sm font-semibold font-['Kumbh Sans']">Event Details</a>
               </div>
               <div className='inline-flex items-center p-[7px] gap-2 w-full rounded-[10px]'>
                  <div className="text-stone-900 text-[10px] font-normal font-['Kumbh Sans']">10</div>
                  <div className="text-stone-900 text-[10px] font-normal font-['Kumbh Sans']">Adults</div>
               </div>
               <div className='inline-flex items-center p-[7px] gap-2 w-full rounded-[10px]'>
                  <div className="text-stone-900 text-[10px] font-normal font-['Kumbh Sans']">10</div>
                  <div className="text-stone-900 text-[10px] font-normal font-['Kumbh Sans']">Children</div>
               </div>
            </div>}
      </div>
   )
}
