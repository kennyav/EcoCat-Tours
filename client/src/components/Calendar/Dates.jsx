import React from 'react'

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function Dates(props) {

   function getDaysInMonthWithPlaceholders(year, month) {
      const firstDayOfMonth = new Date(year, month, 1);
      const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.
    
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const daysArray = Array.from({ length: daysInMonth + startingDayOfWeek }, (_, i) => {
        if (i < startingDayOfWeek) {
          return null; // Placeholder for days before the 1st day of the month
        }
        return i - startingDayOfWeek + 1; // Adjusted day of the month
      });
    
      return daysArray;
    }
    
    // Example usage
    const year = 2024;
    const month = 0; // January (months are zero-based)
    
    const daysOfMonth = getDaysInMonthWithPlaceholders(year, month);

   return (
      <div className='grid grid-cols-7 grid-flow-row p-5 border-2 font-KumbhSans'>
            {
               DAYS_OF_WEEK.map(days => {
                  return (
                     <div className='font-bold text-center text-[14px] p-4 border-2'>
                        {days}
                     </div>
                  )
               })
            }
            {
               daysOfMonth.map(days => {
                  return (
                     <div className='text-center p-2'>
                        {days}
                     </div>
                  )
               })
            }
      </div>
   )
}
