import React, { useEffect, useState } from 'react'

// calendar components
import SideMenuEventInfo from './Calendar/SideMenuEventInfo'
import Calendar from './Calendar/Calendar';

export default function Bookings({ setTitle }) {

  // depending on the current week we are in, we will pull data that
  // represents the events for the booking
  const [eventClick, setEventClick] = useState(false);
  const [padding, setPadding] = useState('pr-[41px]')

  useEffect(() => {
    setPadding('pr-[0px]')
  }, [eventClick]);

  return (
    <div className={`flex flex-row ${padding} pl-[41px]`}>
      <Calendar setEventClick={setEventClick} setTitle={setTitle} title={'Bookings'}/>
      <div className={`pl-[20px] transition-transform transform translate-x-${eventClick ? '0' : 'full'}`}>
        {eventClick &&
          <div className="duration-700 ease-in-out">
            <SideMenuEventInfo eventClick={eventClick}/>
          </div>
        }
      </div>
    </div>
  )
}

