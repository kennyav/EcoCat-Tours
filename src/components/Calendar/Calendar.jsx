import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { update } from '../../reducers/loginSlice';

// components
import Header from './Header';
import DatesGrid from './DatesGrid';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function Calendar({ events, setEventClick, eventClick, title }) {

   const dispatch = useDispatch()
   const [currentMonth, setCurrentMonth] = useState({
      name: "",
      index: -1
   });
   const [currentYear, setCurrentYear] = useState(2024);
   const [daysOfMonth, setDaysOfMonth] = useState([]);

   useEffect(() => {
      dispatch(update(title));
   }, [dispatch, title]);

   useEffect(() => {
      const today = new Date();
      const yearIndex = today.getFullYear()
      const monthIndex = today.getMonth()
      const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(today);

      setCurrentYear(yearIndex)
      setCurrentMonth({
         name: `${monthName}`,
         index: monthIndex
      });
   }, []);


   useEffect(() => {
      const year = currentYear;
      const month = MONTH_NAMES.indexOf(currentMonth.name);

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

   }, [currentMonth, currentYear]);

   return (
      <div className={`flex flex-col w-full h-full transition-all duration-500 ${eventClick ? 'mr-[0px]' : 'mr-[-250px]'} rounded-[25px] bg-white`}>
         <Header
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            currentYear={currentYear}
            setCurrentYear={setCurrentYear}
         />
         <DatesGrid
            dates={daysOfMonth}
            currentMonth={currentMonth}
            currentYear={currentYear}
            setEventClick={setEventClick}
            events={events}
         />
      </div>
   )
}
