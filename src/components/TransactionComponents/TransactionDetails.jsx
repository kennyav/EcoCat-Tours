import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import httpClient from '../../httpClient'

// components
import SingleTransaction from './SingleTransaction';


export default function TransactionDetails() {
   const navigate = useNavigate([]);
   const [history, setHistory] = useState()

   function handleClick() {
      // Redirect to /transactions URL
      navigate('/transactions');
   }

   const location = useLocation();
   const { date } = location.state;

   useEffect(() => {

      (async () => {
         try {
            const resp = await httpClient.get(`http://127.0.0.1:8000/transactions/get-transactions/${date}`)
            setHistory(resp.data)
            console.log(resp.data)
         } catch (error) {
            console.log("Error", error)
         }
      })();
   }, [])

   return (
      <div className='px-[41px]'>
         <div className='flex flex-col w-full h-full rounded-[25px] bg-white'>
            <div className='flex justify-between w-full h-auto font-KumbhSans text-[14px] px-[20px] py-[36px]'>
               <p className='font-bold'>{date}</p>
               <button className='w-[86px] bg-[#0E5BB5] hover:shadow-lg rounded-full text-white px-[15px] py-[10px] text-[10px] text-center' onClick={handleClick}>Exit</button>
            </div>
            <div className='w-full h-auto overflow-scroll'>
               {history &&
                  history.map(data => {
                     return (
                        <SingleTransaction history={data} />
                     )
                  })
               }

               {/* {
                  transactions.map((transaction) => {
                     return (
                        <span key={transaction.date} className="flex justify-between border-b-2 font-KumbhSans px-[20px] py-[25px]">
                           <p className='font-bold text-[20px]'>{transaction.date}</p>
                           <span className='flex flex-row gap-4 items-center'>
                              <button className="w-[86px] bg-[#0E5BB5] hover:shadow-lg rounded-full text-white px-[15px] py-[10px] text-[10px] text-center">View</button>
                              <TransactionOptionsIcon />
                           </span>
                        </span>
                     )
                  })
               } */}
            </div>
         </div>
      </div>
   )
}