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

   // css state
   const [isHidden, setIsHidden] = useState(false);

   // redux
   const calendarInformation = useSelector((state) => state.calendarInformation)
   const openedFull = useSelector((state) => state.sideMenu.value)
   const dateState = useSelector((state) => state.dateValue)
   const date = moment(dateState.date)
   const dateView = useSelector((state) => state.dateView.value)
   const refresh = useSelector((state) => state.refresh.value)
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
   }, [dateState.date, dateView, events, refresh]);

   // useEffect for setting hidden after the animation
   useEffect(() => {
      if (openedFull) {
         // If openedFull is true, set a timeout to hide the component after animation duration
         const timeout = setTimeout(() => {
            setIsHidden(true);
         }, 500); // Assuming the duration is 500 milliseconds

         // Clear timeout on component unmount or if openedFull becomes false before the timeout completes
         return () => clearTimeout(timeout);
      } else {
         // If not openedFull, make sure the component is not hidden
         setIsHidden(false);
      }
   }, [openedFull]); // Re-run this effect when openedFull changes




   return (
         <div className={`w-full h-auto`}>
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
