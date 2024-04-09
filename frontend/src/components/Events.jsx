import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import httpClient from '../httpClient';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../reducers/loginSlice';
import { quantum } from 'ldrs'


// components
import EventLoader from './EventsComponents/EventLoader';

// icons
import { EventAddIcon } from './Icons'

export const RefreshContext = createContext(null)

export default function Events() {
  // create context for refresh
  const [refresh, setRefresh] = useState(false)

  // redux
  const url = useSelector((state) => state.development.value)
  const dispatch = useDispatch()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  quantum.register()

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const resp = await httpClient.get(`${url}:8000/events/@events`);
        setEvents(resp.data)
      } catch (error) {
        console.log("Error", error)
      } finally {
        setLoading(false)
      }
    })();
  }, [url, refresh]);



  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/add-events');
  }

  useEffect(() => {
    dispatch(update("Events"))
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center lg:h-[400px] md:h-[200px] h-[100px] col-span-7">
          <l-quantum
            size="100"
            speed="1.75"
            color="black"
          />
        </div>
      ) : (
        <div className='grid grid-cols-2 grid-flow-row gap-5 px-[41px] py-[46px] place-content-center'>
          <RefreshContext.Provider value={{refresh,setRefresh}}>
            {events && events.map((event) => (
              <EventLoader key={event.id} event={event} eventId={event.id} />
            ))}
          </RefreshContext.Provider>
          <div className='flex items-center justify-center'>
            <EventAddIcon onClick={() => handleClick()} />
          </div>
        </div >
      )
      }

    </>
  )
}
