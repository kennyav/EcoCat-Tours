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
          <p className="w-[20%]">Name</p>
          <p className="w-[20%]">Phone Number</p>
          <p className="flex w-[20%] justify-center">Email</p>
          <div className="flex justify-end w-[20%]">
            <a href={'add-newsalesman'} className="w-[86px] h-auto bg-[#0E5BB5] hover:shadow-lg rounded-full py-[8px] text-white text-[10px] text-center">Add</a>
          </div>
        </div>
        <div className='py-2'>
          {
            salesmen.map(person => {
              return (
                <div key={person.id} className='flex flex-row border-b w-full h-auto items-center justify-between py-8 font-KumbhSans font-bold text-[14px]'>
                  <p className="w-[20%]">{person.first_name} {person.last_name}</p>
                  <p className="w-[20%]">{person.phone}</p>
                  <p className="flex w-[20%] justify-center">{person.email}</p>
                  <div className="flex justify-end w-[20%]">
                    <SalesmanInfo person={person} />
                  </div>
                </div>
              )
            })
          }
        </div>

      </div>
    </div>
  )
}