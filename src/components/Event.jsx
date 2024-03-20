import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Event(props) {

   const navigate = useNavigate();

   const handleClick = (title, info) => {
      navigate('/edit-events',  { state: { title: title, info: info, event: props.event } });
   }

   // props.title, props.info, props.days, props.time
   return (
      <div className='flex flex-col w-full h-auto rounded-lg bg-white font-KumbhSans'>

         <div className='flex flex-row items-center justify-between px-[30px] pt-[30px]'>
            <div>
               <h1 className='text-[20px] font-bold'>{props.title}</h1>
               <p className='text-[10px]'>{props.info}</p>
            </div>
            <button 
               onClick={() => handleClick(props.title, props.info)}
               className='bg-transparent hover:bg-[#0E5BB5] hover:text-white py-2.5 px-8 border border-[#0E5BB5] hover:border-transparent rounded-full text-[10px]'>Edit</button>
         </div>

         <div className='px-[30px] py-[30px]'>
            <h1 className='text-[14px] font-bold'>Availability</h1>
            <p className='text-[10px]'>Days: {props.days}</p>
            <p className='text-[10px]'>Times: {props.times}</p>
         </div>
      </div>
   )
}
