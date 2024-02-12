import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

// components
import DropDownMenu from './DropDownMenu'
import RadioGroup from './RadioGroup'

const SOURCE = [{ name: 'Cash', }, { name: 'Credit Card', }, { name: 'Voucher', }]
const STATUS = [{ name: 'In Full', }, { name: 'Partial Payment', }, { name: 'No Payment', }]
const RECEIVED = [{ name: 'No' }, { name: 'Yes' }]

export default function CheckIn(props) {
   const passengerNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
   const [adultNumber, setAdultNumber] = useState(0)
   const [childrenNumber, setChildrenNumber] = useState(0)
   const [infantNumber, setInfantNumber] = useState(0)
   const [shirts, setShirts] = useState(0)
   const [foodOptions, setFoodOption] = useState(0)

   let [isOpen, setIsOpen] = useState(false)

   function closeModal() {
      setIsOpen(false)
   }

   function openModal() {
      setIsOpen(true)
   }

   return (
      <>
         <div>
            <button
               type="button"
               onClick={openModal}
               className="w-[104px] h-8 px-[15px] py-2.5 bg-sky-700 rounded-[30px] justify-center items-center gap-2.5 flex"
            >
               <p className="w-[86px] text-center text-white text-[10px] font-semibold font-['Kumbh Sans']">Check In</p>
            </button>
         </div>

         <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
               <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
               >
                  <div className="fixed inset-0 bg-black/25" />
               </Transition.Child>

               <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                     <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                     >
                        <Dialog.Panel className="w-full max-w-screen-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                           <Dialog.Title
                              as="h3"
                              className="text-lg font-medium leading-6 text-gray-900"
                           >
                              John Smith
                           </Dialog.Title>
                           <div>
                              <p className="text-xs text-gray-500 pb-[10px]">
                                 Thursday, Febuary 8 2024 @ 1pm
                              </p>
                           </div>

                           <div class="w-full h-[0px] border border-slate-300"></div>

                           <div className='py-[10px] flex flex-col'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Customer Name *
                              </h3>
                              <div className='inline-flex gap-1'>
                                 <input className='border rounded-[10px] p-2' placeholder='First Name' />
                                 <input className='border rounded-[10px] p-2' placeholder='Last Name' />
                              </div>
                           </div>

                           <div className='py-[10px] flex flex-col'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Contact Information *
                              </h3>
                              <div className='inline-flex gap-1'>
                                 <input className='border rounded-[10px] p-2' placeholder='Email Address' />
                                 <input className='border rounded-[10px] p-2' placeholder='Phone Number' />
                              </div>
                           </div>


                           {/* Number of Passenger section*/}
                           <div className='py-[10px] flex flex-col'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Passengers *
                              </h3>
                              <div className='flex flex-col gap-2'>
                                 <div className='inline-flex justify-between gap-1 items-center'>
                                    <DropDownMenu list={passengerNumbers} setCurrent={setAdultNumber} current={adultNumber} />
                                    <div>
                                       <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>Adults</h1>
                                       <h1 className='text-xs text-left font-light text-gray-900'>Ages 12+</h1>
                                    </div>
                                    <input className='border rounded-[10px] p-2' placeholder='Price' />
                                 </div>
                                 <div className='inline-flex justify-between gap-1 items-center'>
                                    <DropDownMenu list={passengerNumbers} setCurrent={setChildrenNumber} current={childrenNumber} />
                                    <div>
                                       <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>Children</h1>
                                       <h1 className='text-xs text-left font-light text-gray-900'>Ages 5-11</h1>
                                    </div>
                                    <input className='border rounded-[10px] p-2' placeholder='Price' />
                                 </div>
                                 <div className='inline-flex justify-between gap-1 items-center'>
                                    <DropDownMenu list={passengerNumbers} setCurrent={setInfantNumber} current={infantNumber} />
                                    <div>
                                       <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>Infant</h1>
                                       <h1 className='text-xs text-left font-light text-gray-900'>Ages 0-4</h1>
                                    </div>
                                    <input className='border rounded-[10px] p-2' placeholder='Price' />
                                 </div>
                              </div>
                           </div>

                           {/* Booking Addition section*/}
                           <div className='py-[10px] flex flex-col'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Booking Additions
                              </h3>
                              <div className='inline-flex justify-between gap-2'>
                                 <DropDownMenu list={passengerNumbers} setCurrent={setShirts} current={shirts} />
                                 <div>
                                    <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>If you would like to purchase an EcoCat T-Shirt, select how many shirts you want. (Pick-up at check-in)</h1>
                                    <h1 className='text-xs text-left font-light text-gray-900'>$19.99</h1>
                                 </div>
                              </div>
                              <div className='inline-flex justify-between gap-2'>
                                 <DropDownMenu list={passengerNumbers} setCurrent={setFoodOption} current={foodOptions} />
                                 <div>
                                    <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>(FOOD OPTION) Select how many people want to upgrade to include our BBQ Hamburgers [NOTE: Base ticket does not include food. Please select this option if you wish to eat onboard!]</h1>
                                    <h1 className='text-xs text-left font-light text-gray-900'>$9.99</h1>
                                 </div>
                              </div>
                           </div>
                           <div className='inline-flex w-full justify-between'>
                              <RadioGroup label={"Payment Source*"} plans={SOURCE} />
                              <RadioGroup label={"Payment Status*"} plans={STATUS} />
                              <RadioGroup label={"Commission Recieved*"} plans={RECEIVED} />
                           </div>


                           {/* Reservation Notes section*/}
                           <div className='py-[10px] flex flex-col'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Reservation Notes
                              </h3>
                              <input className='border rounded-[10px] p-2 h-32'/>
                           </div>



                           <div className="mt-4">
                              <button
                                 type="button"
                                 className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                 onClick={closeModal}
                              >
                                 CheckIn
                              </button>
                           </div>
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </Dialog>
         </Transition>
      </>
   )
}
