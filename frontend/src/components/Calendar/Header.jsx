import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateDate } from '../../reducers/dateSlice';
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
   const date = useSelector((state) => state.dateValue)

   const [month, setMonth] = useState({
      name: "",
      index: -1
   })
   const [year, setYear] = useState({
      name: "",
      index: -1
   })

   useEffect(() => {
      dispatch(updateDate({
         year: date.year,
         monthName: month.name,
         monthIndex: MONTH_NAMES.indexOf(month.name)
      }))
      // eslint-disable-next-line
   }, [month, dispatch])

   useEffect(() => {
      dispatch(updateDate({
         year: parseInt(year.name),
         monthName: date.monthName,
         monthIndex: date.monthIndex
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

   const handlePreviousMonth = () => {
      const newMonthIndex = MONTH_NAMES.indexOf(date.monthName) - 1;
      if (newMonthIndex < 0) {
         dispatch(updateDate({
            year: date.year - 1,
            monthName: MONTH_NAMES[11],
            monthIndex: 11
         }))
      } else {
         dispatch(updateDate({
            year: date.year,
            monthName: MONTH_NAMES[newMonthIndex],
            monthIndex: date.monthIndex - 1
         }))
      }
   };

   const handleNextMonth = () => {
      const newMonthIndex = MONTH_NAMES.indexOf(date.monthName) + 1;
      if (newMonthIndex > 11) {
         dispatch(updateDate({
            year: date.year + 1,
            monthName: MONTH_NAMES[0],
            monthIndex: 0
         }))
      } else {
         dispatch(updateDate({
            year: date.year,
            monthName: MONTH_NAMES[newMonthIndex],
            monthIndex: date.monthIndex + 1
         }))
      }
   };

   return (
      <div className="font-KumbhSans">
         <div className='flex z-20 gap-4 w-full h-auto items-center justify-center py-[15px] text-[20px] font-extrabold leading-normal text-[#1E1E1E]'>
            <button onClick={handlePreviousMonth} className='flex p-3 bg-transparent hover:bg-[#0E5BB5] hover:border-transparent rounded-md'>
               <CalendarLeftIcon />
            </button>
            <DropDownMenu list={MONTH_NAMES} setCurrent={setMonth} current={date.monthName} />
            <DropDownMenu list={yearsList()} setCurrent={setYear} current={date.year} />
            <button onClick={handleNextMonth} className='flex p-3 bg-transparent hover:bg-[#0E5BB5] hover:border-transparent rounded-md'>
               <CalendarRightIcon />
            </button>

         </div>
         <div className="flex gap-4 items-center px-10">
            <BasicDropDown list={DATE_VIEW} />
         </div>
      </div>

   )
}
