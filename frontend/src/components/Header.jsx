import React from 'react'

// components
import UserMenu from './Header/UserMenu'

export default function Header(props) {
   return (
      <div className='flex flex-row justify-between w-full h-auto pl-[38px] pt-[48.5px]'>
         <h1 className='basis-1/2 font-KumbhSans text-[30px] font-extrabold leading-normal text-[#1E1E1E]'> {props.title} </h1>
         <div className='flex flex-row items-center gap-3 pr-[41px] z-10'>
            <UserMenu />
         </div>
      </div>
   )
}
