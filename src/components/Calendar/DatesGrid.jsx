import React, { useState, useEffect } from 'react';
import Event from './Event';
import httpClient from '../../httpClient';
import { quantum } from 'ldrs'

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function DatesGrid({ dates, currentMonth, currentYear, setEventClick, events }) {
   const [loading, setLoading] = useState(false)
   const [signal, setSignal] = useState({
      open: false,
      id: "",
      passengers: [],
      event: {},
      date: {}
   });
   quantum.register()

   const [scheduledEvents, setScheduledEvents] = useState([]);
   const eventIds = events ? events.map(event => event.id) : []

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
         setLoading(true); // Set loading to true before fetching data
         try {
            const filteredDates = dates.filter(day => day !== null && day !== undefined && day !== '');
            const fetchedEvents = await getEvents(filteredDates);
            console.log(scheduledEvents)
         } catch (error) {
            console.error('Error fetching events:', error);
         } finally {
            setLoading(false); // Set loading to false after fetching data
         }
      };

      fetchEvents();
   }, [dates, currentMonth.index, currentYear, events]);

   const getEvents = async (filteredDates) => {
      try {
         const resp = await httpClient.get(`http://127.0.0.1:8000/events/dates`, {
            params: {
               eventIds: eventIds.join(','),
               currentYear: currentYear,
               currentMonth: currentMonth.index + 1,
               dates: filteredDates.join(',')
            }
         })
         setScheduledEvents(resp.data);
         return resp.data;
      } catch (error) {
         console.error('Error fetching events:', error);
         return [];
      }
   };

   const displayEvent = (day) => {
      const eventsToDisplay = scheduledEvents.filter(event => parseInt(event.day) === day);

      return eventsToDisplay.length > 0 && eventsToDisplay[0].list_of_events.map((event) => (
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
               day={day}
            />
         </div>
      ));
   }


   return (
      <div className="grid grid-cols-7 grid-flow-row p-5 font-KumbhSans">
         {DAYS_OF_WEEK.map((dayName, i) => (
            <div key={i} className="font-bold text-center text-[14px] p-4">
               {dayName}
            </div>
         ))}
         <div className="col-span-7 border" />
         {loading ? (
            <div className="flex justify-center items-center lg:h-[400px] md:h-[200px] h-[100px] col-span-7">
               <l-quantum
                  size="100"
                  speed="1.75"
                  color="black"
               />
            </div>
         ) : (
            dates.map((dayNumber, i) => (
               <div key={i} className="p-2">
                  <div key={i} className="text-left text-[14px] p-2">
                     {dayNumber}
                  </div>
                  {displayEvent(dayNumber)}
               </div>
            ))
         )}
      </div>
   );
}
