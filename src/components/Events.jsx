import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import httpClient from '../httpClient';

// components
import EventLoader from './EventsComponents/EventLoader';

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
      {events && events.map((event) => (
        <EventLoader key={event.id} event={event} eventId={event.id} />
      ))}
      <div
        className='flex items-center justify-center'>
        <EventAddIcon onClick={() => handleClick()} />
      </div>
    </div>
  )
}
