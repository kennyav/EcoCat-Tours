import React, { useState, useEffect } from 'react'

// component
import GuestInfo from './GuestInfo'
import DropDownMenu from './DropDownMenu'
import { SideMenuExpandLeft, SideMenuExpandRight } from '../Icons'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { updateSideMenu } from '../../reducers/sideMenuSlice'

const FILTERS = ["Checked-In", "Most Recent", "Least Recent"]
export default function EventInfo(props) {

  // redux
  const dispatch = useDispatch()
  const open = useSelector((state) => state.sideMenu.value)
  const event = props.ev.eventInfo
  const date = props.ev.date
  const passengers = props.ev.passengerInfo
  const eventTimeInfo = date.month ? `${date.month} ${date.day}, ${date.year} @ ${date.time}` : 'No Event Selected'
  const [filter, setFilter] = useState({
    name: FILTERS[2],
    index: -1
  })
  const [title, setTitle] = useState()


  useEffect(() => {
    setTitle(event.title)
  }, [event])

  // Function to sort passengers based on selected filter
  const sortPassengers = (passengers, filter) => {
    switch (filter) {
      case "Checked-In":
        return [...passengers].sort((a, b) => (a.checked_in === b.checked_in) ? 0 : a.checked_in ? -1 : 1);
      case "Most Recent":
        return [...passengers].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      case "Least Recent":
        return passengers;
      default:
        return passengers;
    }
  };

  const filteredPassengers = passengers ? sortPassengers(passengers, filter.name) : [];


  // takes in the event information and displays it in the column
  return (
    <div className={`flex flex-col w-[272px] min-h-full h-auto font-['Kumbh Sans'] rounded-l-[25px] bg-white`} >
      <div className='flex flex-col pl-[26px] py-[30px] border-b'>
        <div className="flex items-center text-stone-900 text-xl font-bold">
          {open ?
            <div
              onClick={() => dispatch(updateSideMenu(false))}
              className="w-6 h-6 hover:text-[#0e88b5] hover:cursor-pointer hover:bg-black rounded-full text-gray-800 dark:text-white">
              <SideMenuExpandRight />
            </div>
            :
            <div
              onClick={() => dispatch(updateSideMenu(true))}
              className="w-6 h-6 hover:text-[#0e88b5] hover:cursor-pointer hover:bg-black rounded-full text-gray-800 dark:text-white">
              <SideMenuExpandLeft />
            </div>

          }
          {title}
        </div>
        <div className="text-stone-900 text-[10px] font-normal pb-[14px] ">{eventTimeInfo}</div>
        <DropDownMenu list={FILTERS} setCurrent={setFilter} current={filter.name} />
      </div>
      {filteredPassengers && filteredPassengers.map((passenger) => {
        return <GuestInfo key={passenger.id} passenger={passenger} />
      })}
    </div >
  )
}
