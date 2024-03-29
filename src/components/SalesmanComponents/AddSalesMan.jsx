import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { update } from '../../reducers/loginSlice';

import httpClient from '../../httpClient';

export default function AddSalesMan() {
   const inputCSS =
      "rounded-[10px] pl-[14px] py-[9px] border border-slate-300 text-xs text-justify font-medium font-['Kumbh Sans'] resize-none outline-none";

   const dispatch = useDispatch()
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   const [notes, setNotes] = useState('');
   const [email, setEmail] = useState('');


   const navigate = useNavigate();
   useEffect(() => {
      dispatch(update("Add Salesman"))
   }, [dispatch])

   const registerSalesman = async () => {
      try {
         const resp = await httpClient.post("//127.0.0.1:8000/salesmen/register-salesmen", {
            firstName,
            lastName,
            email,
            phoneNumber,
            notes
         });
         console.log(resp.data)
      } catch (error) {
         alert("error", error.response.status)
      }
      // Redirect to /salesman URL
      navigate('/salesman');
   }

   function formatPhoneNumber(input) {
      // Remove all non-digit characters from the input string
      const cleaned = input.replace(/\D/g, '');
      // Format the cleaned input into a phone number format
      const formatted = cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      return formatted;
   }

   function handlePhoneNumberChange(event) {
      // Format the input value and update the state
      const formattedValue = formatPhoneNumber(event.target.value);
      setPhoneNumber(formattedValue);
   }

   const isPhoneNumberValid = /^(\(\d{3}\)\s\d{3}-\d{4})$/.test(phoneNumber);
   const isSaveButtonDisabled = !firstName || !lastName || !isPhoneNumberValid;

   return (
      <div className="px-[41px]">
         <div className="flex w-full h-auto p-6 bg-white rounded-[25px]">
            <div className="w-1/2 pl-[32px] pt-[37px]">
               <div className="inline-flex w-full justify-between">
                  <div className='gap-1'>
                     <div className="text-black text-sm font-bold font-['Kumbh Sans'] mb-2">Name *</div>
                     <input type="text" className={inputCSS} placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                     <input type="text" className={`${inputCSS} lg:ml-2`} placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                  <div className='gap-1'>
                     <div className="text-black text-sm font-bold font-['Kumbh Sans'] mb-2">Phone Number *</div>
                     <input type="tel" className={inputCSS} placeholder="Phone Number" value={phoneNumber} onChange={handlePhoneNumberChange} />
                     <div className="text-black text-sm font-bold font-['Kumbh Sans'] mb-2">Email *</div>
                     <input type="text" className={`${inputCSS} lg:ml-2`} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
               </div>
               <div className='gap-1 pt-[10px]'>
                  <div className="text-black text-sm font-bold font-['Kumbh Sans'] mb-2">Notes</div>
                  <input type="text" className={`${inputCSS} w-full h-24`} placeholder="Enter" value={notes} onChange={(e) => setNotes(e.target.value)} />
               </div>
            </div>

            {/* Disable the button until all required fields are filled */}
            <div className='flex w-1/2 justify-end items-end p-[32px]'>
               <button
                  disabled={isSaveButtonDisabled}
                  className={`flex justify-center items-center px-6 py-1.5 text-sm font-light rounded-[32px] ${isSaveButtonDisabled ? 'bg-gray-300' : 'bg-[#0E5BB5] hover:shadow-md text-white'}`}
                  onClick={() => registerSalesman()}>
                  Save
               </button>
            </div>
         </div>
      </div>
   );
}

