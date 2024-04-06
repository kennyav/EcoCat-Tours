import React, { useEffect, useState } from 'react'
import httpClient from '../httpClient';
import { useSelector } from 'react-redux';

// calendar components
import SideMenuEventInfo from './Calendar/SideMenuEventInfo'
import Calendar from './Calendar/Calendar';

export default function Bookings() {
  const url = useSelector((state) => state.development.value)
  const calendarInformation = useSelector((state) => state.calendarInformation)
  const openedFull = useSelector((state) => state.sideMenu.value)
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
  }, [url]);


  return (
    <div className={`flex flex-row transition-all duration-500 gap-5 ${openedFull ? 'pr-[41px]' : calendarInformation.clicked ? 'pl-[41px]' : 'pl-[41px]'} `}>
      <div className={`left-0 transition-all duration-500 ${openedFull ? '-translate-x-56 w-0' : calendarInformation.clicked ? 'w-[97%]' : 'w-[97%]'} rounded-[25px] bg-white`}>
        <Calendar
          title={"Bookings"}
          events={events} />
      </div> 
      <div className={`right-0 rounded-[25px] transition-all duration-500 ${openedFull ? 'w-full px-[41px] rounded-[25px]' : calendarInformation.clicked ? "translate-x-0 w-[300px]" : 'translate-x-56 w-0'} min-h-full h-auto font-['Kumbh Sans'] bg-white`}>
        <SideMenuEventInfo ev={calendarInformation} />
      </div>
    </div>
  )
}

