import React, { useEffect, useState } from 'react'

// routing 
import { Route, Routes } from 'react-router-dom';
import httpClient from './httpClient';

// app
import App from './App';

// peripherals
import Menus from './components/Menus';

// pages
import Salesman from './components/Salesman'
import Events from './components/Events'
import Transactions from './components/Transactions'
import AddSalesMan from './components/SalesmanComponents/AddSalesMan'
import TransactionDetails from './components/TransactionComponents/TransactionDetails'
import EditEvent from './components/EventsComponents/EditEvent'
import Register from './components/Login/Register'
import Login from './components/Login/Login';
import AddEvent from './components/EventsComponents/AddEvent';
import NotFound from './components/NotFound';


export default function Router() {
   const [title, setTitle] = useState("Bookings");
   const [userAuthenticated, setUserAuthenticated] = useState(false);

   useEffect(() => {
      (async () => {
         try {
            const resp = await httpClient.get("http://127.0.0.1:8000/auth/@me");
            setUserAuthenticated(resp.data);
         } catch (error) {
            console.log("Not authenticated");
         }
      })();
   }, []);


   return (
      <Routes>
         <Route path='/register' element={<Register />} />
         <Route path='/login' element={<Login />} />
         <Route path='*' element={<NotFound />} />
         {userAuthenticated &&
            <>
               <Route path="/" element={<App title={title} setTitle={(title) => setTitle(title)} />} />
               <Route path="/salesman" element={<Menus title={title}> <Salesman setTitle={(title) => setTitle(title)} /> </Menus>} />
               <Route path="/add-newsalesman" element={<Menus title={title}><AddSalesMan setTitle={(title) => setTitle(title)} /> </Menus>} />
               <Route path="/events" element={<Menus title={title}> <Events setTitle={(title) => setTitle(title)} /> </Menus>} />
               <Route path="/transactions" element={<Menus title={title}> <Transactions setTitle={(title) => setTitle(title)} /> </Menus>} />
               <Route path='/transaction-details' element={<Menus title={title}> <TransactionDetails setTitle={(title) => setTitle(title)} /> </Menus>} />
               <Route path='/edit-events' element={<Menus title={title}> <EditEvent setTitle={(title) => setTitle(title)} /> </Menus>} />
               <Route path='/add-events' element={<Menus title={title}> <AddEvent setTitle={(title) => setTitle(title)} /> </Menus>} />
            </>
         }
      </Routes>
   )
}

