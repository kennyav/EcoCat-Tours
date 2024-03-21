import React, { useEffect, useState } from 'react'

// events import
import Event from './Event'

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function Dates(props) {
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

   function returnRunDays(start, end) {
      // the days the event is to be shown. In [Su, M, T, W, Th, F, Sa] where 1 is true and 0 is false
      const run = [...props.event.event_run_days]
      let temp = [{}];
      const realIndex = props.dates.findIndex(item => item !== null) + start

      // for bi weekly % 14
      let workingIndex = (realIndex % 7) - 1

      for (let i = start; i <= end; i++) {
         const showDay = run[workingIndex] === "1" ? true : false
         temp.push({
            day: i,
            show: showDay
         });

         if (workingIndex < 6) {
            workingIndex ++
         } else {
            workingIndex = 0
         }
      }
      return temp;
   }

   function eventWeekDayNumbers() {
      // we have props.currentMonth props.currentYear props.event.event_start_date props.event_end_date
      const startDateStr = props.event.event_start_date
      const endDateStr = props.event.event_end_date

      const [startYear, sMonth, startDay] = startDateStr.split('-').map(Number);
      const [endYear, eMonth, endDay] = endDateStr.split('-').map(Number);

      const inBetweenMonths = []
      for (let i = sMonth; i < eMonth - 1; i++) {
         inBetweenMonths.push(MONTHS[i]);
      }

      const startMonth = MONTHS[sMonth - 1]
      const endMonth = MONTHS[eMonth - 1]
      // Month format "March" and year format "2024"
      let expectedMonth = props.currentMonth;
      let expectedYear = props.currentYear;

      // Compare the extracted month and year with the expected values
      if (startMonth === expectedMonth && startYear === expectedYear) {
         console.log("The date, month, and year match the expected values.");
         let dates = endMonth !== startMonth ? (
            (() => { return returnRunDays(startDay, props.dates.length) })()
         ) : (
            (() => { return returnRunDays(startDay, endDay) })()
         );
         return dates
      } else if (inBetweenMonths.includes(expectedMonth)) {
         let dates = (() => { return returnRunDays(1, props.dates.length) })()
         return dates
      } else if (endMonth === expectedMonth && endYear === expectedYear) {
         // if we are in the end month then we are going to go to the end day
         let dates = (() => { return returnRunDays(1, endDay) })()
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
                     {/* if the event is in the shown month, year, and day then show else don't */}
                     {currentWeekDayNumbers.some(dayObj => dayObj.day === dayNumber && dayObj.show) &&
                        <Event
                           signal={signal}
                           setSignal={setSignal}
                           currentMonth={props.currentMonth}
                           index={i}
                           event={props.event}
                        />}
                  </div >
               )
            })
         }
      </div>
   )
}
