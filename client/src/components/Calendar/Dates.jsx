import React from 'react'

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function Dates(props) {
   return (
      <div className='grid grid-cols-7 grid-flow-row p-5 border-2 font-KumbhSans'>
         {
            DAYS_OF_WEEK.map((dayName, i) => {
               return (
                  <div key={i} className='font-bold text-center text-[14px] p-4 border-2'>
                     {dayName}
                  </div>
               )
            })
         }
         {
            props.dates.map((dayNumber,i) => {
               return (
                  <div key={i} className='text-center p-2'>
                     {dayNumber}
                  </div>
               )
            })
         }
      </div>
   )
}
