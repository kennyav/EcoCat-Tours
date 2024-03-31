import React, { useEffect, useState } from 'react'
import httpClient from '../../httpClient';
import { quantum } from 'ldrs'
import { useSelector } from 'react-redux';

export default function SingleTransaction(props) {
   const url = useSelector((state) => state.development.value)
   const [event, setEvent] = useState({})
   quantum.register()
   const [loading, setLoading] = useState(false)

   useEffect(() => {
      (async () => {
         setLoading(true)
         try {
            const resp = await httpClient.get(`${url}:8000/events/get-event/${props.history.event_id}`)
            setEvent(resp.data)
         } catch (error) {
            console.log("Error", error)
         } finally {
            setLoading(false); // Set loading to false after fetching data
         }
      })();
   }, [])

   let price = props.history.total_price >= 0 ? 'text-green-600' : 'text-red-700';

   return (
      <div className="w-full h-auto px-5 py-[25px] bg-white border-t border-zinc-300 items-center gap-6 font-['Kumbh Sans'] text-black">
         <div className="justify-start items-center gap-6 flex">
            {loading ? (
               <div className="flex justify-center items-center lg:h-[400px] md:h-[200px] h-[100px] col-span-7">
                  <l-quantum
                     size="100"
                     speed="1.75"
                     color="black"
                  />
               </div>
            ) : (
               <div className="flex h-auto w-full px-6 justify-between items-center">
                  <div className="flex-col justify-center items-start gap-1.5 inline-flex">
                     <div className="text-sm font-bold">{props.history.first_name} {props.history.last_name}</div>
                     <div className="text-[10px] font-normal">{props.history.start_time}</div>
                  </div>
                  <div className="flex-col justify-center items-start gap-1.5 inline-flex">
                     <div className="text-sm font-bold">Price</div>
                     <div className={`w-44 ${price} text-sm font-bold `}>${props.history.total_price}</div>
                  </div>
                  <div className="flex-col justify-center items-start gap-1.5 inline-flex">
                     <div className="text-sm font-bold">Event</div>
                     <div className="text-[10px] font-normal">{event.title}</div>
                  </div>
                  <div className="flex-col justify-center items-start gap-1.5 inline-flex">
                     <div className="text-sm font-bold">Recipient </div>
                     <div className="text-[10px] font-normal">EcoCat</div>
                  </div>
               </div>

            )}
         </div>
      </div>
   )
}
