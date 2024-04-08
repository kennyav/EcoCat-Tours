import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { update } from '../reducers/loginSlice';

// icon
import { TransactionOptionsIcon } from './Icons';

function getDatesForPreviousWeek() {
  const dates = [];
  const today = new Date();
  const previousWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // Subtract 7 days from today's date

  // Iterate through each day from today to a week ago
  for (let date = new Date(today); date >= previousWeek; date.setDate(date.getDate() - 1)) {
    dates.push(new Date(date).toLocaleDateString()); // Convert Date object to string
  }

  return dates; // Reverse the array to have dates in ascending order
}

export default function Transactions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (date) => {
    navigate('/transaction-details', { state: { date } });
  }

  const transactions = getDatesForPreviousWeek();

  useEffect(() => {
    dispatch(update("Transactions"))
  }, [dispatch]);

  return (
    <div className='px-[41px]'>
      <div className='flex flex-col w-full h-full rounded-[25px] bg-white'>
        <p className='font-KumbhSans text-[14px] font-bold pl-[20px] pt-[36px]'>Date</p>
        <div className='w-full h-auto overflow-scroll'>
          {
            transactions.map((transaction, index) => (
              <span key={index} className="flex justify-between border-b-2 font-KumbhSans px-[20px] py-[25px]">
                <p className='font-bold text-[20px]'>{transaction}</p>
                <span className='flex flex-row gap-4 items-center'>
                  <button
                    className="w-[86px] bg-[#0E5BB5] hover:shadow-lg rounded-full text-white px-[15px] py-[10px] text-[10px] text-center"
                    onClick={() => handleClick(transaction)}>View</button>
                  {/* <TransactionOptionsIcon /> */}
                </span>
              </span>
            ))
          }
        </div>
      </div>
    </div>
  )
}
