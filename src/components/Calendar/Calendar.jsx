import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../../reducers/loginSlice';
import { updateDate } from '../../reducers/dateSlice';

// components
import Header from './Header';
import DatesGrid from './DatesGrid';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function Calendar({ events, title }) {

   const calendarInformation = useSelector((state) => state.calendarInformation)
   const date = useSelector((state) => state.dateValue)
   const dispatch = useDispatch()
   const [daysOfMonth, setDaysOfMonth] = useState([]);

   useEffect(() => {
      dispatch(update(title));
   }, [dispatch, title]);

   useEffect(() => {
      const today = new Date();
      const yearIndex = today.getFullYear()
      const monthIndex = today.getMonth()
      const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(today);

      dispatch(updateDate({
         year: yearIndex,
         monthName: monthName,
         monthIndex: monthIndex
      }))
   }, []);


   useEffect(() => {
      const year = date.year;
      const month = MONTH_NAMES.indexOf(date.monthName);

      const firstDayOfMonth = new Date(year, month, 1);
      const startingDayOfWeek = firstDayOfMonth.getDay() - 1; // 0 for Monday, 6 for Sunday, etc.
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const daysArray = Array.from({ length: daysInMonth + startingDayOfWeek }, (_, i) => {
         if (i < startingDayOfWeek) {
            return null; // Placeholder for days before the 1st day of the month
         }
         return i - startingDayOfWeek + 1; // Adjusted day of the month
      });

      setDaysOfMonth(daysArray);

   }, [date]);

   return (
      <div className={`flex flex-col w-full h-full transition-all duration-500 ${calendarInformation.clicked ? 'mr-[0px]' : 'mr-[-250px]'} rounded-[25px] bg-white`}>
         <Header/>
         <DatesGrid
            dates={daysOfMonth}
            events={events}
         />
      </div>
   )
}
