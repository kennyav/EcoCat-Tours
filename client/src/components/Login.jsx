import React from 'react'
import { Tab } from '@headlessui/react'

function classNames(...classes) {
   return classes.filter(Boolean).join(' ')
}

export default function Login(props) {
   const containerCSS = 'rounded-xl bg-white p-3 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2';

   return (
      <div className='relative w-screen h-screen bg-[#0E5BB5] flex flex-col justify-center items-center font-[KumbahSans]'>
         <div className='relative flex justify-center items-center bg-black rounded-md p-3'>
            <img className='w-[400px] h-auto' src='/EcoCat-Logo.png' alt='loginblob' />
         </div>
         <div className="relative font-KumbhSans w-full max-w-md px-2 py-16 sm:px-0">
            <Tab.Group>
               <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                  <Tab className={({ selected }) =>
                     classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                        'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                        selected
                           ? 'bg-white text-blue-700 shadow'
                           : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                     )
                  }>
                     Login
                  </Tab>
                  <Tab className={({ selected }) =>
                     classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                        'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                        selected
                           ? 'bg-white text-blue-700 shadow'
                           : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                     )
                  }>
                     Create New Account
                  </Tab>
               </Tab.List>
               <Tab.Panels className="mt-2">
                  <Tab.Panel className={`${containerCSS}`} >
                        <a
                           href='/login'
                           className='w-full text-center rounded-lg py-2.5 text-sm font-medium leading-5 ring-gray/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 hover:bg-gray-200 hover:text-blue-700 hover:shadow
                              text-black hover:bg-white/[0.12]'
                           type='submit'>Login</a>
                  </Tab.Panel>
                  <Tab.Panel className={`${containerCSS}`} >
                        <a
                           href='/login'
                           className='w-full text-center rounded-lg py-2.5 text-sm font-medium leading-5 ring-gray/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 hover:bg-gray-100 hover:text-blue-700 hover:shadow
                              text-black hover:bg-white/[0.12]'
                           type='submit'>Register</a>
                  </Tab.Panel>
               </Tab.Panels>
            </Tab.Group>
         </div>
      </div>
   )
}