import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// redux
import { useDispatch } from 'react-redux';
import { update } from '../reducers/loginSlice';

// date handler
import moment from 'moment'

function getDatesForPreviousWeek() {
  const dates = [];
  const today = moment();
  const previousWeek = moment().subtract(7, 'days');

  // Iterate through each day from today to a week ago
  for (let date = moment(today); date >= previousWeek; date.subtract(1, 'day')) {
    dates.push(date.format('YYYY-MM-DD')); // Format date using ISO 8601 standard
  }

  return dates.reverse(); // Reverse the array to have dates in ascending order
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
                </span>
              </span>
            ))
          }
        </div>
      </div>
    </div>
  )
}
