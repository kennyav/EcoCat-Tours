import React, { useEffect, useState } from 'react'
import httpClient from '../httpClient';
import { useSelector } from 'react-redux';

// calendar components
import SideMenuEventInfo from './Calendar/SideMenuEventInfo'
import Calendar from './Calendar/Calendar';

export default function Bookings() {
  const url = useSelector((state) => state.development.value)
  const calendarInformation = useSelector((state) => state.calendarInformation)
  const [events, setEvents] = useState([])


  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get(`${url}:8000/events/@events`);
        setEvents(resp.data)
      } catch (error) {
        console.log("Error", error)
      }
    })();
  }, []);


  return (
    <div className={`flex flex-row overflow-x-hidden pl-[41px]`}>
      <Calendar
        title={"Bookings"}
        events={events} />
      <div className={`pl-[20px] right-0 transition-all duration-500 ${calendarInformation.clicked ? 'translate-x-0' : 'translate-x-full'}`}>
        <SideMenuEventInfo ev={calendarInformation} />
      </div>
    </div>
  )
}

