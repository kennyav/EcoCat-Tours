import { useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'

export default function RadioGroupComponent(props) {
   const index = () => {
      const i = props.plans.findIndex(item => item.value === props.name);
      return i !== -1 ? i : 0
   }
   
   const [selected, setSelected] = useState(props.plans[index()])
   const setFunctionTest = props.setCurrent
   
   useEffect(() => {
      setFunctionTest(selected.value);
   }, [selected.value]);

   return (
      <div className="w-full px-4 py-16">
         <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
            {props.label}
         </h3>
         <div className="mx-auto w-full max-w-md">
            <RadioGroup value={selected} onChange={setSelected}>
               <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
               <div className="space-y-2">
                  {props.plans.map((plan) => (
                     <RadioGroup.Option
                        disabled={props.disabled}
                        key={plan.name}
                        value={plan}
                        className={({ active, checked }) =>
                           `${active
                              ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-[#0E5BB5]'
                              : ''
                           }
                  ${checked ? 'bg-[#0E5BB5] text-white' : 'bg-white'}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                        }
                     >
                        {({ active, checked }) => (
                           <>
                              <div className="flex w-full items-center justify-between">
                                 <div className="flex items-center">
                                    <div className="text-sm">
                                       <RadioGroup.Label
                                          as="p"
                                          className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'
                                             }`}
                                       >
                                          {plan.name}
                                       </RadioGroup.Label>
                                    </div>
                                 </div>
                                 {checked && (
                                    <div className="shrink-0 text-white">
                                       <CheckIcon className="h-6 w-6" />
                                    </div>
                                 )}
                              </div>
                           </>
                        )}
                     </RadioGroup.Option>
                  ))}
               </div>
            </RadioGroup>
         </div>
      </div>
   )
}

function CheckIcon(props) {
   return (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
         <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
         <path
            d="M7 13l3 3 7-7"
            stroke="#fff"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </svg>
   )
}
