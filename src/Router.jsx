import React, { useState } from 'react'

// routing 
import { Route, Routes } from 'react-router-dom';

// app
import App from './App';

// pages
import NavBar from './components/NavBar';
import Header from './components/Header';
import Salesman from './components/Salesman'
import Events from './components/Events'
import Transactions from './components/Transactions'
import AddSalesMan from './components/SalesmanComponents/AddSalesMan'
import TransactionDetails from './components/TransactionComponents/TransactionDetails'
import EditEvent from './components/EventsComponents/EditEvent'
import Login from './components/Login'


export default function Router() {
   const [title, setTitle] = useState("Bookings")
   return (
      <div className='flex flex-row w-full h-screen'>
         <NavBar />
         <div className='flex flex-col w-full h-screen bg-[#F2F8FC]'></div>
         <Header title={title} />
         <div className='w-full h-screen  py-[20px] overflow-scroll'></div>
         <Routes>
            <Route path="/" element={<App setTitle={(title) => setTitle(title)} />} />
            <Route path="/salesman" element={<Salesman setTitle={(title) => setTitle(title)} />} />
            <Route path="/add-newsalesman" element={<AddSalesMan setTitle={(title) => setTitle(title)} />} />
            <Route path="/events" element={<Events setTitle={(title) => setTitle(title)} />} />
            <Route path="/transactions" element={<Transactions setTitle={(title) => setTitle(title)} />} />
            <Route path='/transaction-details' element={<TransactionDetails setTitle={(title) => setTitle(title)} />} />
            <Route path='/edit-events' element={<EditEvent setTitle={(title) => setTitle(title)} />} />
            <Route path='/login' element={<Login />} />
         </Routes>
      </div>
   )
}
