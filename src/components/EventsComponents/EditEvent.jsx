import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Calendar from '../Calendar/Calendar'
import SideMenuEventInfo from '../Calendar/SideMenuEventInfo'

export default function EditEvent() {
   const location = useLocation();
   const { event } = location.state;
   const [eventClick, setEventClick] = useState({
      eventInfo: {},
      passengerInfo: [],
      date: {},
      clicked: false
   });


   return (
      <div className={`flex flex-row overflow-x-hidden pl-[41px]`}>
         <Calendar
            setEventClick={setEventClick}
            eventClick={eventClick.clicked}
            title={event.title}
            events={[event]} />

         <div className={`pl-[20px] right-0 transition-all duration-500 ${eventClick.clicked ? 'translate-x-0' : 'translate-x-full'}`}>
            <SideMenuEventInfo ev={eventClick} />
         </div>
      </div>
   )
}
