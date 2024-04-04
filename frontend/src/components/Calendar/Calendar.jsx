import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../../reducers/loginSlice';
import moment from 'moment';

// components
import Header from './Header';
import DatesGrid from './DatesGrid';

const WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const ABV_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export default function Calendar({ events, title }) {

   const [abrvDaysOfWeek, setAbrvDaysOfWeek] = useState(ABV_WEEK);
   const [daysOfWeek, setDaysOfWeek] = useState(WEEK)
   const [days, setDays] = useState([]);

   // redux
   const calendarInformation = useSelector((state) => state.calendarInformation)
   const dateState = useSelector((state) => state.dateValue)
   const date = moment(dateState.date)
   const dateView = useSelector((state) => state.dateView.value)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(update(title));
   }, [dispatch, title]);



   useEffect(() => {
      setAbrvDaysOfWeek(ABV_WEEK)
      setDaysOfWeek(WEEK)
      if (dateView === "Month") {
         const startingDayOfWeek = date.startOf("month").format('d') - 1; // 0 for Monday, 6 for Sunday, etc.
         const daysInMonth = date.daysInMonth();
         let daysArray = []
         for (let i = 0; i < daysInMonth + startingDayOfWeek; i++) {
            if (i < startingDayOfWeek) {
               daysArray.push(null); // Placeholder for days before the 1st day of the month
            } else {
               daysArray.push(moment(`${date.year()}-${date.month() + 1}-${i - startingDayOfWeek + 1}`))
            }
         }

         setDays(daysArray);
      } else if (dateView === "Week") {
         // Logic for getting days of the current week
         const week = date.startOf('week');
         console.log(week)
         let daysArray = [];

         for (let i = 1; i < 8; i++) {
            // Add i days to the start of the week and get the day number
            daysArray.push(week.clone().add(i, 'day'));
         }

         setDays(daysArray);
      } else if (dateView === "Day") {
         setDays([moment(date)]);
         setAbrvDaysOfWeek([""])
         setDaysOfWeek([""])
      }
      // eslint-disable-next-line
   }, [dateState.date, dateView, events]);




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
