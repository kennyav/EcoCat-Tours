import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddSalesMan() {
   const inputCSS =
      "rounded-[10px] pl-[14px] py-[9px] border border-slate-300 text-xs text-justify font-medium font-['Kumbh Sans'] resize-none outline-none";

   // Initialize useHistory hook
   const navigate = useNavigate();

   function handleClick() {
      // Redirect to /salesman URL
      navigate('/salesman');
   }


   return (
      <div className="px-[41px]">
         <div className="flex w-full h-[286px] bg-white rounded-[25px]">
            <div className="w-1/2 pl-[32px] pt-[37px]">
               <div className="inline-flex w-full justify-between">
                  <div className='gap-1'>
                     <div className="text-black text-sm font-bold font-['Kumbh Sans'] mb-2">Name *</div>
                     <input type="text" className={inputCSS} placeholder="First Name" />
                     <input type="text" className={`${inputCSS} lg:ml-2`} placeholder="Last Name" />
                  </div>
                  <div>
                     <div className="text-black text-sm font-bold font-['Kumbh Sans'] mb-2">Phone Number *</div>
                     <input type="tel" className={inputCSS} placeholder="Phone Number" />
                  </div>
               </div>
               <div className='gap-1 pt-[10px]'>
                  <div className="text-black text-sm font-bold font-['Kumbh Sans'] mb-2">Notes</div>
                  <input type="text" className={`${inputCSS} w-full h-24`} placeholder="Enter" />
               </div>
            </div>

            {/* TODO: have the button disabled until all the required inputs are inputted */}
            <div className='flex w-1/2 justify-end items-end p-[32px]'>
               <button
                  className='flex justify-center items-center px-6 py-1.5 text-sm font-light rounded-[32px] bg-[#C4D2DC] hover:bg-[#0E5BB5] hover:shadow-md text-white'
                  onClick={() => handleClick()}>
                  Save
               </button>
            </div>
         </div>
      </div>
   );
}
