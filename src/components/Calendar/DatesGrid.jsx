import React, { useState, useEffect } from 'react';
import Event from './Event';
import httpClient from '../../httpClient';

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function DatesGrid({ dates, currentMonth, currentYear, setEventClick, events }) {
   const [signal, setSignal] = useState({
      open: false,
      id: "",
      passengers: [],
      event: {},
      date: {}
   });

   const [scheduledEvents, setScheduledEvents] = useState([]);
   let eventIds = events ? events.map(event => event.id) : []

   useEffect(() => {
      setEventClick({
         eventInfo: signal.event,
         passengerInfo: signal.passengers,
         clicked: signal.open,
         date: signal.date
      });
   }, [signal, setEventClick]);

   useEffect(() => {
      const fetchEvents = async () => {
         try {
            const promises = dates.map(async (dayNumber) => {
               if (dayNumber) {
                  const date = new Date(currentYear, currentMonth.index, dayNumber)
                  const fetchedEvents = await getEvents(date, eventIds);
                  return fetchedEvents;
               } else {
                  return []
               }
            });
            const resolvedEvents = await Promise.all(promises);
            setScheduledEvents(resolvedEvents);
         } catch (error) {
            console.error('Error fetching events:', error);
         } 
      };

      fetchEvents();
   }, [dates, currentMonth, currentYear, events]);

   const getEvents = async (date, ids) => {
      try {
         const resp = await httpClient.get(`http://127.0.0.1:8000/events/${ids}/${date}`);
         return resp.data;
      } catch (error) {
         console.error('Error fetching events:', error);
         return [];
      }
   };

   return (
      <div className="grid grid-cols-7 grid-flow-row p-5 font-KumbhSans">
         {DAYS_OF_WEEK.map((dayName, i) => (
            <div key={i} className="font-bold text-center text-[14px] p-4">
               {dayName}
            </div>
         ))}
         <div className="col-span-7 border" />
         {/* {isLoading ? (
            <div>Loading...</div>
         ) : ( */}
         {dates.map((dayNumber, i) => (
            <div key={i} className="p-2">
               <div key={i} className="text-left text-[14px] p-2">
                  {dayNumber}
               </div>
               {scheduledEvents[i] &&
                  scheduledEvents[i].map((event) => (
                     <div key={event.id} className="pb-1">
                        <Event
                           key={event.id}
                           signal={signal}
                           id={event.id}
                           setSignal={setSignal}
                           scheduledEvent={event}
                           event={events.find(e => e.id === event.event_id)}
                           month={currentMonth.name}
                           year={currentYear}
                           day={dayNumber}
                        />
                     </div>
                  ))}
            </div>
         ))}
      </div>
   );
}
