import React, { useState, useEffect } from 'react'

// icon
import { SearchIcon } from '../Icons'

// component
import GuestInfo from './GuestInfo'

export default function EventInfo(props) {
  const event = props.ev.eventInfo
  const date = props.ev.date
  const passengers = props.ev.passengerInfo
  const eventTimeInfo = date.month ? `${date.month} ${date.day}, ${date.year} @ ${event.start_time}` : 'No Event Selected'

  // have to use states for this
  const [title, setTitle] = useState()


  useEffect(() => {
    setTitle(event.title)
  }, [event])

  console.log("Passenger Information", passengers)

  // takes in the event information and displays it in the column
  return (
    <div className={`flex flex-col w-[272px] min-h-full h-auto font-['Kumbh Sans'] rounded-l-[25px] bg-white`} >
      <div className='flex flex-col pl-[26px] py-[30px]'>
        <div className="text-stone-900 text-xl font-bold">{title}</div>
        <div className="text-stone-900 text-[10px] font-normal pb-[14px]">{eventTimeInfo}</div>
        <div className='flex bg-sky-50 rounded-[25px]'>
          <SearchIcon />
          <textarea
            rows={1}
            cols={20}
            className="left-[27px] top-[6px] items-center text-center text-stone-900 text-[10px] font-normal bg-sky-50 outline-none resize-none"
            placeholder='Search Here ...' />
        </div>
      </div>
      {passengers && passengers.map((passenger) => {
        return <GuestInfo passenger={passenger}/>
      })}
    </div >
  )
}
