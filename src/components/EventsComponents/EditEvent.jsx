import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Calendar from '../Calendar/Calendar'
import SideMenuEventInfo from '../Calendar/SideMenuEventInfo'
import { useSelector } from 'react-redux';

export default function EditEvent() {
   const location = useLocation();
   const calendarInformation = useSelector((state) => state.calendarInformation)
   const { event } = location.state;

   return (
      <div className={`flex flex-row overflow-x-hidden pl-[41px]`}>
         <Calendar
            title={event.title}
            events={[event]} />

         <div className={`pl-[20px] right-0 transition-all duration-500 ${calendarInformation.clicked ? 'translate-x-0' : 'translate-x-full'}`}>
            <SideMenuEventInfo ev={calendarInformation} />
         </div>
      </div>
   )
}
