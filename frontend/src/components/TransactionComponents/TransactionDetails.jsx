import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import httpClient from '../../httpClient'
import { useSelector } from 'react-redux';
// components
import SingleTransaction from './SingleTransaction';
// date handling 
import moment from 'moment';


export default function TransactionDetails() {
   const url = useSelector((state) => state.development.value)
   const navigate = useNavigate([]);
   const [history, setHistory] = useState()

   function handleClick() {
      // Redirect to /transactions URL
      navigate('/transactions');
   }

   const location = useLocation();
   const { date } = location.state;
   const tDate = moment(date, 'MMMM DD, YYYY').format('MM/DD/YYYY')


   useEffect(() => {

      (async () => {
         try {
            const resp = await httpClient.get(`${url}/transactions/get-transactions/${tDate}`)
            setHistory(resp.data)
         } catch (error) {
            console.log("Error", error)
         }
      })();
   }, [url, date])

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
                        <div key={data.id}>
                           <SingleTransaction history={data} />
                        </div>
                     )
                  })
               }
            </div>
         </div>
      </div>
   )
}