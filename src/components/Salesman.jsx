import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { update } from '../reducers/loginSlice';

// components
import SalesmanInfo from './SalesmanComponents/SalesmanInfo';
import httpClient from '../httpClient';

export default function Salesman() {
  const [salesmen, setSalesmen] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("//127.0.0.1:8000/salesmen/@salesmen");
        console.log(resp.data)
        setSalesmen(resp.data)
      } catch (error) {
        console.log("Error", error)
      }
    })();
  }, []);


  useEffect(() => {
    dispatch(update("Salesmen"))
  }, [dispatch]);

  return (
    <div className='px-[41px]'>
      <div className='flex flex-col w-full h-full rounded-[25px] bg-white'>
        <div className='flex flex-row w-full h-auto border-b-2 items-center justify-between px-[20px] py-[36px]'>
          <div className='flex flex-row w-1/2 gap-x-[300px] font-KumbhSans text-[12px] font-bold text-left'>
            <p>Name</p>
            <p>Phone Number</p>
            <p>Email</p>
          </div>
          <a href={'add-newsalesman'}className="w-[86px] bg-[#0E5BB5] hover:shadow-lg rounded-full py-[8px] text-white text-[10px] text-center">Add</a>
        </div>
        <div className='w-full h-auto overflow-scroll'>
          {
            salesmen.map(person => {
              return (
                <div key={person.id} className='flex flex-row w-full h-auto border-b-2 items-center justify-between px-[20px] py-[36px]'>
                  <div className='flex flex-row w-1/2 h-auto gap-x-[275px] font-KumbhSans text-[14px] font-bold text-left'>
                    <p>{person.first_name} {person.last_name}</p>
                    <p>{person.phone}</p>
                    <p>{person.email}</p>
                  </div>
                  <SalesmanInfo person={person}/>
                </div>
              )
            })
          }
        </div>

      </div>
    </div>
  )
}
