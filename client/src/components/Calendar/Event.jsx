// import React from 'react'
// import { Popover } from '@headlessui/react';

// icons
import { NewBookingIcon } from '../Icons';
import { EventDetailsIcon } from '../Icons';

// export default function Event(props) {
//    const eventCSS = 'flex flex-row gap-1 items-center justify-center px-3 py-2 text-[10px]';


//    return (
//       <div>
//          <Popover className="relative" onOpen={props.setEventClick(true)} onClose={props.setEventClick(false)}>
//             <Popover.Button
//                className={`flex flex-col text-[10px] font-KumbhSans rounded-[10px] bg-[#C4D2DC] hover:shadow-lg p-[11px] gap-2`}>
//                <p className='font-semibold'>
//                   {props.time}
//                   {" "}
//                   {props.title}
//                </p>
//                <p>{props.openings}</p>
//             </Popover.Button>

//             <Popover.Panel className="absolute z-10 rounded-[10px] bg-[#F2F8FC] p-2">
//                <div className="flex flex-row items-center justify-center gap-1 px-3 py-2 bg-[#0E5BB5] rounded-lg cursor-pointer">
//                   <NewBookingIcon />
//                   <h3 className="text-[10px] font-semibold text-white">New Booking</h3>
//                </div>
//                <div className={`${eventCSS}`}>
//                   <EventDetailsIcon />
//                   <p>Event Details</p>
//                </div>
//                <div className={`${eventCSS}`}>
//                   <p>{props.adult}</p>
//                   <p>Adults</p>
//                </div>
//                <div className={`${eventCSS}`}>
//                   <p>{props.children}</p>
//                   <p>Children</p>
//                </div>
//                <div data-popper-arrow></div>
//             </Popover.Panel>
//          </Popover>
//       </div>
//    )
// }
import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const solutions = [
   {
      name: 'New Booking',
      description: 'Measure actions your users take',
      href: '##',
      icon: NewBookingIcon,
   },
   {
      name: 'Event Details',
      description: 'Create your own targeted content',
      href: '##',
      icon: EventDetailsIcon,
   },
]

export default function Event(props) {
   return (
      <div className="w-full max-w-sm px-4">
         <Popover className="">
            {({ open }) => (
               <>
               {open ? props.setEventClick(true) : props.setEventClick(false)}
                  <Popover.Button
                     className={`
                ${open ? 'text-black bg-[#00B628]' : 'text-black/90 bg-[#C4D2DC]'}
                group flex flex-col rounded-md text-[10px] text-left px-3 py-2 font-medium hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
               //  {`flex flex-col font-KumbhSans rounded-[10px] bg-[#C4D2DC] hover:shadow-lg p-[11px] gap-2`}
                  >
                     <p className='font-semibold'>
                        {props.time}
                        {" "}
                        {props.title}
                     </p>
                     <p>{props.openings}</p>
                     {/* <ChevronDownIcon
                        className={`${open ? 'text-orange-300' : 'text-orange-300/70'}
                  ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-orange-300/80`}
                        aria-hidden="true"
                     /> */}
                  </Popover.Button>
                  <Transition
                     as={Fragment}
                     enter="transition ease-out duration-200"
                     enterFrom="opacity-0 translate-y-1"
                     enterTo="opacity-100 translate-y-0"
                     leave="transition ease-in duration-150"
                     leaveFrom="opacity-100 translate-y-0"
                     leaveTo="opacity-0 translate-y-1"
                  >
                     <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                           <div className="relative grid gap-8 bg-white p-7 lg:grid-rows-2">
                              {solutions.map((item) => (
                                 <a
                                    key={item.name}
                                    href={item.href}
                                    className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                                 >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                                       <item.icon aria-hidden="true" />
                                    </div>
                                    <div className="ml-4">
                                       <p className="text-sm font-medium text-gray-900">
                                          {item.name}
                                       </p>
                                       <p className="text-sm text-gray-500">
                                          {item.description}
                                       </p>
                                    </div>
                                 </a>
                              ))}
                           </div>
                           <div className="bg-gray-50 p-4">
                              <a
                                 href="##"
                                 className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                              >
                                 <span className="flex items-center">
                                    <span className="text-sm font-medium text-gray-900">
                                       Documentation
                                    </span>
                                 </span>
                                 <span className="block text-sm text-gray-500">
                                    Start integrating products and tools
                                 </span>
                              </a>
                           </div>
                        </div>
                     </Popover.Panel>
                  </Transition>
               </>
            )}
         </Popover>
      </div>
   )
}