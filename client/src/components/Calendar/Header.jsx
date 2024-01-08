import React, { useState, useEffect, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

// icons
import { CalendarDownIcon } from '../Icons';
import { CalendarLeftIcon } from '../Icons';
import { CalendarRightIcon } from '../Icons';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function classNames(...classes) {
   return classes.filter(Boolean).join(' ')
}

export default function Header() {
   const [currentMonth, setCurrentMonth] = useState('');
   const [currentYear, setCurrentYear] = useState('');

   useEffect(() => {
      const today = new Date();
      const yearIndex = today.getFullYear()
      const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(today);

      setCurrentYear(`${yearIndex}`)
      setCurrentMonth(`${monthName}`);
   }, []);

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
   <div className='flex gap-4 w-full h-auto items-center justify-center py-[35px] font-KumbhSans text-[20px] font-extrabold leading-normal text-[#1E1E1E]'>
      <button className='flex items-center gap-6 bg-transparent hover:bg-[#0E5BB5] hover:border-transparent rounded-full'>
         <CalendarLeftIcon />
      </button>
      <Menu as="div" className="relative inline-block text-left">
         <div>
            <Menu.Button className="flex items-center gap-6 bg-transparent hover:bg-[#0E5BB5] hover:text-white py-2.5 px-8 border-2 border-[#0E5BB5] hover:border-transparent rounded-full">
               {currentMonth}
               <CalendarDownIcon />
            </Menu.Button>
         </div>

         <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
         >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
               <div className="py-1">
                  {
                     MONTH_NAMES.map(month => {
                        return (
                           <Menu.Item>
                              {({ active }) => (
                                 <span
                                    onClick={() => setCurrentMonth(month)}
                                    className={classNames(
                                       active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                       'block px-4 py-2 text-sm'
                                    )}
                                 >
                                    {month}
                                 </span>
                              )}
                           </Menu.Item>
                        )
                     })
                  }
               </div>
            </Menu.Items>
         </Transition>
      </Menu>
      <Menu as="div" className="relative inline-block text-left">
         <div>
            <Menu.Button className="flex items-center gap-6 bg-transparent hover:bg-[#0E5BB5] hover:text-white py-2.5 px-8 border-2 border-[#0E5BB5] hover:border-transparent rounded-full">
               {currentYear}
               <CalendarDownIcon />
            </Menu.Button>
         </div>

         <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
         >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
               <div className="py-1">
                  {
                     yearsList().map(year => {
                        return (<Menu.Item>
                           {({ active }) => (
                              <span
                                 onClick={() => setCurrentYear(year)}
                                 className={classNames(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block px-4 py-2 text-sm'
                                 )}
                              >
                                 {year}
                              </span>
                           )}
                        </Menu.Item>
                        )
                     })
                  }
               </div>
            </Menu.Items>
         </Transition>
      </Menu>
      <button className='flex items-center gap-6 bg-transparent hover:bg-[#0E5BB5] hover:border-transparent rounded-full'>
         <CalendarRightIcon />
      </button>
   </div>

)
                  }
