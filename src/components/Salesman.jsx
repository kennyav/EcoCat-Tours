import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../reducers/loginSlice';

// components
import SalesmanInfo from './SalesmanComponents/SalesmanInfo';
import httpClient from '../httpClient';

export default function Salesman() {
  const url = useSelector((state) => state.development.value)
  const [salesmen, setSalesmen] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get(`${url}:8000/salesmen/@salesmen`);
        setSalesmen(resp.data)
      } catch (error) {
        console.log("Error", error)
      }
    })();
  }, [url]);


  useEffect(() => {
    dispatch(update("Salesmen"))
  }, [dispatch]);

  return (
    <div className="px-[41px]">
      <div className='flex p-6 flex-col w-full h-auto rounded-[25px] bg-white'>
        <div className='flex flex-row justify-between items-center text-left font-KumbhSans text-[12px] font-bold py-5 border-b'>
          <p>Name</p>
          <p>Phone Number</p>
          <p>Email</p>
          <a href={'add-newsalesman'} className="w-[86px] bg-[#0E5BB5] hover:shadow-lg rounded-full py-[8px] text-white text-[10px] text-center">Add</a>
        </div>
        <div className='py-2'>
          {
            salesmen.map(person => {
              return (
                <div key={person.id} className='flex flex-row border-b w-full h-auto items-center justify-between py-8 font-KumbhSans font-bold text-[14px]'>
                  <p>{person.first_name} {person.last_name}</p>
                  <p>{person.phone}</p>
                  <p>{person.email}</p>
                  <SalesmanInfo person={person} />
                </div>
              )
            })
          }
        </div>

      </div>
    </div>
  )
}