import { Fragment, useState, useEffect } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import httpClient from '../../httpClient'

// redux
import { useDispatch, useSelector } from 'react-redux';
import { updateSalesmanId } from '../../reducers/salesmanSlice'

export default function ComboBox() {
   const url = useSelector((state) => state.development.value)
   const dispatch = useDispatch()
   const [people, setPeople] = useState([])
   const [query, setQuery] = useState('')
   const [selected, setSelected] = useState({})

   useEffect(() => {
      if (selected) {
         dispatch(updateSalesmanId(selected.id))
      }
   // eslint-disable-next-line
   }, [selected])

   useEffect(() => {
      (async () => {
         try {
            const resp = await httpClient.get(`${url}:8000/salesmen/@salesmen`);
            setPeople(resp.data)
            setSelected(resp.data[0])
         } catch (error) {
            console.log("Error", error)
         }
      })();
   }, [url]);

   const filteredPeople =
      query === ''
         ? people
         :
         people.filter((person) =>
            person.first_name
               .toLowerCase()
               .replace(/\s+/g, '')
               .includes(query.toLowerCase().replace(/\s+/g, ''))
         )

   return (
      <div className="w-72">
         <Combobox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
               <div className="relative w-full cursor-default rounded-lg bg-white text-left shadow-md focus:outline-none sm:text-sm">
                  <Combobox.Input
                     className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
                     displayValue={(person) => person.first_name + " " + person.last_name}
                     onChange={(event) => setQuery(event.target.value)}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                     <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                     />
                  </Combobox.Button>
               </div>
               <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery('')}
               >
                  <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                     {filteredPeople.length === 0 && query !== '' ? (
                        <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                           Nothing found.
                        </div>
                     ) : (
                        filteredPeople.map((person) => (
                           <Combobox.Option
                              key={person.id}
                              className={({ active }) =>
                                 `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-[#0E5BB5] text-white' : 'text-gray-900'
                                 }`
                              }
                              value={person}
                           >
                              {({ selected, active }) => (
                                 <>
                                    <span
                                       className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                          }`}
                                    >
                                       {person.first_name + " " + person.last_name}
                                    </span>
                                    {selected ? (
                                       <span
                                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text[#0E5BB5]'
                                             }`}
                                       >
                                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                       </span>
                                    ) : null}
                                 </>
                              )}
                           </Combobox.Option>
                        ))
                     )}
                  </Combobox.Options>
               </Transition>
            </div>
         </Combobox>
      </div>
   )
}
