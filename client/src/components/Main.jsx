import React, { useState } from 'react'

// components import
import NavBar from './NavBar'
import Header from './Header'
// pages
import Bookings from './Bookings'
import Salesman from './Salesman'
import Events from './Events'
import Transactions from './Transactions'
import AddSalesMan from './SalesmanComponents/AddSalesMan'

// routing 
import { Route, Routes } from 'react-router-dom';

export default function Main() {

   const [title, setTitle] = useState("Bookings")

   return (
      <div className='flex flex-row w-full h-screen'>
         <NavBar />
         <div className='flex flex-col w-full h-screen bg-[#F2F8FC]'>
            <Header title={title}/>
            <div className='w-full h-screen  py-[20px] overflow-scroll'>
               <Routes>
                  <Route path="/" element={<Bookings setTitle={(title) => setTitle(title)}/>} />
                  <Route path="/salesman" element={<Salesman setTitle={(title) => setTitle(title)}/>} />
                  <Route path="/add-newsalesman" element={<AddSalesMan setTitle={(title) => setTitle(title)}/>} />
                  <Route path="/events" element={<Events setTitle={(title) => setTitle(title)}/>} />
                  <Route path="/transactions" element={<Transactions setTitle={(title) => setTitle(title)}/>} />
               </Routes>
            </div>
         </div>
      </div>
   )
}
