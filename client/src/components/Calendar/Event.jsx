import React from 'react'
import { Popover } from '@headlessui/react';

// icons
import { NewBookingIcon } from '../Icons';
import { EventDetailsIcon } from '../Icons';

export default function Event(props) {

   

   return (
      <div>
         <Popover className="relative">
            <Popover.Button
               className={`flex flex-col text-[10px] font-KumbhSans rounded-[10px] bg-[#C4D2DC] hover:shadow-lg p-[11px] gap-2`}
               onClick={() => props.setEventClick(true)}>
               <p className='font-semibold'>
                  {props.time}
                  {" "}
                  {props.title}
               </p>
               <p>{props.openings}</p>
            </Popover.Button>

            <Popover.Panel className="absolute z-10 rounded-[10px] bg-[#F2F8FC] p-2">
               <div className="flex flex-row items-center justify-center gap-1 px-3 py-2 bg-[#0E5BB5] rounded-lg cursor-pointer">
                  <NewBookingIcon />
                  <h3 className="text-[10px] font-semibold text-white">New Booking</h3>
               </div>
               <div className="flex flex-row gap-1 items-center justify-center px-3 py-2 text-[10px]">
                  <EventDetailsIcon />
                  <p>Event Details</p>
               </div>
               <div className="flex flex-row gap-1 items-center justify-center px-3 py-2 text-[10px]">
                  <p>{props.adult}</p>
                  <p>Adults</p>
               </div>
               <div className="flex flex-row gap-1 items-center justify-center px-3 py-2 text-[10px]">
                  <p>{props.children}</p>
                  <p>Children</p>
               </div>
               <div data-popper-arrow></div>
            </Popover.Panel>
         </Popover>
      </div>
   )
}
