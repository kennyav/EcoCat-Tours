import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateDate } from '../../reducers/dateSlice';
import moment from 'moment';

// icons
import { CalendarLeftIcon } from '../Icons';
import { CalendarRightIcon } from '../Icons';

// components
import DropDownMenu from './DropDownMenu'
import BasicDropDown from '../Header/BasicDropDown'

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DATE_VIEW = ['Month', 'Week', 'Day']

export default function Header() {
   const dispatch = useDispatch()
   const dateState = useSelector((state) => state.dateValue)
   const date = moment(dateState.date)
   const dateView = useSelector((state) => state.dateView.value)

   const [month, setMonth] = useState({
      name: date.format('MMMM'),
      index: date.month()
   })
   const [year, setYear] = useState({
      name: date.year(),
      index: -1
   })

   useEffect(() => {
      const newDay = moment(`${date.year()}-${month.name}-${date.date()}`);
      const serializedDay = newDay.format('YYYY-MMMM-DD');
      dispatch(updateDate({
          date: serializedDay
      }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);

   // whenever we change the year we go back to the first of the month for day
   useEffect(() => {
      const newDay = moment(`${parseInt(year.name)}-${date.month()+1}-${date.date()}`)
      const serializedDay = newDay.format('YYYY-MM-DD');
      dispatch(updateDate({
         date: serializedDay
      }))
      // eslint-disable-next-line
   }, [year])

   const yearsList = () => {
      const today = new Date();
      const yearIndex = +today.getFullYear()
      let list = []
      for (let i = -2; i < 4; i++) {
         list.push(yearIndex - i)
      }
      return list
   }

   const handlePrevious = () => {
      const newMonthIndex = date.month() - 1;

      if (dateView === "Month") {
         if (newMonthIndex < 0) {
            dispatch(updateDate({
               date: moment(`${date.year() - 1}-12-1`).format('YYYY-MM-DD'),
            }))
         } else {
            dispatch(updateDate({
               date: moment(`${date.year()}-${date.month()}-${date.date()}`).format('YYYY-MM-DD'),
            }))
         }
      } else if (dateView === "Week") {
         const newDate = date.clone().add(-7, 'day')
         const serializedDay = newDate.format('YYYY-MM-DD');
         dispatch(updateDate({
            date: serializedDay,
         }))

      } else if (dateView === "Day") {
         const newDate = date.clone().add(-1, 'day')
         const serializedDay = newDate.format('YYYY-MM-DD');
         dispatch(updateDate({
            date: serializedDay,
         }))
      }
   };

   const handleNext = () => {
      const newMonthIndex = date.month() + 1;

      if (dateView === "Month") {
         if (newMonthIndex > 11) {
            dispatch(updateDate({
               date: moment(`${date.year() + 1}-1-${date.date()}`).format('YYYY-MM-DD'),
            }))
         } else {
            dispatch(updateDate({
               date: moment(`${date.year()}-${date.month() + 2}-${date.date()}`).format('YYYY-MM-DD'),
            }))
         }
      } else if (dateView === "Week") {

         const newDate = date.clone().add(7, 'day')
         const serializedDay = newDate.format('YYYY-MM-DD');
         dispatch(updateDate({
            date: serializedDay,
         }))

      } else if (dateView === "Day") {
         const newDate = date.clone().add(1, 'day')
         const serializedDay = newDate.format('YYYY-MM-DD');
         dispatch(updateDate({
            date: serializedDay,
         }))
      }
   };

   return (
      <div className="font-KumbhSans">
         <div className='flex z-20 gap-4 w-full h-auto items-center justify-center py-[15px] text-[20px] font-extrabold leading-normal text-[#1E1E1E]'>
            <button onClick={handlePrevious} className='flex p-3 bg-transparent hover:bg-[#0E5BB5] hover:border-transparent rounded-md'>
               <CalendarLeftIcon />
            </button>
            <DropDownMenu list={MONTH_NAMES} setCurrent={setMonth} current={date.format('MMMM')} />
            <DropDownMenu list={yearsList()} setCurrent={setYear} current={date.year()} />
            <button onClick={handleNext} className='flex p-3 bg-transparent hover:bg-[#0E5BB5] hover:border-transparent rounded-md'>
               <CalendarRightIcon />
            </button>

         </div>
         <div className="flex gap-4 items-center px-10">
            <BasicDropDown list={DATE_VIEW} />
         </div>
      </div>

   )
}
