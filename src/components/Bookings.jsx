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
    passengerInfo: [],
    date: {},
    clicked: false
  });
  const [events, setEvents] = useState([])

  console.log("bookings click", eventClick.clicked)

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


  return (
    <div className={`flex flex-row overflow-x-hidden pl-[41px]`}>
      <Calendar 
        setEventClick={setEventClick} 
        eventClick={eventClick.clicked} 
        setTitle={setTitle} 
        title={'Bookings'} 
        events={events} />
      
      <div className={`pl-[20px] right-0 transition-all duration-500 ${eventClick.clicked ? 'translate-x-0' : 'translate-x-full'}`}>
        <SideMenuEventInfo ev={eventClick} />
      </div>
    </div>
  )
}

