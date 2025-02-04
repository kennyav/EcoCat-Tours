import React, { useState, useEffect } from 'react'
import { Switch } from '@headlessui/react'
import { useNavigate } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../../reducers/loginSlice';

import httpClient from '../../httpClient';

export default function AddEvent() {
   const url = useSelector((state) => state.development.value)
   const dispatch = useDispatch()
   const [title, setTitle] = useState("")
   const [description, setDescription] = useState("")
   const [startDate, setStartDate] = useState()
   const [endTime, setEndTime] = useState()
   const [endDate, setEndDate] = useState()
   const [runDays, setRunDays] = useState(["0", "0", "0", "0", "0", "0", "0"]) // 1 to represent the day running and 0 means it is not in the format of "SuMTWThFSa"
   const [repeated, setRepeated] = useState(false);
   const [repeatedWeekly, setRepeatedWeekly] = useState(false);
   const [repeatedBiWeekly, setReaptedBiWeekly] = useState(false);
   const [aboveDrinkingAge, setAboveDrinkingAge] = useState(false);
   const [adultNumber, setAdultNumber] = useState(0);
   const [childrenNumber, setChildrenNumber] = useState(0);
   const [infantNumber, setInfantNumber] = useState(0);
   const [createdBy, setCreatedBy] = useState();
   const navigate = useNavigate();
   const isCreateButtonDisabled = repeated ? !title || !startDate || !endTime || !endDate || !adultNumber : !title || !startDate || !endTime || !adultNumber

   useEffect(() => {
      dispatch(update("Add Event"))
   }, [dispatch])


   const [days, setDays] = useState([
      {
         day: "M",
         index: 0,
         selected: false
      },
      {
         day: "T",
         index: 1,
         selected: false
      },
      {
         day: "W",
         index: 2,
         selected: false
      },
      {
         day: "Th",
         index: 3,
         selected: false
      },
      {
         day: "F",
         index: 4,
         selected: false
      },
      {
         day: "Sa",
         index: 5,
         selected: false
      },
      {
         day: "Su",
         index: 6,
         selected: false
      },])


   useEffect(() => {
      (async () => {
         try {
            const resp = await httpClient.get(`${url}/auth/@me`);
            setCreatedBy(resp.data.id);
         } catch (error) {
            console.log("Not authenticated");
         }
      })();
   }, [url]);

   const handleDaysRunning = (day) => {
      try {
         const found = days.find(element => element.day === day.day)
         found.selected = !found.selected
         runDays[found.index] = found.selected ? "1" : "0";
         setRunDays([...runDays])
         setDays([...days]);
      } catch (error) {
         throw new Error("Day not found")
      }
   }

   const registerEvent = async () => {
      const capacity = adultNumber + childrenNumber + infantNumber
      const days = runDays.join('')

      try {
         const resp = await httpClient.post(`${url}/events/register-event`, {
            title,
            description,
            capacity,
            aboveDrinkingAge,
            createdBy
         });


         const eventId = resp.data.id
         const schedule = await httpClient.post(`${url}/events/schedule-event`, {
            eventId,
            capacity,
            startDate,
            endDate,
            endTime,
            repeated,
            repeatedWeekly,
            repeatedBiWeekly,
            adultNumber,
            childrenNumber,
            infantNumber,
            days,
         });

         console.log(schedule.data)
         // Redirect to /events URL
         navigate('/events');

      } catch (error) {
         console.log("OVERLAP ERROR HERE", error.response)
         if (error.response.status === 400) {
            alert("Event overlaps, check times and resubmit?")
         }
      }
   }



   return (
      <div className="flex flex-col p-6 gap-4 bg-white rounded-lg mx-[44px] overflow-y-auto">
         <div className="bg-[#0E5BB5] p-4 rounded-lg text-center">
            <p className="text-xl font-md font-bold leading-6 text-gray-100">
               Create A New Event
            </p>
         </div>

         <div className="w-full h-[0px] border border-slate-300" />

         <div className="grid grid-cols-2 grid-flow-row gap-4">
            <div>
               <div className='py-[10px]'>
                  <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                     Event Name *
                  </h3>
                  <input required value={title} onChange={(e) => setTitle(e.target.value)} className='border rounded-[10px] p-2 w-2/3' />
               </div>


               {/* Contact Information Section */}
               <div className='py-[10px]'>
                  <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                     Event Description
                  </h3>
                  <textarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} className='border rounded-[10px] p-2 w-2/3' />
               </div>

               {/* Start Date */}

               <div className="py-[10px]">
                  <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                     Event Start Date and Time*
                  </h3>
                  <input type='datetime-local' onChange={(e) => setStartDate(e.target.value)} />
               </div>


               <div className="py-[10px]">
                  <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                     Event End Time*
                  </h3>
                  <input type='time' onChange={(e) => setEndTime(e.target.value)} />
               </div>
            </div>


            {/* Second Column */}
            <div className="">

               <div className="flex flex-col justify-between w-2/3 py-[10px]">
                  <h2 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                     Event Type *
                  </h2>
                  <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                     Repeated
                  </h3>
                  <div>
                     <Switch
                        checked={repeated}
                        onChange={() => setRepeated(!repeated)}
                        className={`${repeated ? 'bg-green-600' : 'bg-blue-600'} relative inline-flex h-6 w-11 items-center rounded-full`}
                     >
                        <span className="sr-only">Enable notifications</span>
                        <span className={`${repeated ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
                     </Switch>
                     {repeated && (
                        <div className="py-[10px]">
                           <div>
                              <input
                                 type="radio"
                                 id="weekly"
                                 checked={repeatedWeekly}
                                 onChange={() => {
                                    setRepeatedWeekly(true);
                                    setReaptedBiWeekly(false);
                                 }}
                              />
                              <label htmlFor="weekly"> Weekly</label>
                           </div>

                           <div>
                              <input
                                 type="radio"
                                 id="biweekly"
                                 checked={repeatedBiWeekly}
                                 onChange={() => {
                                    setRepeatedWeekly(false);
                                    setReaptedBiWeekly(true);
                                 }}
                              />
                              <label htmlFor="biweekly"> Biweekly</label>
                           </div>

                           <div className="py-[10px]">
                              <h3 className='py-[10px] font-medium leading-6 text-gray-900'>
                                 Event End Date*
                              </h3>
                              <input type='date' onChange={(e) => setEndDate(e.target.value)} />
                           </div>

                           {/* Start Date */}
                           <div>
                              <h3 className='py-[10px] font-medium leading-6 text-gray-900'>
                                 Event Days Running *
                              </h3>
                              <div className="flex flex-row gap-2">
                                 {days.map(day => {
                                    let bgCSS = day.selected ? "bg-green-600 hover:bg-green-300" : "bg-gray-400 hover:bg-gray-300"
                                    return (
                                       <div
                                          key={day.day}
                                          onClick={() => handleDaysRunning(day)}
                                          className={`pt-2 text-center text-sm w-[35px] h-[35px] rounded-full text-white cursor-pointer ${bgCSS}`}>
                                          {day.day}
                                       </div>
                                    )
                                 })

                                 }

                              </div>
                           </div>
                        </div>
                     )}
                  </div>
               </div>

               {/* is the event 21+ */}
               <div className="py-[10px]">
                  <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                     Event Age 21 +
                  </h3>
                  <Switch
                     checked={aboveDrinkingAge}
                     onChange={() => setAboveDrinkingAge(!aboveDrinkingAge)}
                     className={`${aboveDrinkingAge ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                     <span className="sr-only">Enable notifications</span>
                     <span className={`${aboveDrinkingAge ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
                  </Switch>
               </div>


               {/* Number of Passenger section*/}
               <div className='py-[10px] flex flex-col'>
                  <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                     Passengers *
                  </h3>
                  <div className='flex flex-col gap-2'>
                     <div className='inline-flex gap-5 items-center'>
                        <input value={adultNumber || 0} onChange={(e) => setAdultNumber(parseInt(e.target.value))} className='w-20 h-12 rounded-full border py-2 text-center hover:border-blue-500 cursor-pointer' />
                        <div>
                           <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>Adults</h1>
                           <h1 className='text-xs text-left font-light text-gray-900'>{aboveDrinkingAge ? "Ages 21+" : "Ages 12+"}</h1>
                        </div>
                     </div>
                     {!aboveDrinkingAge &&
                        <div className="flex flex-col gap-2">
                           <div className='inline-flex gap-5 items-center'>

                              <input value={childrenNumber || 0} onChange={(e) => setChildrenNumber(parseInt(e.target.value))} className='w-20 h-12 rounded-full border py-2 text-center hover:border-blue-500 cursor-pointer' />
                              <div>
                                 <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>Children</h1>
                                 <h1 className='text-xs text-left font-light text-gray-900'>Ages 5-11</h1>
                              </div>
                           </div>
                           <div className='inline-flex gap-5 items-center'>

                              <input value={infantNumber || 0} onChange={(e) => setInfantNumber(parseInt(e.target.value))} className='w-20 h-12 rounded-full border py-2 text-center  hover:border-blue-500  cursor-pointer' />
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
            disabled={isCreateButtonDisabled}
            className={`flex w-1/5 justify-center items-end px-6 py-1.5 text-sm font-light rounded ${isCreateButtonDisabled ? "bg-red-100 text-red-900 focus-visible:ring-red-500" : "bg-blue-100 text-blue-900 hover:bg-blue-200 focus-visible:ring-blue-500"}`}
            onClick={() => registerEvent()}>
            Add Event
         </button>
      </div >
   )
}
