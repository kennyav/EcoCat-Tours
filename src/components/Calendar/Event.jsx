import React, { useEffect, useState } from 'react';

// icons
import { NewBookingIcon } from '../Icons';
import { EventDetailsIcon } from '../Icons';

// components
import EventDetail from './EventDetail';
import NewBooking from './NewBooking';

export default function Event(props) {

   const [open, setOpen] = useState(false)
   const buttonCSS = "text-stone-900 md:text-[10px] text-[5px] font-['Kumbh Sans'] text-start"

   // need a useEffect for the signal changing
   useEffect(() => {
      // the case where another event is opened
      if (props.signal.localOpen !== props.index) {
         setOpen(false)
      }
   }, [props.signal, props.index])

   function handleClick() {
      // when none are open we set open to true
      // also when one is open and it is not the current event
      if (!props.signal.globalOpen || props.signal.localOpen !== props.index){
         setOpen(true)
         props.setSignal({
            globalOpen: true,
            localOpen: props.index,
         })
      } else if (props.signal.localOpen === props.index) {
         props.setSignal({
            globalOpen: false,
            localOpen: -1,
         })
      }
   }

   return (
      <div className='relative'>

         <button 
         onClick={() => handleClick()}
         className={`w-full h-auto p-[11px] ${open ? 'text-black bg-[#00B628]' : 'text-black/90 bg-[#C4D2DC]'} rounded-[10px] justify-start items-start gap-1 hover:shadow-lg`}>
            <div className="justify-start items-start gap-2">
               <div className={`${buttonCSS} font-semibold`}>{props.event.event_start_time} {props.event.event_title} </div>
               <div className={`${buttonCSS}`}>{props.event.event_capacity} Openings</div>
            </div>
         </button>

         {open &&
            <div className="z-10 w-[174px] h-auto absolute mt-[10px] bg-[#F2F8FC] rounded-[10px] shadow-md">
               <div className='inline-flex items-center p-[10px] gap-2 w-full rounded-[10px] bg-[#0E5BB5]'>
                  <NewBookingIcon />
                  <NewBooking />
               </div>
               <div className='inline-flex items-center p-[7px] gap-2 w-full rounded-[10px] hover:shadow-md'>
                  <EventDetailsIcon />
                  <EventDetail />
               </div>
               <div className='inline-flex items-center p-[7px] gap-2 w-full rounded-[10px]'>
                  <div className="text-stone-900 text-[10px] font-normal font-['Kumbh Sans']">{props.event.adult_passengers}</div>
                  <div className="text-stone-900 text-[10px] font-normal font-['Kumbh Sans']">Adults</div>
               </div>
               <div className='inline-flex items-center p-[7px] gap-2 w-full rounded-[10px]'>
                  <div className="text-stone-900 text-[10px] font-normal font-['Kumbh Sans']">{props.event.children_passengers}</div>
                  <div className="text-stone-900 text-[10px] font-normal font-['Kumbh Sans']">Children</div>
               </div>
               <div className='inline-flex items-center p-[7px] gap-2 w-full rounded-[10px]'>
                  <div className="text-stone-900 text-[10px] font-normal font-['Kumbh Sans']">{props.event.infant_passengers}</div>
                  <div className="text-stone-900 text-[10px] font-normal font-['Kumbh Sans']">Infant</div>
               </div>
            </div>}
      </div>
   )
}
