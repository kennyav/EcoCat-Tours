import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

// components
import SalesmanInfo from './SalesmanComponents/SalesmanInfo';

const salesman = [
  {
    id: "1",
    name: "John Doe",
    number: '111-111-1111'
  },
  {
    id: "1",
    name: "John Doe",
    number: '111-111-1111'
  },
  {
    id: "1",
    name: "John Doe",
    number: '111-111-1111'
  },
  {
    id: "1",
    name: "John Doe",
    number: '111-111-1111'
  },
  {
    id: "1",
    name: "John Doe",
    number: '111-111-1111'
  },
  {
    id: "2",
    name: "John Doe",
    number: '111-111-1111'
  },
  {
    id: "3",
    name: "John Doe",
    number: '111-111-1111'
  },
  {
    id: "4",
    name: "John Doe",
    number: '111-111-1111'
  },
  {
    id: "5",
    name: "John Doe",
    number: '111-111-1111'
  },
  {
    id: "6",
    name: "John Doe",
    number: '111-111-1111'
  },
]

export default function Salesman({ setTitle }) {

  useEffect(() => {
    setTitle("Salesman");
  }, [setTitle]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/add-newsalesman');
  }

  return (
    <div className='px-[41px]'>
      <div className='flex flex-col w-full h-full rounded-[25px] bg-white'>
        <div className='flex flex-row w-full h-auto border-b-2 items-center justify-between px-[20px] py-[36px]'>
          <div className='flex flex-row w-1/2 gap-x-[300px] font-KumbhSans text-[12px] font-bold text-left'>
            <p>Name</p>
            <p>Phone Number</p>
          </div>
          <button 
            onClick={() => handleClick()}
            className='w-[86px] bg-[#0E5BB5] hover:shadow-lg rounded-full py-[8px] text-white text-[10px] text-center'>Add</button>
        </div>
        <div className='w-full h-auto overflow-scroll'>
          {
            salesman.map(person => {
              return (
                <div key={person.id} className='flex flex-row w-full h-auto border-b-2 items-center justify-between px-[20px] py-[36px]'>
                  <div className='flex flex-row w-1/2 h-auto gap-x-[275px] font-KumbhSans text-[14px] font-bold text-left'>
                    <p>{person.name}</p>
                    <p>{person.number}</p>
                  </div>
                  <SalesmanInfo/>
                </div>
              )
            })
          }
        </div>

      </div>
    </div>
  )
}
