import { Menu } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { updateDateView } from '../../reducers/dateViewSlice'

export default function BasicDropDown({ list }) {
   const dispatch = useDispatch()
   const view = useSelector((state) => state.dateView.value)

   return (
      <Menu>
         <Menu.Button className='bg-gray-200 p-2 w-[75px] rounded-[15px] hover:bg-[#C4D2DC]'>{view}</Menu.Button>
         <Menu.Items>
            {list.map(item => {
               return (
                  <Menu.Item key={item}>
                     {({ active, idx }) => (
                        <button
                           key={idx}
                           className={`${active && 'bg-[#0E5BB5] rounded-[15px] text-white'} p-2`}
                           onClick={() => dispatch(updateDateView(item))}
                        >
                           {item}
                        </button>
                     )}
                  </Menu.Item>
               )
            })

            }
         </Menu.Items>
      </Menu>
   )
}