import React from 'react'

// events import
import Event from './Event'

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function Dates(props) {

   function getCurrentWeekDayNumbers() {
      const currentDate = new Date();
      const currentDay = currentDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
    
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDay); // Set to the first day (Sunday) of the current week
    
      const dayNumbers = Array.from({ length: 7 }, (_, index) => {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + index);
        return day.getDate();
      });
    
      return dayNumbers;
    }
    
    const currentWeekDayNumbers = getCurrentWeekDayNumbers();
    
   return (
      <div className='grid grid-cols-7 grid-flow-row p-5 font-KumbhSans'>
         {
            DAYS_OF_WEEK.map((dayName, i) => {
               return (
                  <div key={i} className='font-bold text-center text-[14px] p-4'>
                     {dayName}
                  </div>
               )
            })
         }
         <div className='col-span-7 border' />
         {
            props.dates.map((dayNumber, i) => {
               return (
                  <div className='p-2'>
                     <div key={i} className='text-left text-[14px] p-2'>
                        {dayNumber}
                     </div>
                     {/* if we are in the current week then we will display events */}
                     {currentWeekDayNumbers.includes(dayNumber) && <Event time={'3pm'} title={'Snorkle Cruise'} openings={'90 openings'} />}
                  </div >
               )
            })
         }
      </div>
   )
}
