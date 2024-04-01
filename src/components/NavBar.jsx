import React from 'react'
import { Link } from "react-router-dom";

// Icon Imports 
import { CalendarIconLight } from './Icons';
import { CalendarIconDark } from './Icons';
import { BookingsIconLight } from './Icons';
import { BookingsIconDark } from './Icons';
import { SalesManIconLight } from './Icons';
import { SalesManIconDark } from './Icons';
import { TransactionIconLight } from './Icons';
import { TransactionIconDark } from './Icons';

const menuOptions = [
  {
    url: '/',
    name: 'Bookings',
    lightIcon: <BookingsIconLight />,
    darkIcon: <BookingsIconDark />
  }, {
    url: '/salesman',
    name: 'Salesman',
    lightIcon: <SalesManIconLight />,
    darkIcon: <SalesManIconDark />
  }, {
    url: '/events',
    name: 'Events',
    lightIcon: <CalendarIconLight />,
    darkIcon: <CalendarIconDark />
  },
  {
    url: '/transactions',
    name: 'Transactions',
    lightIcon: <TransactionIconLight />,
    darkIcon: <TransactionIconDark />
  }];

export default function NavBar() {

  return (
    <div className='flex flex-col font-KumbhSans w-[272px] h-screen bg-[#0E5BB5]'>
      <div className='flex justify-center pt-[43.81px]'>
        <img className='w-[148.934px] h-[63.645px]' src='/EcoCat-Logo.png' alt='EcoTours Reservations' />
      </div>
      <nav className='pt-[25.5px]'>
        {
          menuOptions.map((option) => {
            return (
              <Link key={option.name} to={option.url}>
                <div
                  key={option.name}
                  className={`flex flex-row rounded-l-full p-[10px] my-[10px] items-center text-[14px] font-medium text-[#F2F8FC] leading-normal 
                hover:bg-[#F2F8FC] hover:text-[#0E5BB5] cursor-pointer group`}
                >
                  <div className='flex flex-row text-center items-center'>
                    <span className="group-hover:hidden px-[20px]">{option.darkIcon}</span>
                    <span className="hidden group-hover:inline px-[20px]">{option.lightIcon}</span>
                    {option.name}
                  </div>
                </div>
              </Link>
            );
          })
        }
      </nav>
    </div >
  )
}
