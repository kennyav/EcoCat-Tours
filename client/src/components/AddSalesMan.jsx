import React from 'react';

export default function AddSalesMan() {
   const inputCSS =
      "rounded-[10px] pl-[14px] py-[9px] border border-slate-300 text-xs text-justify font-medium font-['Kumbh Sans'] resize-none outline-none";

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
            </div>
            <div className="w-1/2">te</div>
         </div>
      </div>
   );
}
