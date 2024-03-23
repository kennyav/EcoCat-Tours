import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import httpClient from '../../httpClient'

// components
import DropDownMenu from './DropDownMenu'
import RadioGroup from './RadioGroup'

const SOURCE = [{ name: 'Cash', value: 'Cash' }, { name: 'Credit Card', value: 'Credit Card' }, { name: 'Voucher', value: 'Voucher' }]
const STATUS = [{ name: 'In Full', value: 'In Full' }, { name: 'Partial Payment', value: 'Partial Payment' }, { name: 'No Payment', value: 'No Payment' }]
const RECEIVED = [{ name: 'No', value: false }, { name: 'Yes', value: true }]

export default function NewBooking(props) {
   const passengerNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   const [notes, setNotes] = useState('');
   const [email, setEmail] = useState('');
   const [adultNumber, setAdultNumber] = useState(0)
   const [childrenNumber, setChildrenNumber] = useState(0)
   const [infantNumber, setInfantNumber] = useState(0)
   const [adultPrice, setAdultPrice] = useState(0)
   const [childrenPrice, setChildrenPrice] = useState(0)
   const [infantPrice, setInfantPrice] = useState(0)
   const [shirts, setShirts] = useState(0)
   const [foodOptions, setFoodOption] = useState(0)
   const [paymentSource, setPaymentSource] = useState('')
   const [paymentStatus, setPaymentStatus] = useState('')
   const [commissionReceived, setCommissionReceived] = useState(false)
   const [bookerId, setBookerId] = useState('')
   const eventId = props.eventId
   const year = props.year
   const month = props.month
   const day = props.day
   const startTime = props.startTime


   useEffect(() => {
      (async () => {
         try {
            const resp = await httpClient.get("http://127.0.0.1:8000/auth/@me");
            console.log("User id", typeof resp.data.id)
            setBookerId(resp.data.id);
         } catch (error) {
            console.log("Not authenticated");
         }
      })();
   }, []);

   const creatingNewBooking = async () => {
      const totalPrice = (adultNumber * adultPrice) + (childrenNumber * childrenPrice) + (infantNumber * infantPrice)
      try {
         const resp = await httpClient.post("//127.0.0.1:8000/bookings/create-booking", {
            year,
            month,
            day,
            startTime,
            eventId,
            firstName,
            lastName,
            email,
            phoneNumber,
            notes,
            paymentSource,
            paymentStatus,
            commissionReceived,
            bookerId,
            adultNumber,
            childrenNumber,
            infantNumber,
            adultPrice,
            childrenPrice,
            infantPrice,
            foodOptions,
            shirts,
            totalPrice
         });
         setIsOpen(false)
         return resp
      } catch (error) {
         setIsOpen(false)
         alert("error", error)
      }
   }

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
            >
               <p className="text-white text-sm font-semibold font-['Kumbh Sans']">New Booking</p>
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
                              New Booking
                           </Dialog.Title>
                           <div>
                              <p className="text-xs text-gray-500 pb-[10px]">
                                 {props.month} {props.day}, {props.year} @ {props.startTime}
                              </p>
                           </div>

                           <div className="w-full h-[0px] border border-slate-300"></div>

                           <div className='py-[10px] flex flex-col'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Customer/Party Name *
                              </h3>
                              <div className='inline-flex gap-1'>
                                 <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className='border rounded-[10px] p-2' placeholder='First Name' />
                                 <input value={lastName} onChange={(e) => setLastName(e.target.value)} className='border rounded-[10px] p-2' placeholder='Last Name' />
                              </div>
                           </div>

                           <div className='py-[10px] flex flex-col'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Contact Information *
                              </h3>
                              <div className='inline-flex gap-1'>
                                 <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='border rounded-[10px] p-2' placeholder='Email Address' />
                                 <input type='tel' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className='border rounded-[10px] p-2' placeholder='Phone Number' />
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
                                    <input value={adultPrice} onChange={(e) => setAdultPrice(parseInt(e.target.value) || 0)} className='border rounded-[10px] p-2' placeholder='Price' />
                                 </div>
                                 <div className='inline-flex justify-between gap-1 items-center'>
                                    <DropDownMenu list={passengerNumbers} setCurrent={setChildrenNumber} current={childrenNumber} />
                                    <div>
                                       <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>Children</h1>
                                       <h1 className='text-xs text-left font-light text-gray-900'>Ages 5-11</h1>
                                    </div>
                                    <input value={childrenPrice} onChange={(e) => setChildrenPrice(parseInt(e.target.value) || 0)} className='border rounded-[10px] p-2' placeholder='Price' />
                                 </div>
                                 <div className='inline-flex justify-between gap-1 items-center'>
                                    <DropDownMenu list={passengerNumbers} setCurrent={setInfantNumber} current={infantNumber} />
                                    <div>
                                       <h1 className='text-sm text-left font-medium leading-6 text-gray-900'>Infant</h1>
                                       <h1 className='text-xs text-left font-light text-gray-900'>Ages 0-4</h1>
                                    </div>
                                    <input value={infantPrice} onChange={(e) => setInfantPrice(parseInt(e.target.value) || 0)} className='border rounded-[10px] p-2' placeholder='Price' />
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
                              <RadioGroup label={"Payment Source*"} plans={SOURCE} setCurrent={setPaymentSource} />
                              <RadioGroup label={"Payment Status*"} plans={STATUS} setCurrent={setPaymentStatus} />
                              <RadioGroup label={"Commission Recieved*"} plans={RECEIVED} setCurrent={setCommissionReceived} />
                           </div>


                           {/* Reservation Notes section*/}
                           <div className='py-[10px] flex flex-col'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Reservation Notes
                              </h3>
                              <input value={notes} onChange={(e) => setNotes(e.target.value)} className='border rounded-[10px] p-2 h-32' />
                           </div>



                           <div className="mt-4">
                              <button
                                 type="button"
                                 className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                 onClick={() => creatingNewBooking()}
                              >
                                 Create
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
