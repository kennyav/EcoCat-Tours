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
            (() => {
               let temp = [];
               for (let i = startDay; i <= props.dates.length; i++) {
                  temp.push(i);
               }
               return temp;
            })()
         ) : (
            (() => {
               let temp = [];
               for (let i = startDay; i <= endDay; i++) {
                  temp.push(i);
               }
               return temp;
            })()
         );

         return dates
      } else if (inBetweenMonths.includes(expectedMonth)) {
         let dates = (() => {
            let temp = [];
            for (let i = 1; i <= props.dates.length; i++) {
               temp.push(i);
            }
            return temp;
         })()

         return dates
      } else if (endMonth === expectedMonth && endYear === expectedYear) {
         // if we are in the end month then we are going to go to the end day
         let dates = (() => {
            let temp = [];
            for (let i = 1; i <= endDay; i++) {
               temp.push(i);
            }
            return temp;
         })()

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
                           event={props.event}
                        />}
                  </div >
               )
            })
         }
      </div>
   )
}
