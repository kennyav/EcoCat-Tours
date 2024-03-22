import React, { useState } from 'react'

// events import
import Event from './Event'

//const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function Dates(props) {

   const [currentWeekDayNumbers, setCurrentWeekDayNumbers] = useState(eventWeekDayNumbers())


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
            workingIndex++
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


      const inBetweenMonths = [{}]

      // if we are in the same year then we can find the difference and add between them
      if (startYear === endYear) {
         for (let i = sMonth; i < eMonth - 1; i++) {
            inBetweenMonths.push({
               month: MONTHS[i],
               year: startYear
            });
         }
      } else {
         // we are not in the same year and we need to calculate the difference in years
         const yearsDiff = endYear - startYear

         for (let i = 0; i <= yearsDiff; i++) {
            let start = 0
            let end = 12
            if (i === 0) {
               // were in the starting year
               start = sMonth - 1

            } else if (i === yearsDiff) {
               end = eMonth
            }
            for (let j = start; j < end; j++) {
               inBetweenMonths.push({
                  month: MONTHS[j],
                  year: startYear + i
               });
            }
         }
      }


      const startMonth = MONTHS[sMonth - 1]
      const endMonth = MONTHS[eMonth - 1]
      // Month format "March" and year format "2024"
      let expectedMonth = props.currentMonth;
      let expectedYear = props.currentYear;

      // Compare the extracted month and year with the expected values
      if (startMonth === expectedMonth && startYear === expectedYear) {
         let dates = endMonth !== startMonth ? (
            (() => { return returnRunDays(startDay, props.dates.length) })()
         ) : (
            (() => { return returnRunDays(startDay, endDay) })()
         );
         return dates
      } else if (inBetweenMonths.some(obj => obj.month === expectedMonth && obj.year === expectedYear)) {
         let dates = (() => { return returnRunDays(1, props.dates.length) })()
         return dates
      } else if (endMonth === expectedMonth && endYear === expectedYear) {
         // if we are in the end month then we are going to go to the end day
         let dates = (() => { return returnRunDays(1, endDay) })()
         return dates
      } else {
         return []
      }

   }


   return (
      <div>
         {/* if the event is in the shown month, year, and day then show else don't */}
         {currentWeekDayNumbers.some(dayObj => dayObj.day === props.dayNumber && dayObj.show) &&
            <Event
               signal={props.signal}
               setSignal={props.setSignal}
               index={props.i}
               event={props.event}
               month={props.currentMonth}
               year={props.currentYear}
               day={props.dayNumber}
            />}
      </div >
   )
}
