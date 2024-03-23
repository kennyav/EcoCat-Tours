import React, { useEffect, useState } from 'react'
import httpClient from '../httpClient';

// calendar components
import SideMenuEventInfo from './Calendar/SideMenuEventInfo'
import Calendar from './Calendar/Calendar';

export default function Bookings({ setTitle }) {

  // depending on the current week we are in, we will pull data that
  // represents the events for the booking
  const [eventClick, setEventClick] = useState({
    eventInfo: {},
    passengerInfo: [{}],
    date: {},
    clicked: false
  });
  const [padding, setPadding] = useState('pr-[41px]')
  const [events, setEvents] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("//127.0.0.1:8000/events/@events");
        setEvents(resp.data)
      } catch (error) {
        console.log("Error", error)
      }
    })();
  }, []);


  useEffect(() => {
    setPadding('pr-[0px]')
  }, [eventClick]);

  return (
    <div className={`flex flex-row ${padding} pl-[41px]`}>
      <Calendar setEventClick={setEventClick} setTitle={setTitle} title={'Bookings'} events={events}/>
      <div className={`pl-[20px] transition-transform transform translate-x-${eventClick.clicked ? '0' : 'full'}`}>
        {eventClick.clicked &&
          <div className="duration-700 ease-in-out">
            <SideMenuEventInfo ev={eventClick}/>
          </div>
        }
      </div>
    </div>
  )
}

