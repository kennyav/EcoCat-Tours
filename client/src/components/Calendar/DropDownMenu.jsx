import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { CalendarDownIcon } from '../Icons';

export default function DropDownMenu(props) {

   function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
   }


   return (
      <Menu as="div" className="relative inline-block text-left">
         <div>
            <Menu.Button className="flex items-center gap-6 bg-transparent hover:bg-[#0E5BB5] hover:text-white py-2.5 px-8 border-2 border-[#0E5BB5] hover:border-transparent rounded-full">
               {props.current}
               <CalendarDownIcon />
            </Menu.Button>
         </div>

         <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
         >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
               <div className="py-1">
                  {props.list.map((curr, i) => {
                     return (
                        <Menu.Item key={i}>
                           {({ active }) => (
                              <span
                                 key={curr}
                                 onClick={() => props.setCurrent(curr)}
                                 className={classNames(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block px-4 py-2 text-sm'
                                 )}
                              >
                                 {curr}
                              </span>
                           )}
                        </Menu.Item>
                     )
                  })}
               </div>
            </Menu.Items>
         </Transition>
      </Menu>
   )
}