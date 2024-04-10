import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../../reducers/loginSlice';
import { updateSalesmanId } from '../../reducers/salesmanSlice'

// helper functions
import { handlePhoneNumberChange } from '../../helper/formHelper'
import httpClient from '../../httpClient';


export default function AddSalesMan({ toggle }) {
   const url = useSelector((state) => state.development.value)
   const inputCSS =
      "rounded-[10px] pl-[14px] py-[9px] border border-slate-300 text-xs text-justify font-medium font-['Kumbh Sans'] resize-none outline-none";
   
   const dispatch = useDispatch()
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   const [notes, setNotes] = useState('');
   const [email, setEmail] = useState('');
   const [submitted, setSubmitted] = useState(false)


   const navigate = useNavigate();
   useEffect(() => {
      dispatch(update("Add Salesman"))
   }, [dispatch])

   const registerSalesman = async () => {
      try {
         const resp = await httpClient.post(`${url}/salesmen/register-salesmen`, {
            firstName,
            lastName,
            email,
            phoneNumber,
            notes
         });
         console.log(resp.data)
         // Redirect to /salesman URL
         if (toggle) {
            navigate('/salesman');
         } else {
            dispatch(updateSalesmanId(resp.data.id))
            setSubmitted(true)
         }
      } catch (error) {
         alert("error, salesman already exists", error.response.status)
      }
   }

   const isSaveButtonDisabled = !firstName;
   return (
      <div className="px-[41px]">
         <div className="grid grid-rows-2 grid-flow-col gap-4 px-[41px] w-full h-auto p-6 bg-white rounded-[25px]">

            <div className="">
               <h1 className="text-black text-sm font-bold font-['Kumbh Sans'] mb-2">Name *</h1>
               <div className="flex flex-col gap-8 w-2/3">
                  <input type="text" className={inputCSS} placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  <input type="text" className={`${inputCSS}`} placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
               </div>
            </div>

            <div className="flex items-end">
               {submitted ? (
                  <button
                     className={`flex justify-center items-center px-6 py-1.5 text-sm font-light rounded-[32px] bg-green-400 text-white cursor-not-allowed`}>
                     Submitted
                  </button>

               ) : (
                  <button
                     disabled={isSaveButtonDisabled}
                     className={`flex justify-center items-center px-6 py-1.5 text-sm font-light rounded-[32px] ${isSaveButtonDisabled ? 'bg-red-300' : 'bg-[#0E5BB5] hover:shadow-md text-white'}`}
                     onClick={() => registerSalesman()}>
                     Save
                  </button>

               )}
            </div>

            <div className="flex flex-col gap-1 w-2/3">
               <div className="">
                  <h1 className="text-black text-sm font-bold font-['Kumbh Sans'] mb-2">Phone Number</h1>
                  <input type="tel" className={`${inputCSS} w-full`} placeholder="Phone Number" value={phoneNumber} onChange={(e) => handlePhoneNumberChange(e, setPhoneNumber)} />
               </div>
               <div className="">
                  <h1 className="text-black text-sm font-bold font-['Kumbh Sans'] mb-2">Email</h1>
                  <input type="text" className={`${inputCSS} w-full`} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
               </div>
            </div>

            <div className="">
               <h1 className="text-black text-sm font-bold font-['Kumbh Sans'] mb-2">Notes</h1>
               <textarea type="text" className={`${inputCSS} w-full h-24`} placeholder="Enter" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>

         </div>
      </div >
   );
}