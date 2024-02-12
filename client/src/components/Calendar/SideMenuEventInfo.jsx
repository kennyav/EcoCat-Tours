import React from 'react'

// icon
import { SearchIcon } from '../Icons'

// component
import GuestInfo from './GuestInfo'

export default function EventInfo(props) {

  // takes in the event information and displays it in the column
  return (
    <div div className="flex flex-col w-[272px] h-[852px] font-['Kumbh Sans'] rounded-tl-[25px] bg-white" >
      <div className='flex flex-col pl-[26px] pt-[30px]'>
        <div className="text-stone-900 text-xl font-bold">Snorkel Cruise </div>
        <div className="text-stone-900 text-[10px] font-normal pb-[14px]">Thursday, November 30th, 2023 @ 1pm</div>
        <div className='flex bg-sky-50 rounded-[25px]'>
          <SearchIcon />
          <textarea
            rows={1}
            cols={20}
            className="left-[27px] top-[6px] items-center text-center text-stone-900 text-[10px] font-normal bg-sky-50 outline-none resize-none"
            placeholder='Search Here ...' />
        </div>
      </div>
      <GuestInfo />
      <GuestInfo />
    </div >
  )
}