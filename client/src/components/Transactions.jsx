import React, { useEffect } from 'react'
// icon
import { TransactionOptionsIcon } from './Icons'

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const transactions = [
  {
    date: randomDate(new Date(2024, 0, 1), new Date()).toString(),
    url: '/something'
  },
  {
    date: randomDate(new Date(2024, 0, 1), new Date()).toString(),
    url: '/something'
  },
  {
    date: randomDate(new Date(2024, 0, 1), new Date()).toString(),
    url: '/something'
  },
  {
    date: randomDate(new Date(2024, 0, 1), new Date()).toString(),
    url: '/something'
  },
  {
    date: randomDate(new Date(2024, 0, 1), new Date()).toString(),
    url: '/something'
  },
  {
    date: randomDate(new Date(2024, 0, 1), new Date()).toString(),
    url: '/something'
  },
  {
    date: randomDate(new Date(2024, 0, 1), new Date()).toString(),
    url: '/something'
  },
  {
    date: randomDate(new Date(2024, 0, 1), new Date()).toString(),
    url: '/something'
  },
  {
    date: randomDate(new Date(2024, 0, 1), new Date()).toString(),
    url: '/something'
  },
  {
    date: randomDate(new Date(2024, 0, 1), new Date()).toString(),
    url: '/something'
  },
  {
    date: randomDate(new Date(2024, 0, 1), new Date()).toString(),
    url: '/something'
  }
]

export default function Transactions({ setTitle }) {

  useEffect(() => {
    setTitle("Transactions");
  }, [setTitle]);

  return (
    <div className='px-[41px]'>
      <div className='flex flex-col w-full h-full rounded-[25px] bg-white'>
        <p className='font-KumbhSans text-[14px] font-bold pl-[20px] pt-[36px]'>Date</p>
        <div className='w-full h-auto overflow-scroll'>
          {
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
          }
        </div>
      </div>
    </div>
  )
}