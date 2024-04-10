import React, { useEffect, useState } from 'react'

// routing 
import { Route, Routes } from 'react-router-dom';
import httpClient from './httpClient';
import { useSelector } from 'react-redux';

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
   const [userAuthenticated, setUserAuthenticated] = useState(false);
   const url = useSelector((state) => state.development.value)

   useEffect(() => {
      (async () => {
         try {
            const resp = await httpClient.get(`${url}/auth/@me`);
            setUserAuthenticated(resp.data);
         } catch (error) {
            console.log("Not authenticated");
         }
      })();
   }, [url]);


   return (
      <Routes>
         <Route path='/register' element={<Register />} />
         <Route path='/login' element={<Login />} />
         <Route path='*' element={<NotFound authenticated={userAuthenticated}/>} />
         {userAuthenticated &&
            <>
               <Route path="/" element={<Menus><App /></Menus>}/>
               <Route path="/salesman" element={<Menus> <Salesman /> </Menus>} />
               <Route path="/add-newsalesman" element={<Menus><AddSalesMan /> </Menus>} />
               <Route path="/events" element={<Menus> <Events /> </Menus>} />
               <Route path="/transactions" element={<Menus> <Transactions /> </Menus>} />
               <Route path='/transaction-details' element={<Menus> <TransactionDetails /> </Menus>} />
               <Route path='/edit-events' element={<Menus> <EditEvent /> </Menus>} />
               <Route path='/add-events' element={<Menus> <AddEvent /> </Menus>} />
               <Route path="*" element={<NotFound authenticated={userAuthenticated} />} />
            </>
         }
      </Routes>
   )
}

