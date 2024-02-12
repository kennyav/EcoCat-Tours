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

   return (
      <div className='flex gap-4 w-full h-auto items-center justify-center py-[15px] font-KumbhSans text-[20px] font-extrabold leading-normal text-[#1E1E1E]'>
         <button className='flex items-center gap-6 bg-transparent hover:bg-[#0E5BB5] hover:border-transparent rounded-full'>
            <CalendarLeftIcon />
         </button>
         <DropDownMenu list={MONTH_NAMES} setCurrent={props.setCurrentMonth} current={props.currentMonth}/>
         <DropDownMenu list={yearsList()} setCurrent={props.setCurrentYear} current={props.currentYear} />
         <button className='flex items-center gap-6 bg-transparent hover:bg-[#0E5BB5] hover:border-transparent rounded-full'>
            <CalendarRightIcon />
         </button>
      </div>

   )
}
