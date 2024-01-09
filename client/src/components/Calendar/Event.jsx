import React from 'react'

export default function Event(props) {
   // times, title, openings
   return (
      <div className='flex flex-col text-[10px] font-KumbhSans rounded-[10px] bg-[#C4D2DC] p-[11px] gap-2'>
         <p className='font-semibold'>
            {props.time}
            {" "}
            {props.title}
         </p>
         <p>{props.openings}</p>
      </div>
   )
}
