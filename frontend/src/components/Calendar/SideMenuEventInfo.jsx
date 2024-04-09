import React, { useState, useEffect } from 'react'
import httpClient from '../../httpClient'

// loader
import { quantum } from 'ldrs'

// component
import GuestInfo from './GuestInfo'
import DropDownMenu from './DropDownMenu'
import { SideMenuExpandLeft, SideMenuExpandRight } from '../Icons'
import moment from 'moment'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { updateSideMenu } from '../../reducers/sideMenuSlice'

// constants
const FILTERS = ["Checked-In", "Most Recent", "Least Recent"]

export default function EventInfo(props) {
  // redux
  const dispatch = useDispatch()
  const openedFull = useSelector((state) => state.sideMenu.value)
  const url = useSelector((state) => state.development.value)
  const refresh = useSelector((state) => state.refresh.value)
  const getPassengerURL = `${url}:8000/bookings/${props.ev.id}`

  // props
  const event = props.ev.eventInfo
  const date = moment.utc(props.ev.date)
  const [passengers, setPassengers] = useState([])

  // handling render
  quantum.register()
  const [loading, setLoading] = useState(false)
  const [hidden, setHidden] = useState(false)
  const eventTimeInfo = date.month ? `${date.format("MMMM")} ${date.day()}, ${date.year()} @ ${date.format("hh:mm")}` : 'No Event Selected'
  const [filter, setFilter] = useState({
    name: FILTERS[2],
    index: -1
  })
  const [title, setTitle] = useState()

  useEffect(() => {
    setTitle(event.title)
  }, [event, refresh])

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

  // get passengers
  useEffect(() => {
    if (props.ev.id) {
      (async () => {
        // first clear passenger cache
        setPassengers([])

        try {
          setLoading(true)
          const resp = await httpClient.get(getPassengerURL);
          setPassengers(sortPassengers(resp.data, filter.name))
        } catch (error) {
          console.log(error, "Could not fetch passengers")
        } finally {
          setLoading(false)
        }
      })();
    }
  }, [refresh, getPassengerURL])



  // useEffect for setting hidden after the animation
  useEffect(() => {
    if (openedFull) {
      // If openedFulledFull is true, set a timeout to hide the component after animation duration
      setHidden(true)
      setLoading(true)

      const timeout = setTimeout(() => {
        setLoading(false)
        setHidden(false);
      }, 500); // Assuming the duration is 500 milliseconds

      // Clear timeout on component unmount or if openedFulledFull becomes false before the timeout completes
      return () => clearTimeout(timeout);
    } else {
      // If not openedFulledFull, make sure the component is not hidden
      setHidden(false);
    }
  }, [openedFull]);


  // takes in the event information and displays it in the column
  return (
    <div className={`px-4 py-5`}>
      <div className="flex flex-col gap-1 items-start text-stone-900 text-xl font-bold">
        {openedFull ?
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
        <div className='flex flex-col'>
          {title}
          <p className="text-stone-900 text-[10px] font-normal">{eventTimeInfo}</p>
        </div>
      </div>
      <div className="flex items-center text-stone-900 text-[10px] font-normal pb-[14px] gap-1 border-b">
        <DropDownMenu list={FILTERS} setCurrent={setFilter} current={filter.name} />
      </div>

      {loading ?
        <div className="flex justify-center items-center lg:h-[400px] md:h-[200px] h-[100px]">
          <l-quantum
            size="100"
            speed="1.75"
            color="black"
          />
        </div>
        :
        <div className={`${openedFull ? 'grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 grid-row-flow' : 'flex flex-col'} ${hidden ? 'hidden' : ''} gap-1 p-1`} >
          {passengers && passengers.map((passenger) => {
            return (
              <div key={passenger.id} className="bg-[#C4D2DC] rounded-[25px] w-full">
                <GuestInfo key={passenger.id} passenger={passenger} />
              </div>
            )
          })}
        </div>
      }
    </div >
  )
}
