import React from 'react'

//icons
import { CheckedInIcon } from '../Icons'

// modal
import CheckIn from './CheckIn'

export default function GuestInfo(props) {
  return (
    // <div className="w-full h-[149px] pl-[26px] pt-[30px] justify-center items-center inline-flex">
    <div className="flex-col  pl-[26px] pt-[30px] justify-start items-start gap-[9px] inline-flex">
      <div className="justify-start items-start gap-1 inline-flex">
        <div className="w-[179px] flex-col justify-start items-start gap-1 inline-flex">
          <div className="justify-start items-end gap-2 inline-flex">
            <CheckedInIcon />
            <div className="text-stone-900 text-sm font-bold font-['Kumbh Sans']">John Smith</div>
          </div>
          <div className="text-sky-700 text-xs font-medium font-['Kumbh Sans']">3 Adults</div>
        </div>
        <div className="w-8 h-[18px] px-1 py-[3px] bg-orange-400 rounded-[5px] justify-center items-center gap-2.5 flex">
          <div className="text-center text-white text-[10px] font-semibold font-['Kumbh Sans']">PAID</div>
        </div>
      </div>
      <div className="flex-col justify-start items-start gap-1 flex">
        <div className="justify-start items-end inline-flex">
          <div className="w-[84px] h-3 text-stone-900 text-[10px] font-semibold font-['Kumbh Sans']">Booking via OPC</div>
          <div className="w-[131px] h-2.5 text-right text-stone-900 text-[8px] font-semibold font-['Kumbh Sans']">Commission received</div>
        </div>
        <div className="w-[215px] h-2.5 text-stone-900 text-[8px] font-normal font-['Kumbh Sans']">15 minutes ago by Jane White</div>
      </div>
      <div className="w-[215px] h-2.5 text-stone-900 text-[8px] font-semibold font-['Kumbh Sans']">Checked-in 3 minutes ago</div>
      <div className="flex-col justify-start items-start gap-[18px] flex">
        <div className="justify-start items-start gap-[7px] inline-flex">
          <CheckIn />
          <div className="w-[104px] h-8 px-[15px] py-2.5 rounded-[30px] border border-sky-700 justify-center items-center gap-2.5 flex">
            <div className="w-[86px] text-center text-stone-900 text-[10px] font-semibold font-['Kumbh Sans']">Manage</div>
          </div>
        </div>
        <div className="w-[215px] h-[0px] border border-slate-300"></div>
      </div>
    </div>
    // </div>
  )
}
