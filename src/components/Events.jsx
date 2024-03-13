import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

// components
import Event from './Event'

// icons
import { EventAddIcon } from './Icons'

// props.title, props.info, props.days, props.time
// mock data
const events = [
  {
    title: "Snorkel Cruise",
    info: "All Ages • 3 Hours • Great for Families",
    days: "Monday, Tuesday, Wednesday, Thursday, Friday",
    time: "1pm - 4pm"
  },
  {
    title: "Happy Hour Cruise",
    info: "All Ages",
    days: "Monday, Tuesday, Wednesday, Thursday, Friday",
    time: "3:30pm - 5pm"
  },
  {
    title: "Sunset Cruise",
    info: "All Ages",
    days: "Monday, Tuesday, Wednesday, Thursday, Friday",
    time: "5pm - 7pm"
  },
]


export default function Events({setTitle}) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/edit-events');
  }

  useEffect(() => {
    setTitle("Events"); 
  }, [setTitle]);

  return (
    <div className='grid grid-cols-2 grid-flow-row gap-5 px-[41px] py-[46px] place-content-center'>
      {events.map((event) => {
        return (
          <Event key={event.title} title={event.title} info={event.info} days={event.days} time={event.time} />
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
