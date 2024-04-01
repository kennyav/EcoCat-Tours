import React, { useEffect, useState } from 'react'
import httpClient from '../../httpClient'
import moment from 'moment'
import { useSelector } from 'react-redux'

//icons
import { CheckedInIcon } from '../Icons'

// modal
import CheckIn from './CheckIn'
import ManagePassengers from './ManagePassengers'

export default function GuestInfo(props) {
  const url = useSelector((state) => state.development.value)
  const p = props.passenger

  const [booker, setBooker] = useState({
    id: "",
    email: ""
  })

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get(`${url}:8000/auth/${p.booker_id}`);
        console.log(resp.data)
        setBooker(resp.data)
      } catch (error) {
        console.log("Error", error)
      }
    })();
  }, [])

  // 2024-03-28 20:47:39

  return (
    <div className="flex-col p-7 justify-start items-start gap-[9px] inline-flex border-b">
      <div className="justify-start items-start gap-1 inline-flex">
        <div className="w-[179px] flex-col justify-start items-start gap-1 inline-flex">
          <div className="justify-start items-end gap-2 inline-flex">
           {p.checked_in && <CheckedInIcon/>}
            <div className="text-stone-900 text-sm font-bold font-['Kumbh Sans']">{p.first_name} {p.last_name}</div>
          </div>
          {p.adult_passengers ? <div className="text-sky-700 text-xs font-medium font-['Kumbh Sans']">{p.adult_passengers} Adult{p.adult_passengers > 1 ? 's' : ''}</div> : <div></div>}
          {p.children_passengers ? <div className="text-sky-700 text-xs font-medium font-['Kumbh Sans']">{p.children_passengers} Child{p.children_passengers > 1 ? 'ren' : ''}</div> : <div></div>}
          {p.infant_passengers ? <div className="text-sky-700 text-xs font-medium font-['Kumbh Sans']">{p.infant_passengers} Infant{p.infant_passengers > 1 ? 's' : ''}</div> : <div></div>}
        </div>
        <div className={`px-1 py-[3px] ${p.payment_type === "Cash" ? "bg-yellow-400" : (p.payment_type === "Credit Card" ? "bg-pink-400" : "bg-orange-400")} rounded-[5px] justify-center items-center gap-2.5 flex`}>
          <div className="text-center text-white text-[10px] font-semibold font-['Kumbh Sans']">{p.payment_status}</div>
        </div>
      </div>
      <div className="flex-col justify-start items-start gap-1 flex">
        <div className="flex w-full justify-between items-center">
          <div className="text-stone-900 text-[10px] font-semibold font-['Kumbh Sans']">Booking In Person</div>
          <div className="text-right text-stone-900 text-[8px] font-semibold font-['Kumbh Sans']">{p.commission_received ? "Commission received" : ""}</div>
        </div>
        <div className="w-[215px] h-2.5 text-stone-900 text-[8px] font-normal font-['Kumbh Sans']">{moment(p.created_at, "yyyy-MM-DD HH:mm:ss").fromNow()} by {booker.first_name} {booker.last_name}</div>
      </div>
      <div className="w-[215px] h-2.5 text-stone-900 text-[8px] font-semibold font-['Kumbh Sans']"> {p.checked_in && "Checked In"}</div>
      <div className="flex-col justify-start items-start gap-[18px] flex">
        <div className="justify-start items-start gap-[7px] inline-flex">
          <CheckIn passenger={p}/>
          <div className="w-[104px] h-8 px-[15px] py-2.5 rounded-[30px] border border-sky-700 justify-center items-center gap-2.5 flex">
            <ManagePassengers passenger={p} />
          </div>
        </div>
      </div>
    </div>
  )
}
