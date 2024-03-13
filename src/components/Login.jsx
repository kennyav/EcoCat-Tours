import React, { useState, useEffect } from 'react'

// function classNames(...classes) {
//    return classes.filter(Boolean).join(' ')
// }

export default function Login(props) {
   const [currentTime, setCurrentTime] = useState(0);

   useEffect(() => {
      fetch('/time').then(res => res.json()).then(data => {
         setCurrentTime(data.time);
      });
   }, []);


   // function handleClick() {
   //    fetch('/login', {
   //       redirect: 'follow'
   //    }).then((res) => { return res })
   // }

   return (
      <div className='relative w-screen h-screen bg-[#0E5BB5] flex flex-col justify-center items-center font-[KumbahSans]'>
         {/* <button
            onClick={handleClick}
            className={({ selected }) =>
               classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                     ? 'bg-white text-blue-700 shadow'
                     : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
               )}>
            Login
            <br /> */}
            <p>The Current Time is: {currentTime}</p>
         {/* </button> */}
      </div>
   )
}