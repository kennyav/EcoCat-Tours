import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import httpClient from '../../httpClient'
import { useSelector } from 'react-redux'

// components
import { TransactionOptionsIcon } from '../Icons'

export default function SalesmanInfo(props) {
   const url = useSelector((state) => state.development.value)
   const [isOpen, setIsOpen] = useState(false)
   const [firstName, setFirstName] = useState(props.person.first_name)
   const [lastName, setLastName] = useState(props.person.last_name)
   const [email, setEmail] = useState(props.person.email)
   const [phone, setPhone] = useState(props.person.phone)
   const [notes, setNotes] = useState(props.person.notes)
   const [edit, setEdit] = useState(false)

   const salesmenId = props.person.id
   let editSalesmenURL = `${url}:8000/salesmen/edit-salesmen/` + salesmenId
   let deleteSalesmanURL = `${url}:8000/salesmen/delete/` + salesmenId

   const closeModal = async () => {
      try {
         const resp = await httpClient.put(editSalesmenURL, {
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'phone': phone,
            'notes': notes
         });
         setIsOpen(false)
         return resp.data
      } catch (error) {
         setIsOpen(false)
         throw new Error('Failed to update salesmen');
      }
   }


   const deleteSalesman = async () => {
      try {
         const resp = await httpClient.delete(deleteSalesmanURL)
         setIsOpen(false)
         return resp.data
      } catch (error) {
         setIsOpen(false)
         throw new Error('Failed to delete salesman')
      }
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
               className="flex w-[86px] hover:bg-[#0E5BB5] hover:shadow-lg rounded-full py-[8px] justify-center items-center"
            >
               <TransactionOptionsIcon />
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
                              {props.person.first_name} {props.person.last_name}
                           </Dialog.Title>
                           <div>
                              <p className="text-xs text-gray-500 pb-[10px]">
                                 Created on {props.person.date}
                              </p>
                           </div>

                           <div className="w-full h-[0px] border border-slate-300"></div>

                           <div className='py-[10px] flex flex-col'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Saleman
                              </h3>
                              <div className='inline-flex gap-1'>
                                 <input disabled={!edit} value={firstName} onChange={(e) => setFirstName(e.target.value)} className='border rounded-[10px] p-2' placeholder='First Name' />
                                 <input disabled={!edit} value={lastName} onChange={(e) => setLastName(e.target.value)} className='border rounded-[10px] p-2' placeholder='Last Name' />
                              </div>
                           </div>


                           {/* Contact Information Section */}
                           <div className='py-[10px] flex flex-col'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Contact Information *
                              </h3>
                              <div className='flex flex-col gap-1'>
                                 <input disabled={!edit} value={phone} onChange={(e) => setPhone(e.target.value)} className='border rounded-[10px] p-2' placeholder='Phone Number' />
                                 <input disabled={!edit} value={email} onChange={(e) => setEmail(e.target.value)} className='border rounded-[10px] p-2' placeholder='Email' />
                              </div>
                           </div>


                           {/* Number of Passenger section*/}
                           <div className='py-[10px] flex flex-col'>
                              <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                                 Notes
                              </h3>
                              <input disabled={!edit} value={notes} onChange={(e) => setNotes(e.target.value)} className='border rounded-[10px] p-2' placeholder='Enter' />
                           </div>


                           <div className="inline-flex mt-4 w-full justify-between">
                              <button
                                 type="button"
                                 className="inline-flex justify-center rounded-md border-2 border-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                 onClick={() => setEdit(true)}
                              >
                                 Edit
                              </button>
                              <button
                                 type="button"
                                 className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                 onClick={() => deleteSalesman()}
                              >
                                 Delete
                              </button>
                              <button
                                 type="button"
                                 className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                 onClick={() => closeModal()}
                              >
                                 Save
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
