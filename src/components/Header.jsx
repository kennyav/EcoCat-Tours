import React from 'react'

// icons
import { SearchIcon } from './Icons'
import { NotificationIcon } from './Icons'
import { SettingsIcon } from './Icons'

// components
import UserMenu from './Header/UserMenu'
// joseph
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { DeleteActiveIcon, DeleteInactiveIcon } from './Header/UserMenu'

export default function Header(props) {

   // const logoutUser = async () => {
   //    await httpClient.post("//127.0.0.1:8000/auth/logout");
   //    window.location.href = "/login";
   //  };


   return (
      <div className='flex flex-row justify-between w-full h-auto pl-[38px] pt-[48.5px]'>
         <h1 className='basis-1/2 font-KumbhSans text-[30px] font-extrabold leading-normal text-[#1E1E1E]'> {props.title} </h1>
         <div className='basis-1/2 flex flex-row items-center justify-between'>
            {/* <div className='flex flex-row items-center bg-white rounded-full p-1 pl-3'>
               <SearchIcon />
               <textarea
                  rows="1"
                  cols="25"
                  className='resize-none px-1 text-start cursor-pointer focus:outline-none border-none'
                  placeholder='Search here ...'></textarea>
            </div> */}
            {/* <div className='bg-white p-2 rounded-full'>
               <NotificationIcon />
            </div> */}
            <Menu as="div" className="relative inline-block text-left">
               <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                  <div className='bg-white p-2 rounded-full'>
                     <SettingsIcon />
                  </div>
               </Menu.Button>
               <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
               >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                     {/* Add your menu items here */}
                     <Menu.Item>
                     {({ active }) => (
                        <button
                              className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                 } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                              {active ? (
                                 <DeleteActiveIcon
                                    className="mr-2 h-5 w-5 text-blue-400"
                                    aria-hidden="true"
                                 />
                              ) : (
                                 <DeleteInactiveIcon
                                    className="mr-2 h-5 w-5 text-blue-400"
                                    aria-hidden="true"
                                 />
                              )}
                              {/* Replace "Logout" with your own text or component */}
                              Example
                        </button>
                     )}
                     </Menu.Item>
                  </Menu.Items>
               </Transition>
            </Menu>
            <div className='flex flex-row items-center gap-3 pr-[41px] z-10'>
               {/* <div className='font-KumbhSans text-[10px] leading-normal text-[#1E1E1E] flex flex-col'>
                  <p className='font-bold'>Body Copy Bold</p>
                  <p>Body Copy</p>
               </div> */}

               <UserMenu />
            </div>
         </div>
      </div>
   )
}
