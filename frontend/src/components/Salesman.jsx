import React, { useState, useEffect } from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../reducers/loginSlice';

// components
import SalesmanInfo from './SalesmanComponents/SalesmanInfo';
import httpClient from '../httpClient';

// loader 
import { quantum } from 'ldrs'

export default function Salesman() {

  // redux
  const url = useSelector((state) => state.development.value)
  const refresh = useSelector((state) => state.refresh.value)
  const dispatch = useDispatch()

  // set salesmen
  const [salesmen, setSalesmen] = useState([])

  // set loading
  const [loading, setLoading] = useState(false)
  quantum.register()

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const resp = await httpClient.get(`${url}/salesmen/@salesmen`);
        setSalesmen(resp.data)
      } catch (error) {
        console.log("Error", error)
      } finally {
        setLoading(false);
      }
    })();
  }, [url, refresh]);


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
          {loading ?
            <div className="flex justify-center items-center lg:h-[400px] md:h-[200px] h-[100px] col-span-7">
              <l-quantum
                size="100"
                speed="1.75"
                color="black"
              />
            </div>
            :
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