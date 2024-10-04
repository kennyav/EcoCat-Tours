// SalesmanTransactionsPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom'; // Make sure you're using a routing library
import httpClient from  '../../httpClient';
import { useSelector } from 'react-redux';

import SingleTransaction from '../TransactionComponents/SingleTransaction';

export default function SalesmanTransactionsPage() {
   const url = useSelector((state) => state.development.value)
   const location = useLocation();
   const { salesmanId } = useParams(); // Get the salesman ID from the URL
   const [transactions, setTransactions] = useState([]);
   const [history, setHistory] = useState([]);
   const salesmanName = location.state?.salesmanName;

   useEffect(() => {
      const fetchTransactions = async () => {
        try {
          // Fetch transactions for the salesman
          const resp = await httpClient.get(`${url}/salesmen/transactions/${salesmanId}`);
          setTransactions(resp.data);
          console.log(resp.data);
  
          // Fetch passenger details for each transaction
          const passengerRequests = resp.data.map(async (transaction) => {
            const passengerResp = await httpClient.get(`${url}/bookings/get_passenger/${transaction.passenger_id}`);
            return passengerResp.data; // Return the passenger data
          });
  
          // Wait for all passenger requests to resolve
          const passengerHistory = await Promise.all(passengerRequests);
          setHistory(passengerHistory.reverse()); // Update the history state with all passenger details
        } catch (e) {
          console.error("Error fetching transactions:", e);
        }
      };
  
      fetchTransactions();
    }, [salesmanId]);

   return (
      <div className='px-[41px]'>
         <div className='flex flex-col w-full h-full rounded-[25px] bg-white'>
            <div className='flex justify-between w-full h-auto font-KumbhSans text-[14px] px-[20px] py-[36px]'>
               <p className='font-bold'>{salesmanName}</p>
            </div>
            <div className='w-full h-auto overflow-scroll'>
               {history &&
                  history.map(data => {
                     return (
                        <div key={data.id}>
                           <SingleTransaction history={data} />
                        </div>
                     )
                  })
               }
            </div>
         </div>
      </div>
   );
}
