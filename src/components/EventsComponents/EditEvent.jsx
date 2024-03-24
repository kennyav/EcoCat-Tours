import React from 'react'
import { useLocation } from 'react-router-dom';

import Calendar from '../Calendar/Calendar'

export default function EditEvent({ setTitle }) {
   const location = useLocation();
   const { title, event } = location.state;

   return (
      <div className={`flex px-[41px]`}>
         <Calendar setEventClick={() => { }} setTitle={setTitle} title={title} events={[event]}/>
      </div>
   )
}
