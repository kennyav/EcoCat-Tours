import React, { useState } from 'react'
import DropDownMenu from '../Calendar/DropDownMenu'
import { Switch } from '@headlessui/react'
import { useNavigate } from 'react-router-dom';

import httpClient from '../../httpClient';

export default function AddEvent() {
   const passengerNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
   const [eventName, setEventName] = useState("")
   const [eventDescription, setEventDescription] = useState("")
   const [eventStartDate, setEventStartDate] = useState()
   const [eventEndDate, setEventEndDate] = useState()
   const [eventStartTime, setEventStartTime] = useState()
   const [eventEndTime, setEventEndTime] = useState()
   const [eventRunDays, setEventRunDays] = useState(["0", "0", "0", "0", "0", "0", "0"]) // 1 to represent the day running and 0 means it is not in the format of "SuMTWThFSa"
   const [eventRepeated, setEventRepeated] = useState(false)
   const [eventRepeatedWeekly, setEventRepeatedWeekly] = useState(false)
   const [eventRepeatedBiWeekly, setEventRepeatedBiWeekly] = useState(false)
   const [eventCapacity, setEventCapacity] = useState(0)
   const [eventAge21Plus, setEventAge21Plus] = useState(false)
   const [adultNumber, setAdultNumber] = useState(0)
   const [childrenNumber, setChildrenNumber] = useState(0)
   const [infantNumber, setInfantNumber] = useState(0)
   const navigate = useNavigate();

   const [days, setDays] = useState([
      {
         day: "Su",
         index: 0,
         selected: false
      },
      {
         day: "M",
         index: 1,
         selected: false
      },
      {
         day: "T",
         index: 2,
         selected: false
      },
      {
         day: "W",
         index: 3,
         selected: false
      },
      {
         day: "Th",
         index: 4,
         selected: false
      },
      {
         day: "F",
         index: 5,
         selected: false
      },
      {
         day: "Sa",
         index: 6,
         selected: false
      }])

   const handleDaysRunning = (day) => {
      try {
         const found = days.find(element => element.day === day.day)
         found.selected = !found.selected
         eventRunDays[found.index] = found.selected ? "1" : "0";
         setEventRunDays([...eventRunDays])
         setDays([...days]);
      } catch (error) {
         throw new Error("Day not found")
      }
   }

   const registerEvent = async () => {
      setEventCapacity(adultNumber + childrenNumber + infantNumber)
      const runDays = eventRunDays.join('')
      try {
         const resp = await httpClient.post("//127.0.0.1:8000/events/register-event", {
            eventName,
            eventDescription,
            eventStartDate,
            eventEndDate,
            eventStartTime,
            eventEndTime,
            runDays,
            eventRepeated,
            eventRepeatedWeekly,
            eventRepeatedBiWeekly,
            eventCapacity,
            eventAge21Plus,
            adultNumber,
            childrenNumber,
            infantNumber,
         });
         console.log(resp.data)
      } catch (error) {
         alert("error", error.response.status)
      }
      // Redirect to /events URL
      navigate('/events');
   }



   return (
      <div className="flex flex-col p-6 gap-4 bg-white rounded-lg mx-[44px] overflow-y-auto">
         <div className="bg-[#0E5BB5] p-4 rounded-lg text-center">
            <p className="text-xl font-md font-bold leading-6 text-gray-100">
               Add Event
            </p>
            <div>
               <p className="text-xs text-gray-100 pb-[10px]">
                  Thursday, Febuary 8 2024 @ 1pm
               </p>
            </div>
         </div>

         <div className="w-full h-[0px] border border-slate-300" />

         <div className="grid grid-cols-2 grid-flow-row gap-4">
            <div>
               <div className='py-[10px]'>
                  <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                     Event Name *
                  </h3>
                  <input required value={eventName} onChange={(e) => setEventName(e.target.value)} className='border rounded-[10px] p-2' />
               </div>


               {/* Contact Information Section */}
               <div className='py-[10px]'>
                  <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                     Event Description
                  </h3>
                  <textarea rows={5} value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} className='border rounded-[10px] p-2' />
               </div>

               {/* Start Date */}
               <div className='py-[10px]'>
                  <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                     Event Start & End Date *
                  </h3>
                  <div className="flex flex-row gap-2">
                     <input required type='Date' value={eventStartDate} onChange={(e) => setEventStartDate(e.target.value)} className='border rounded-[10px] p-2' />
                     <input required type='Date' value={eventEndDate} onChange={(e) => setEventEndDate(e.target.value)} className='border rounded-[10px] p-2' />
                  </div>
               </div>

               {/* Start Date */}
               <div className='py-[10px]'>
                  <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                     Event Start & End Time *
                  </h3>
                  <div className="flex flex-row gap-2">
                     <input required type='Time' value={eventStartTime} onChange={(e) => setEventStartTime(e.target.value)} className='border rounded-[10px] p-2' />
                     <input required type='Time' value={eventEndTime} onChange={(e) => setEventEndTime(e.target.value)} className='border rounded-[10px] p-2' />
                  </div>
               </div>
            </div>


            {/* Second Column */}
            <div className="">
               {/* Start Date */}
               <div className='py-[10px]'>
                  <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                     Event Days Running *
                  </h3>
                  <div className="flex flex-row gap-2">
                     {days.map(day => {
                        let bgCSS = day.selected ? "bg-green-400 hover:bg-green-200" : "bg-gray-400 hover:bg-gray-200"
                        return (
                           <div
                              key={day.day}
                              onClick={() => handleDaysRunning(day)}
                              className={`pt-3.5 text-center w-[50px] h-[50px] rounded-full text-white cursor-pointer ${bgCSS}`}>
                              {day.day}
                           </div>
                        )
                     })

                     }

                  </div>
               </div>

               <div className="py-[10px]">
                  <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                     Is this Event Repeated?
                  </h3>
                  <Switch
                     checked={eventRepeated}
                     onChange={() => setEventRepeated(!eventRepeated)}
                     className={`${eventRepeated ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                     <span className="sr-only">Enable notifications</span>
                     <span className={`${eventRepeated ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
                  </Switch>
                  {eventRepeated && (
                     <div className="py-[10px]">
                        <div>
                           <input
                              type="radio"
                              id="weekly"
                              checked={eventRepeatedWeekly}
                              onChange={() => {
                                 setEventRepeatedWeekly(true);
                                 setEventRepeatedBiWeekly(false);
                              }}
                           />
                           <label htmlFor="weekly">Weekly</label>
                        </div>

                        <div>
                           <input
                              type="radio"
                              id="biweekly"
                              checked={eventRepeatedBiWeekly}
                              onChange={() => {
                                 setEventRepeatedWeekly(false);
                                 setEventRepeatedBiWeekly(true);
                              }}
                           />
                           <label htmlFor="biweekly">Biweekly</label>
                        </div>
                     </div>
                  )}
               </div>
               {/* Contact Information Section */}
               {/* <div className='py-[10px] flex flex-col'>
                  <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                     Event Capacity *
                  </h3>
                  <input type='number' value={eventCapacity} onChange={(e) => setEventCapacity(e.target.value)} className='border rounded-[10px] p-2' />
               </div> */}

               {/* is the event 21+ */}
               <div className="py-[10px]">
                  <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                     Event Age 21 +
                  </h3>
                  <Switch
                     checked={eventAge21Plus}
                     onChange={() => setEventAge21Plus(!eventAge21Plus)}
                     className={`${eventAge21Plus ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                     <span className="sr-only">Enable notifications</span>
                     <span className={`${eventAge21Plus ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
                  </Switch>
               </div>


               {/* Number of Passenger section*/}
               <div className='py-[10px] flex flex-col'>
                  <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                     Passengers *
                  </h3>
                  <div className='flex flex-col gap-2'>
                     <div className='inline-flex gap-5 items-center'>
                        <DropDownMenu list={passengerNumbers} setCurrent={setAdultNumber} current={adultNumber} />
                        <div>
                           <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>Adults</h1>
                           <h1 className='text-xs text-left font-light text-gray-900'>Ages 12+</h1>
                        </div>
                     </div>
                     {!eventAge21Plus &&
                        <div className="flex flex-col gap-2">
                           <div className='inline-flex gap-5 items-center'>
                              <DropDownMenu list={passengerNumbers} setCurrent={setChildrenNumber} current={childrenNumber} />
                              <div>
                                 <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>Children</h1>
                                 <h1 className='text-xs text-left font-light text-gray-900'>Ages 5-11</h1>
                              </div>
                           </div>
                           <div className='inline-flex gap-5 items-center'>
                              <DropDownMenu list={passengerNumbers} setCurrent={setInfantNumber} current={infantNumber} />
                              <div>
                                 <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>Infant</h1>
                                 <h1 className='text-xs text-left font-light text-gray-900'>Ages 0-4</h1>
                              </div>
                           </div>
                        </div>}
                  </div>
               </div>
            </div>
         </div>


         <button
            className={`flex w-[50px] justify-center items-end px-6 py-1.5 text-sm font-light rounded-[32px] bg-[#0E5BB5] hover:shadow-md text-white`}
            onClick={() => registerEvent()}>
            Add Event
         </button>
      </div >
   )
}
