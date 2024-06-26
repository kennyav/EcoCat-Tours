import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

// icons
import { EmptyProfileIcon } from '../Icons'
import httpClient from '../../httpClient';
import { useSelector } from 'react-redux';

export default function UserMenu() {

   const url = useSelector((state) => state.development.value)
   const logoutUser = async () => {
      await httpClient.post(`${url}/auth/logout`);
      window.location.href = "/login";
    };


   return (
      <div>
         <Menu as="div" className="relative inline-block text-left">
            <div>
               <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                  <EmptyProfileIcon />
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
               <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="px-1 py-1">
                     <Menu.Item>
                        {({ active }) => (
                           <button
                              onClick={() => logoutUser()}
                              className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                 } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                           >
                              {active ? (
                                 <DeleteActiveIcon
                                    className="mr-2 h-5 w-5 text-blue-400"
                                    aria-hidden="true"
                                 />
                              ) : (
                                 <DeleteInactiveIcon
                                    className="mr-2 h-5 w-5 text-blue-400"
                                    aria-hidden="true"
                                 />
                              )}
                              Logout
                           </button>
                        )}
                     </Menu.Item>
                  </div>
               </Menu.Items>
            </Transition>
         </Menu>
      </div>
   )
}


function DeleteInactiveIcon(props) {
   return (
      <svg
         {...props}
         viewBox="0 0 20 20"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <rect
            x="5"
            y="6"
            width="10"
            height="10"
            fill="#EDE9FE"
            stroke="#0E5BB5"
            strokeWidth="2"
         />
         <path d="M3 6H17" stroke="#0E5BB5" strokeWidth="2" />
         <path d="M8 6V4H12V6" stroke="#0E5BB5" strokeWidth="2" />
      </svg>
   )
}

function DeleteActiveIcon(props) {
   return (
      <svg
         {...props}
         viewBox="0 0 20 20"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <rect
            x="5"
            y="6"
            width="10"
            height="10"
            fill="#0E5BB5"
            stroke="#2766ae"
            strokeWidth="2"
         />
         <path d="M3 6H17" stroke="#3384e2" strokeWidth="2" />
         <path d="M8 6V4H12V6" stroke="#3384e2" strokeWidth="2" />
      </svg>
   )
}
