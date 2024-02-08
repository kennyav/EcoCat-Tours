import React, { useEffect, useState } from 'react';
// icons
import { NewBookingIcon } from '../Icons';
import { EventDetailsIcon } from '../Icons';

export default function Event(props) {

   const [open, setOpen] = useState(false)

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
      props.setEventClick(!props.open)
   }

   return (
      <div className='relative'>

         <button 
         onClick={() => handleClick()}
         className={`w-full h-[50px] p-[11px] ${open ? 'text-black bg-[#00B628]' : 'text-black/90 bg-[#C4D2DC]'} rounded-[10px] justify-start items-start gap-1 hover:shadow-lg`}>
            <div className="justify-start items-start gap-2">
               <div className="text-stone-900 md:text-[10px] text-[5px] font-semibold font-['Kumbh Sans']">1pm Snorkel Cruise </div>
               <div className="text-stone-900 md:text-[10px] text-[5px] font-normal font-['Kumbh Sans']">90 Openings</div>
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
