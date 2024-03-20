import React, { useEffect, useState } from 'react'

// events import
import Event from './Event'

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function Dates(props) {

   console.log(props.event.event_start_date)

   const [signal, setSignal] = useState({
      globalOpen: false,
      localOpen: -1,
   })

   useEffect(() => {
      props.setEventClick(signal.globalOpen)
   }, [props, signal])

   // function getCurrentWeekDayNumbers() {
   //    const currentDate = new Date();
   //    const currentDay = currentDate.getDay(); // 0 for Sunday, 1 for Monday, etc.

   //    const startOfWeek = new Date(currentDate);
   //    startOfWeek.setDate(currentDate.getDate() - currentDay); // Set to the first day (Sunday) of the current week

   //    const dayNumbers = Array.from({ length: 7 }, (_, index) => {
   //       const day = new Date(startOfWeek);
   //       day.setDate(startOfWeek.getDate() + index);
   //       return day.getDate();
   //    });

   //    return dayNumbers;
   // }

   function eventWeekDayNumbers() {
      // we have props.currentMonth props.currentYear props.event.event_start_date props.event_end_date
      const startDateStr = props.event.event_start_date
      const endDateStr = props.event.event_end_date

      // Convert the date string to a Date object
      let startDateObj = new Date(startDateStr);
      let endDateObj = new Date(endDateStr)
 
      // Extract month and year components
      let startMonth = startDateObj.toLocaleString('default', { month: 'long' }); // Full month name
      let startYear = startDateObj.getFullYear();
      let startDay = startDateObj.getDate() + 1;
      let endDay = endDateObj.getDate() + 1;
      console.log(startDay, endDay)

      // Month format "March" and year format "2024"
      let expectedMonth = props.currentMonth;
      let expectedYear = props.currentYear;

      // Compare the extracted month and year with the expected values
      if (startMonth === expectedMonth && startYear === expectedYear) {
         console.log("The date, month, and year match the expected values.");
         let dates = []
         for (let i = startDay; i <= endDay; i++) {
            dates.push(i);
        }
         return dates
      } else {
         console.log("The date, month, or year does not match the expected values.");
         return []
      }

   }

   const currentWeekDayNumbers = eventWeekDayNumbers();

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
                  <div key={i} className='p-2'>
                     <div key={i} className='text-left text-[14px] p-2'>
                        {dayNumber}
                     </div>
                     {/* if we are in the current week then we will display events */}
                     {/* TODO - add a check to see that the current month and year matches as well */}
                     {currentWeekDayNumbers.includes(dayNumber) &&
                        <Event
                           signal={signal}
                           setSignal={setSignal}
                           index={i}
                           time={'3pm'}
                           title={'Snorkle Cruise'}
                           openings={'90 openings'}
                        />}
                  </div >
               )
            })
         }
      </div>
   )
}
