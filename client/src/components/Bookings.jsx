import React, { useEffect, useState } from 'react'

// calendar components
import Header from './Calendar/Header';
import Dates from './Calendar/Dates';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function Bookings({ setTitle }) {

  // depending on the current week we are in, we will pull data that
  // represents the events for the booking

  const [currentMonth, setCurrentMonth] = useState('');
  const [currentYear, setCurrentYear] = useState('');
  const [daysOfMonth, setDaysOfMonth] = useState([])

  useEffect(() => {
    setTitle("Bookings");
  }, [setTitle]);

  useEffect(() => {
    const today = new Date();
    const yearIndex = today.getFullYear()
    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(today);

    setCurrentYear(`${yearIndex}`)
    setCurrentMonth(`${monthName}`);
  }, []);

  useEffect(() => {
    const year = currentYear;
    const month = MONTH_NAMES.indexOf(currentMonth);

    const firstDayOfMonth = new Date(year, month, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = Array.from({ length: daysInMonth + startingDayOfWeek }, (_, i) => {
      if (i < startingDayOfWeek) {
        return null; // Placeholder for days before the 1st day of the month
      }
      return i - startingDayOfWeek + 1; // Adjusted day of the month
    });

    setDaysOfMonth(daysArray);

  }, [currentMonth, currentYear]);

  return (
    <div className='flex flex-col w-full h-full rounded-[25px] bg-white'>
      <Header
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        currentYear={currentYear}
        setCurrentYear={setCurrentYear}
      />
      <Dates
        dates={daysOfMonth}
      />
    </div>
  )
}

