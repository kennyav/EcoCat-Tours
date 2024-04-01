import React from 'react'

export default function SingleTransaction(props) {
   let price = props.history.price >= 0 ? 'text-green-600' : 'text-red-700';

   return (
      <div className="w-full h-auto px-5 py-[25px] bg-white border-t border-zinc-300 justify-start items-center gap-6 inline-flex font-['Kumbh Sans'] text-black">
         <div className="justify-start items-center gap-6 flex">
            <div className="h-[35px] justify-start items-center gap-6 flex">
               <div className="flex-col justify-center items-start gap-1.5 inline-flex">
                  <div className="w-[287px text-sm font-bold">{props.history.name}</div>
                  <div className="w-[287px] text-[10px] font-normal">11/24/2023 @ 11:53am</div>
               </div>
               <div className="flex-col justify-center items-start gap-1.5 inline-flex">
                  <div className={`w-44 ${price} text-sm font-bold `}>${props.history.price}</div>
               </div>
               <div className="w-[201px] flex-col justify-center items-start gap-1.5 inline-flex">
                  <div className="w-[287px] text-sm font-bold">Event</div>
                  <div className="w-[287px] text-[10px] font-normal">{props.history.eventName}, {props.history.eventDate}</div>
               </div>
               <div className="w-[201px] flex-col justify-center items-start gap-1.5 inline-flex">
                  <div className="w-[287px] text-sm font-bold">Recipient </div>
                  <div className="w-[287px] text-[10px] font-normal">{props.history.recipient}</div>
               </div>
            </div>
         </div>
      </div>
   )
}
