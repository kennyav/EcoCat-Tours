//import React from 'react'
import React, { useEffect, useState } from "react";


// icons
import { SearchIcon } from './Icons'
import { NotificationIcon } from './Icons'
import { SettingsIcon } from './Icons'
import { EmptyProfileIcon } from './Icons'


const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050' //need to add the process env later...



export default function Header(props) {

   const [searchQuery, setSearchQuery] = useState('');
   // Function to handle changes in the textarea
   const handleSearchInputChange = (e) => {
      e.preventDefault();
      fetch(`${API_URL}/booking-search?query=${searchQuery}`)
/*
      .then((res) => res.json())
      .then((data) => {
      
      })
      .catch((err) => {
        console.log(err);
      });
      setSearchQuery('');
*/   
   
      setSearchQuery(e.target.value);

   }


   return (
      <div className='flex flex-row justify-between w-full h-auto pl-[38px] pt-[48.5px]'>
         <h1 className='basis-1/2 font-KumbhSans text-[30px] font-extrabold leading-normal text-[#1E1E1E]'> {props.title} </h1>
         <div className='basis-1/2 flex flex-row items-center justify-between'>
            <div className='flex flex-row items-center bg-white rounded-full p-1 pl-3'>
               <SearchIcon />
               <textarea
                  rows="1"
                  cols="25"
                  onChange={handleSearchInputChange}
                  className='resize-none px-1 text-start cursor-pointer focus:outline-none border-none'
                  placeholder='Search here ...'>
                  </textarea>  
            </div>
            <div className='bg-white p-2 rounded-full'>
               <NotificationIcon />
            </div>
            <div className='bg-white p-2 rounded-full'>
               <SettingsIcon />
            </div>
            <div className='flex flex-row items-center gap-3 pr-[41px]'>
               <div className='font-KumbhSans text-[10px] leading-normal text-[#1E1E1E] flex flex-col'>
                  <p className='font-bold'>Body Copy Bold</p>
                  <p>Body Copy</p>
               </div>
               <EmptyProfileIcon />
            </div>
         </div>
      </div>
   )
}
