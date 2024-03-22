import React, { useState, useEffect } from 'react'
import Dates from './Dates'

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function DatesGrid(props) {

   // signal for when events are clicked
   const [signal, setSignal] = useState({
      globalOpen: false,
      localOpen: -1,
      info: {},
      eDate: {}
   })

   useEffect(() => {
      props.setEventClick({
         eventInfo: signal.info,
         clicked: signal.globalOpen,
         date: signal.eDate})
   }, [signal])

   return (
      <div className='grid grid-cols-7 grid-flow-row p-5 font-KumbhSans'>
         {DAYS_OF_WEEK.map((dayName, i) => {
            return (
               <div key={i} className='font-bold text-center text-[14px] p-4'>
                  {dayName}
               </div>
            )
         })}
         <div className='col-span-7 border' />
         {props.dates.map((dayNumber, i) => {
            return (
               <div key={i} className='p-2'>
                  <div key={i} className='text-left text-[14px] p-2'>
                     {dayNumber}
                  </div>
                  {props.events.map(event => {
                     return (
                        <div key={event.id} className='pb-1'>
                           <Dates
                              setSignal={setSignal}
                              signal={signal}
                              dates={props.dates}
                              currentMonth={props.currentMonth}
                              currentYear={props.currentYear}
                              setEventClick={props.setEventClick}
                              eventClick={props.eventClick}
                              event={event}
                              dayNumber={dayNumber}
                              i={i} />
                        </div>
                     )
                  })}
               </div>
            )
         })}
      </div>
   )
}
