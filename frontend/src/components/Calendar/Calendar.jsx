import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../../reducers/loginSlice';
import { updateDate } from '../../reducers/dateSlice';
import moment from 'moment';

// components
import Header from './Header';
import DatesGrid from './DatesGrid';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function Calendar({ events, title }) {

   const [abrvDaysOfWeek, setAbrvDaysOfWeek] = useState(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
   const [daysOfWeek, setDaysOfWeek] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
   const calendarInformation = useSelector((state) => state.calendarInformation)
   const date = useSelector((state) => state.dateValue)
   const dateView = useSelector((state) => state.dateView.value)
   const dispatch = useDispatch()
   const [days, setDays] = useState([]);

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
   }, [dispatch]);


   // useEffect(() => {

   //    if (dateView === "Month") {
   // const year = date.year;
   // const month = MONTH_NAMES.indexOf(date.monthName);

   // const firstDayOfMonth = new Date(year, month, 1);
   // const startingDayOfWeek = firstDayOfMonth.getDay() - 1; // 0 for Monday, 6 for Sunday, etc.
   // const daysInMonth = new Date(year, month + 1, 0).getDate();
   // const daysArray = Array.from({ length: daysInMonth + startingDayOfWeek }, (_, i) => {
   //    if (i < startingDayOfWeek) {
   //       return null; // Placeholder for days before the 1st day of the month
   //    }
   //    return i - startingDayOfWeek + 1; // Adjusted day of the month
   // });

   // setDays(daysArray);

   //    }

   // }, [date]);

   useEffect(() => {
      if (dateView === "Month") {
         setDaysOfWeek(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
         setAbrvDaysOfWeek(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"])
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

         setDays(daysArray);
      } else if (dateView === "Week") {
         setDaysOfWeek(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
         setAbrvDaysOfWeek(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"])
         // Logic for getting days of the current week
         const week = moment().startOf('week');
         console.log(week.toString())
         let daysArray = [];

         for (let i = 1; i < 7; i++) {
            // Add i days to the start of the week and get the day number
            const nextDay = week.clone().add(i, 'day').day();
            // Push the day number into the daysArray
            daysArray.push(nextDay);
         }

         daysArray.push(daysArray[daysArray.length - 1] + 1);

         // Replace the first element with the current day of the week

         setDays(daysArray);
      } else if (dateView === "Day") {
         // Logic for getting a single day
         const day = moment().date();
         setDaysOfWeek([daysOfWeek[moment(day).weekday() - 1]])
         setAbrvDaysOfWeek([abrvDaysOfWeek[moment(day).weekday() - 1]])

         setDays([day]);
      }
   }, [date, dateView]);





   return (
      <div className={`flex flex-col w-full h-full transition-all duration-500 ${calendarInformation.clicked ? 'mr-[0px]' : 'mr-[-250px]'} rounded-[25px] bg-white`}>
         <Header />
         <DatesGrid
            dates={days}
            events={events}
            daysOfWeek={daysOfWeek}
            abrvDaysOfWeek={abrvDaysOfWeek}
         />
      </div>
   )
}
