import React, { useEffect, useState } from 'react';
import httpClient from '../../httpClient';
import { useSelector } from 'react-redux';

// time
import moment from 'moment';

// icons
import { NewBookingIcon } from '../Icons';
import { EventDetailsIcon } from '../Icons';

// components
import EventDetail from './EventDetail';
import NewBooking from './NewBooking';

export default function Event(props) {
   // open state
   const [open, setOpen] = useState(props.signal.id === props.id)
   const buttonCSS = "text-stone-900 md:text-[10px] text-[5px] font-['Kumbh Sans'] text-start"

   const startDate = moment.utc(props.scheduledEvent.start_time)
   // Parse the string into a Date object
   const dateObject = new Date(props.scheduledEvent.start_time);
   // Extract the time component
   const timeString = dateObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'GMT' });

   const getPassengers = async () => {
      props.setSignal({
         open: true,
         id: props.id,
         se_id: props.scheduledEvent.id,
         event: props.event,
         date: startDate
      });
   }


   // need a useEffect for the signal changing
   useEffect(() => {
      // the case where another event is opened
      if (props.signal.id !== props.id) {
         setOpen(false)
      }
   }, [props.signal, props.id])

   function handleClick() {
      // when none are open we set open to true
      // also when one is open and it is not the current event
      if (!props.signal.open && !open) {
         setOpen(true)
         // if it is opened then we are going to fetch the passenger information
         getPassengers()

      } else if (props.signal.id === props.id) {
         setOpen(false)
         props.setSignal({
            open: false,
            id: "",
            se_id: props.scheduledEvent.id,
            event: {},
            date: {}

         })
      } else if (!open && props.signal.open) {
         setOpen(true)
         getPassengers()
      }
   }

   return (
      <div className='relative'>

         <button
            onClick={() => handleClick()}
            className={`w-full h-auto p-[11px] ${open ? 'text-black bg-[#00B628]' : 'text-black/90 bg-[#C4D2DC]'} rounded-[10px] justify-start items-start gap-1 hover:shadow-lg`}>
            <div className="justify-start items-start gap-2">
               <div className={`${buttonCSS} font-semibold`}>{timeString} {props.event.title} </div>
               <div className={`${buttonCSS}`}>{props.scheduledEvent.capacity} Openings</div>
            </div>
         </button>

         {open &&
            <div className="z-10 w-[174px] h-auto absolute mt-[10px] bg-[#F2F8FC] rounded-[10px] shadow-md">
               <div className='inline-flex items-center p-[10px] gap-2 w-full rounded-[10px] bg-[#0E5BB5]'>
                  <NewBookingIcon />
                  <NewBooking scheduledEvent={props.scheduledEvent} event={props.event} />
               </div>
               <div className='inline-flex items-center p-[7px] gap-2 w-full rounded-[10px] hover:shadow-md'>
                  <EventDetailsIcon />
                  <EventDetail event={props.event} scheduledEvent={props.scheduledEvent} />
               </div>
               <div className='inline-flex items-center p-[7px] gap-2 w-full rounded-[10px]'>
                  <div className="text-stone-900 text-[10px] font-normal font-['Kumbh Sans']">{props.scheduledEvent.curr_adult}</div>
                  <div className="text-stone-900 text-[10px] font-normal font-['Kumbh Sans']">Adults</div>
               </div>
               <div className='inline-flex items-center p-[7px] gap-2 w-full rounded-[10px]'>
                  <div className="text-stone-900 text-[10px] font-normal font-['Kumbh Sans']">{props.scheduledEvent.curr_children}</div>
                  <div className="text-stone-900 text-[10px] font-normal font-['Kumbh Sans']">Children</div>
               </div>
               <div className='inline-flex items-center p-[7px] gap-2 w-full rounded-[10px]'>
                  <div className="text-stone-900 text-[10px] font-normal font-['Kumbh Sans']">{props.scheduledEvent.curr_infant}</div>
                  <div className="text-stone-900 text-[10px] font-normal font-['Kumbh Sans']">Infants</div>
               </div>
            </div>}
      </div>
   )
}
