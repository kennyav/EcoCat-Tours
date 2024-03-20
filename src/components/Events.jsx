import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import httpClient from '../httpClient';

// components
import Event from './Event'

// icons
import { EventAddIcon } from './Icons'

// props.title, props.info, props.days, props.time
// mock data
// const events = [
//   {
//     title: "Snorkel Cruise",
//     info: "All Ages • 3 Hours • Great for Families",
//     days: "Monday, Tuesday, Wednesday, Thursday, Friday",
//     time: "1pm - 4pm"
//   },
//   {
//     title: "Happy Hour Cruise",
//     info: "All Ages",
//     days: "Monday, Tuesday, Wednesday, Thursday, Friday",
//     time: "3:30pm - 5pm"
//   },
//   {
//     title: "Sunset Cruise",
//     info: "All Ages",
//     days: "Monday, Tuesday, Wednesday, Thursday, Friday",
//     time: "5pm - 7pm"
//   },
// ]


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
        let days = event.event_run_days.split('').map((bit, index) => bit === '1' ? daysMapping[index] : null).filter(day => day !== null);
        let time = event.start_time + " " + event.end_time
        return (
          <Event key={event.id} title={event.event_title} info={event.event_description} days={days} time={time} event={event} />
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
