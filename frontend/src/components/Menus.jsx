import React from 'react'
import { useSelector } from 'react-redux'
import { selectTitle } from '../reducers/loginSlice'

// import components
import NavBar from './NavBar'
import Header from './Header'

export default function Menus({ children }) {
   const title = useSelector(selectTitle)
   return (
      <div className='flex flex-row w-full h-screen'>
         <NavBar />
         <div className='flex flex-col w-full h-screen bg-[#F2F8FC] overflow-y-scroll overflow-x-hidden'>
            <Header title={title} />
            <div className='py-[20px]'>
               {children}
            </div>
         </div>
      </div>
   )
}
