import { useState } from 'react'
import { Tab } from '@headlessui/react'

// components
import AddSalesMan from '../SalesmanComponents/AddSalesMan'
import ComboBox from './ComboBox'

function classNames(...classes) {
   return classes.filter(Boolean).join(' ')
}

export default function Tabs({ selected, setSelected }) {
   const toggle = false
   let [categories] = useState({
      Attach: [
         {
            id: 1,
            display: () => {
               return (
                  <div>
                     <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                        Attach a Salesman
                     </h3>
                     <ComboBox selected={selected} setSelected={setSelected} />
                  </div>
               )
            },
         }
      ],
      Create: [
         {
            id: 1,
            display: () => {
               return (
                  <AddSalesMan toggle={toggle}/>
               )
            },
         }
      ],
   })

   return (
      <div className="w-full max-w-full px-2 sm:px-0">
         <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
               {Object.keys(categories).map((category) => (
                  <Tab
                     key={category}
                     className={({ selected }) =>
                        classNames(
                           'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                           'ring-offset-[#0E5BB5] focus:outline-none focus:ring-2',
                           selected
                              ? 'bg-white text-black shadow'
                              : 'text-black hover:bg-white/[0.12] hover:text-white'
                        )
                     }
                  >
                     {category}
                  </Tab>
               ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
               {Object.values(categories).map((posts, idx) => (
                  <Tab.Panel
                     key={idx}
                     className={classNames(
                        'rounded-xl bg-[#F2F8FC] p-3',
                        'border'
                     )}
                  >
                     <ul>
                        {posts.map((post) => (
                           <li
                              key={post.id}
                              className="relative p-1"
                           >
                              <h3 className="text-sm font-medium leading-5">
                                 {post.title}
                              </h3>

                              {post.display()}
                           </li>
                        ))}
                     </ul>
                  </Tab.Panel>
               ))}
            </Tab.Panels>
         </Tab.Group>
      </div>
   )
}
