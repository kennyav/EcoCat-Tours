import React, { useEffect } from 'react'

// calendar components
import Header from './Calendar/Header';
import Dates from './Calendar/Dates';

// const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


export default function Bookings({ setTitle }) {

  useEffect(() => {
    setTitle("Bookings");
  }, [setTitle]);

  return (
    <div className='flex flex-col w-full h-full rounded-[25px] bg-white'>
      <Header />
      <Dates />
    </div>
  )
}

