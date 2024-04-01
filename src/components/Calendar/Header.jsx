import React from 'react'

// icons
import { CalendarLeftIcon } from '../Icons';
import { CalendarRightIcon } from '../Icons';

// components
import DropDownMenu from './DropDownMenu'

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function Header(props) {
   const yearsList = () => {
      const today = new Date();
      const yearIndex = +today.getFullYear()
      let list = []
      for (let i = 0; i < 5; i++) {
         list.push(yearIndex - i)
      }
      return list
   }

   const handlePreviousMonth = () => {
      const newMonthIndex = MONTH_NAMES.indexOf(props.currentMonth.name) - 1;
      if (newMonthIndex < 0) {
         props.setCurrentMonth({
            name:  MONTH_NAMES[11],
            index: props.currentMonth.index - 1
         }); // December of the previous year
         props.setCurrentYear(props.currentYear - 1);
      } else {
         props.setCurrentMonth({
            name: MONTH_NAMES[newMonthIndex],
            index: props.currentMonth.index - 1
         });
      }
   };

   const handleNextMonth = () => {
      const newMonthIndex = MONTH_NAMES.indexOf(props.currentMonth.name) + 1;
      if (newMonthIndex > 11) {
         props.setCurrentMonth({
            name:  MONTH_NAMES[0],
            index: props.currentMonth.index + 1
         })
         props.setCurrentYear(props.currentYear + 1);
      } else {
         props.setCurrentMonth({
            name: MONTH_NAMES[newMonthIndex],
            index: props.currentMonth.index + 1
         });
      }
   };

   return (
      <div className='flex gap-4 w-full h-auto items-center justify-center py-[15px] font-KumbhSans text-[20px] font-extrabold leading-normal text-[#1E1E1E]'>
         <button onClick={handlePreviousMonth} className='flex p-3 bg-transparent hover:bg-[#0E5BB5] hover:border-transparent rounded-md'>
            <CalendarLeftIcon />
         </button>
         <DropDownMenu list={MONTH_NAMES} setCurrent={props.setCurrentMonth} current={props.currentMonth.name} />
         <DropDownMenu list={yearsList()} setCurrent={props.setCurrentYear} current={props.currentYear} />
         <button onClick={handleNextMonth} className='flex p-3 bg-transparent hover:bg-[#0E5BB5] hover:border-transparent rounded-md'>
            <CalendarRightIcon />
         </button>
      </div>

   )
}
