import React from 'react'

//icons
import { CheckedInIcon } from '../Icons'

// modal
import CheckIn from './CheckIn'

export default function GuestInfo(props) {
  return (
    // <div class="w-full h-[149px] pl-[26px] pt-[30px] justify-center items-center inline-flex">
    <div class="flex-col  pl-[26px] pt-[30px] justify-start items-start gap-[9px] inline-flex">
      <div class="justify-start items-start gap-1 inline-flex">
        <div class="w-[179px] flex-col justify-start items-start gap-1 inline-flex">
          <div class="justify-start items-end gap-2 inline-flex">
            <CheckedInIcon />
            <div class="text-stone-900 text-sm font-bold font-['Kumbh Sans']">John Smith</div>
          </div>
          <div class="text-sky-700 text-xs font-medium font-['Kumbh Sans']">3 Adults</div>
        </div>
        <div class="w-8 h-[18px] px-1 py-[3px] bg-orange-400 rounded-[5px] justify-center items-center gap-2.5 flex">
          <div class="text-center text-white text-[10px] font-semibold font-['Kumbh Sans']">PAID</div>
        </div>
      </div>
      <div class="flex-col justify-start items-start gap-1 flex">
        <div class="justify-start items-end inline-flex">
          <div class="w-[84px] h-3 text-stone-900 text-[10px] font-semibold font-['Kumbh Sans']">Booking via OPC</div>
          <div class="w-[131px] h-2.5 text-right text-stone-900 text-[8px] font-semibold font-['Kumbh Sans']">Commission received</div>
        </div>
        <div class="w-[215px] h-2.5 text-stone-900 text-[8px] font-normal font-['Kumbh Sans']">15 minutes ago by Jane White</div>
      </div>
      <div class="w-[215px] h-2.5 text-stone-900 text-[8px] font-semibold font-['Kumbh Sans']">Checked-in 3 minutes ago</div>
      <div class="flex-col justify-start items-start gap-[18px] flex">
        <div class="justify-start items-start gap-[7px] inline-flex">
          <CheckIn />
          <div class="w-[104px] h-8 px-[15px] py-2.5 rounded-[30px] border border-sky-700 justify-center items-center gap-2.5 flex">
            <div class="w-[86px] text-center text-stone-900 text-[10px] font-semibold font-['Kumbh Sans']">Manage</div>
          </div>
        </div>
        <div class="w-[215px] h-[0px] border border-slate-300"></div>
      </div>
    </div>
    // </div>
  )
}
