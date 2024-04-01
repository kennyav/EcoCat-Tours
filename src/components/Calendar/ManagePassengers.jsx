import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import httpClient from '../../httpClient'
import moment from 'moment'
import { printBoardingPass } from '../../helper/boardingPass'
import { useSelector } from 'react-redux'
import RadioGroup from './RadioGroup'

const SOURCE = [{ name: 'Cash', value: 'Cash' }, { name: 'Credit Card', value: 'Credit Card' }, { name: 'Voucher', value: 'Voucher' }]
const STATUS = [{ name: 'In Full', value: 'In Full' }, { name: 'Partial Payment', value: 'Partial Payment' }, { name: 'No Payment', value: 'No Payment' }]
const RECEIVED = [{ name: 'No', value: false }, { name: 'Yes', value: true }]


// components
export default function ManagePassengers(props) {
   const url = useSelector((state) => state.development.value)
   const p = props.passenger
   let [isOpen, setIsOpen] = useState(false)
   const [openDelete, setOpenDelete] = useState(false)
   const [edit, setEdit] = useState(false)
   const [firstName, setFirstName] = useState(p.first_name);
   const [lastName, setLastName] = useState(p.last_name);
   const [phoneNumber, setPhoneNumber] = useState(p.phone);
   const [email, setEmail] = useState(p.email);
   const [adultNumber, setAdultNumber] = useState(p.adult_passengers)
   const [childrenNumber, setChildrenNumber] = useState(p.children_passengers)
   const [infantNumber, setInfantNumber] = useState(p.infant_passengers)
   const [adultPrice, setAdultPrice] = useState(p.adult_price)
   const [childrenPrice, setChildrenPrice] = useState(p.children_price)
   const [infantPrice, setInfantPrice] = useState(p.infant_price)
   const [paymentSource, setPaymentSource] = useState(p.payment_source)
   const [paymentStatus, setPaymentStatus] = useState(p.payment_status)
   const [commissionReceived, setCommissionReceived] = useState(p.commission_received)
   const [notes, setNotes] = useState(p.notes)
   const numberOfPassengers = p.adult_passengers + p.children_passengers + p.infant_passengers;

   const deletePassenger = async () => {
      try {
         const resp = await httpClient.delete(`${url}:8000/bookings/delete/${p.id}`)
         console.log(resp.data)
      } catch (error) {
         console.log("Error", error)
      }

      closeModal()
   }

   const editPassenger = async () => {
      try {
         const resp = await httpClient.put(`${url}:8000/bookings/edit-passenger/${p.id}`,{
            firstName,
            lastName,
            phoneNumber,
            email,
            adultNumber,
            adultPrice,
            childrenNumber,
            childrenPrice,
            infantNumber,
            infantPrice,
            paymentSource,
            paymentStatus,
            commissionReceived,
            notes
         })
         console.log(resp.data)
      } catch (error) {
         console.log("Error", error)
      }

      closeModal()
   }

   function closeModal() {
      setOpenDelete(false)
      setEdit(false)
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
               className="w-[104px] h-8 px-[15px] py-2.5 border-bg-sky-700 rounded-[30px] justify-center items-center gap-2.5 flex hover:shadow-md"
            >
               <p className="w-[86px] text-center text-sky-700 text-[10px] font-semibold font-['Kumbh Sans']">Manage</p>
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
                              {props.passenger.first_name} {props.passenger.last_name}
                           </Dialog.Title>
                           <div>
                              <p className="text-xs text-gray-500 pb-[10px]">
                                 {moment().format('dddd, MMMM Do YYYY')}
                              </p>
                           </div>

                           <div className="w-full h-[0px] border border-slate-300"></div>

                           <div className='py-[10px] flex flex-col'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Customer Name
                              </h3>
                              <div className='inline-flex gap-12'>
                                 <input disabled={!edit} value={firstName} onChange={(e) => setFirstName(e.target.value)} className='border rounded-[10px] p-2' />
                                 <input disabled={!edit} value={lastName} onChange={(e) => setLastName(e.target.value)} className='border rounded-[10px] p-2' />
                              </div>
                           </div>


                           {/* Contact Information Section */}
                           <div className='py-[10px] flex flex-col'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Contact Information
                              </h3>
                              <div className='flex gap-1'>
                                 <input disabled={!edit} value={email} onChange={(e) => setEmail(e.target.value)} className='border rounded-[10px] p-2 w-1/3' />
                                 <input disabled={!edit} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className='border rounded-[10px] p-2' />
                              </div>
                           </div>


                           {/* Number of Passenger section*/}
                           <div className='py-[10px] grid grid-rows-4 grid-flow-col gap-4'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Passengers
                              </h3>
                              <input disabled={!edit} value={adultNumber} onChange={(e) => setAdultNumber(e.target.value)} className='border-2 border-[#0E5BB5] rounded-lg px-5 py-2' />
                              <input disabled={!edit} value={childrenNumber} onChange={(e) => setChildrenNumber(e.target.value)} className='border-2 border-[#0E5BB5] rounded-lg px-5 py-2' />
                              <input disabled={!edit} value={infantNumber} onChange={(e) => setInfantNumber(e.target.value)} className='border-2 border-[#0E5BB5] rounded-lg px-5 py-2' />
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Prices
                              </h3>
                              <input disabled={!edit} value={adultPrice} onChange={(e) => setAdultPrice(e.target.value)} className='border-2 border-[#0E5BB5] rounded-lg px-5 py-2' />
                              <input disabled={!edit} value={childrenPrice} onChange={(e) => setChildrenPrice(e.target.value)} className='border-2 border-[#0E5BB5] rounded-lg px-5 py-2' />
                              <input disabled={!edit} value={infantPrice} onChange={(e) => setInfantPrice(e.target.value)} className='border-2 border-[#0E5BB5] rounded-lg px-5 py-2' />
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Category
                              </h3>
                              <div className="flex flex-col">
                                 <h1 className='text-sm text-gray-900'>Adult</h1>
                                 <p className='text-xs text-gray-900'>Ages 12+</p>
                              </div>
                              <div className="flex flex-col">
                                 <h1 className='text-sm text-gray-900'>Children</h1>
                                 <p className='text-xs text-gray-900'>Ages 5-11</p>
                              </div>
                              <div className="flex flex-col">
                                 <h1 className='text-sm text-gray-900'>Infants</h1>
                                 <p className='text-xs text-gray-900'>Ages 0-4</p>
                              </div>
                           </div>

                           <div className='inline-flex w-full justify-between'>
                              <RadioGroup disabled={!edit} label={"Payment Source*"} plans={SOURCE} setCurrent={setPaymentSource} name={paymentSource} />
                              <RadioGroup disabled={!edit} label={"Payment Status*"} plans={STATUS} setCurrent={setPaymentStatus} name={paymentStatus}/>
                              <RadioGroup disabled={!edit} label={"Commission Recieved*"} plans={RECEIVED} setCurrent={setCommissionReceived} name={commissionReceived}/>
                           </div>

                           <div className='py-[10px] flex flex-col'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Reservation Notes
                              </h3>
                              <textarea disabled={!edit} rows={5} value={notes} onChange={(e) => setNotes(e.target.value)} className='border rounded-[10px] p-2' />
                           </div>


                           <div className="flex justify-between mt-4">
                              <div>
                                 <button
                                    className={`inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${edit ? 'hidden' : ''}`}
                                    onClick={() => setEdit(true)}
                                 >
                                    Edit
                                 </button>

                                 <button
                                    className={`inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${!edit ? 'hidden' : ''}`}
                                    onClick={() => editPassenger()}
                                 >
                                    Save
                                 </button>
                              </div>
                              <button
                                 className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-black hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                 onClick={() => setOpenDelete(true)}
                              >
                                 Delete
                              </button>
                              <button
                                 className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                 onClick={() => closeModal()}
                              >
                                 Cancel
                              </button>
                           </div>
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </Dialog>
         </Transition >

         <Transition appear show={openDelete} as={Fragment}>
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
                              className="text-lg font-medium leading-6 text-gray-900 text-center"
                           >
                              Confirm Passenger Deletion
                           </Dialog.Title>

                           <div className="inline-flex mt-4 w-full justify-between">
                              <button
                                 type="button"
                                 className="inline-flex justify-center rounded-md border-2 border-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                 onClick={() => setOpenDelete(false)}
                              >
                                 Cancel
                              </button>
                              <button
                                 type="button"
                                 className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-black hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                 onClick={() => deletePassenger()}
                              >
                                 Delete
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
