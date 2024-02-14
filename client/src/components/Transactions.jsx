import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

// icon
import { TransactionOptionsIcon } from './Icons'

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const transactions = [
  {
    date: randomDate(new Date(2024, 0, 1), new Date()).toString(),
    history: [{
      name: 'James Brown',
      price: 159.98,
      eventName: "Snorkle Cruise",
      eventDate: "11/24/2023",
      recipient: "EcoCat"
    },
    {
      name: 'Phoebe Brown',
      price: 19.98,
      eventName: "Snorkle Cruise",
      eventDate: "11/24/2023",
      recipient: "EcoCat"
    },{
      name: 'James Brown',
      price: 159.98,
      eventName: "Snorkle Cruise",
      eventDate: "11/24/2023",
      recipient: "EcoCat"
    },{
      name: 'James Brown',
      price: 159.98,
      eventName: "Snorkle Cruise",
      eventDate: "11/24/2023",
      recipient: "EcoCat"
    },{
      name: 'James Brown',
      price: 159.98,
      eventName: "Snorkle Cruise",
      eventDate: "11/24/2023",
      recipient: "EcoCat"
    },{
      name: 'James Brown',
      price: 159.98,
      eventName: "Snorkle Cruise",
      eventDate: "11/24/2023",
      recipient: "EcoCat"
    },{
      name: 'James Brown',
      price: 159.98,
      eventName: "Snorkle Cruise",
      eventDate: "11/24/2023",
      recipient: "EcoCat"
    },{
      name: 'James Brown',
      price: 159.98,
      eventName: "Snorkle Cruise",
      eventDate: "11/24/2023",
      recipient: "EcoCat"
    }],
    url: '/something'
  },
  {
    date: randomDate(new Date(2024, 0, 1), new Date()).toString(),
    history: [{
      name: 'Nicole Brown',
      price: 159.98,
      eventName: "Snorkle Cruise",
      eventDate: "11/24/2023",
      recipient: "EcoCat"
    }],
    url: '/something'
  },
  {
    date: randomDate(new Date(2024, 0, 1), new Date()).toString(),
    history: [{
      name: 'Aira Brown',
      price: 159.98,
      eventName: "Snorkle Cruise",
      eventDate: "11/24/2023",
      recipient: "EcoCat"
    }],
    url: '/something'
  },
  {
    date: randomDate(new Date(2024, 0, 1), new Date()).toString(),
    history: [{
      name: 'Kenny Brown',
      price: -159.98,
      eventName: "Snorkle Cruise",
      eventDate: "11/24/2023",
      recipient: "EcoCat"
    }],
    url: '/something'
  },
  {
    date: randomDate(new Date(2024, 0, 1), new Date()).toString(),
    history: [{
      name: 'Howard Brown',
      price: -59.98,
      eventName: "Snorkle Cruise",
      eventDate: "11/24/2023",
      recipient: "EcoCat"
    }],
    url: '/something'
  },
  {
    date: randomDate(new Date(2024, 0, 1), new Date()).toString(),
    history: [{
      name: 'Jane Brown',
      price: 5.98,
      eventName: "Snorkle Cruise",
      eventDate: "11/24/2023",
      recipient: "EcoCat"
    }],
    url: '/something'
  },
  {
    date: randomDate(new Date(2024, 0, 1), new Date()).toString(),
    history: [{
      name: 'Brook Brown',
      price: 19.98,
      eventName: "Snorkle Cruise",
      eventDate: "11/24/2023",
      recipient: "EcoCat"
    }],
    url: '/something'
  },
  {
    date: randomDate(new Date(2024, 0, 1), new Date()).toString(),
    history: [{
      name: 'Anthony Brown',
      price: -15.98,
      eventName: "Snorkle Cruise",
      eventDate: "11/24/2023",
      recipient: "Anthony Brown"
    }],
    url: '/something'
  },
  {
    date: randomDate(new Date(2024, 0, 1), new Date()).toString(),
    history: [{
      name: 'James Brown',
      price: 159.98,
      eventName: "Snorkle Cruise",
      eventDate: "11/24/2023",
      recipient: "EcoCat"
    }],
    url: '/something'
  },
  {
    date: randomDate(new Date(2024, 0, 1), new Date()).toString(),
    history: [{
      name: 'James Brown',
      price: 159.98,
      eventName: "Snorkle Cruise",
      eventDate: "11/24/2023",
      recipient: "EcoCat"
    }],
    url: '/something'
  },
  {
    date: randomDate(new Date(2024, 0, 1), new Date()).toString(),
    history: [{
      name: 'James Brown',
      price: 159.98,
      eventName: "Snorkle Cruise",
      eventDate: "11/24/2023",
      recipient: "EcoCat"
    }],
    url: '/something'
  }
]

export default function Transactions({ setTitle }) {
  const navigate = useNavigate();

  const handleClick = (date, history) => {
    // sending transaction data through useLocation hook
    // the history has all the information for the individual tranactions
    navigate('/transaction-details', { state: { date: date, history: history } });
  }

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
                    <button
                      className="w-[86px] bg-[#0E5BB5] hover:shadow-lg rounded-full text-white px-[15px] py-[10px] text-[10px] text-center"
                      onClick={() => handleClick(transaction.date, transaction.history)}>View</button>
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