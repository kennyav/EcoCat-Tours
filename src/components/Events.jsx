import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import httpClient from '../httpClient';

// components
import Event from './Event'

// icons
import { EventAddIcon } from './Icons'


export default function Events({ setTitle }) {

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


  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/add-events');
  }

  useEffect(() => {
    setTitle("Events");
  }, [setTitle]);

  return (
    <div className='grid grid-cols-2 grid-flow-row gap-5 px-[41px] py-[46px] place-content-center'>
      {events.map((event) => {
        let daysMapping = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let days = event.event_run_days.split('').map((bit, index) => bit === '1' ? daysMapping[index] : null).filter(day => day !== null).join(', ');
        return (
          <Event key={event.id} title={event.event_title} info={event.event_description} days={days} event={event} />
        )
      })}
      <div
        onClick={() => handleClick()}
        className='flex items-center justify-center'>
        <EventAddIcon />
      </div>
    </div>
  )
}
