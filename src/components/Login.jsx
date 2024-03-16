import React, { useState } from 'react'
import { Tab } from '@headlessui/react'
import httpClient from "../httpClient"

function classNames(...classes) {
   return classes.filter(Boolean).join(' ')
}

export default function Login() {
   const [password, setPassword] = useState('');
   const [registerPassword, setRegisterPassword] = useState('');
   const [email, setEmail] = useState('');

   const logInUser = async () => {  
      try {
        const resp = await httpClient.post("//127.0.0.1:8000/login", {
          email,
          password,
        });
        console.log(resp.data)
        window.location.href = "/"
      } catch (error) {
         console.log("error", error.response.status)
        if (error.response.status === 401) {
          alert("Invalid credentials");
        }
      }
    };

   const handleRegister = () => {
      // Add registration logic here
   };

   return (
      <Tab.Group>
         <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            <Tab
               className={({ selected }) =>
                  classNames(
                     'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                     'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                     selected
                        ? 'bg-white text-blue-700 shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
               }>Login</Tab>
            <Tab
               className={({ selected }) =>
                  classNames(
                     'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                     'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                     selected
                        ? 'bg-white text-blue-700 shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
               }>Register</Tab>
         </Tab.List>
         <Tab.Panels>
            <Tab.Panel>
               <div>
                  <form className='flex flex-col'>
                     <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id=''
                     />
                     <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id=''
                     />
                     <button type='button' onClick={() => logInUser()}>Login</button>
                  </form>
               </div>
            </Tab.Panel>
            <Tab.Panel>
               <form className='flex flex-col'>
                  <input
                     type="text"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     id=''
                  />
                  <input
                     type="password"
                     value={registerPassword}
                     onChange={(e) => setRegisterPassword(e.target.value)}
                     id=''
                  />
                  <button type='button' onClick={() => handleRegister()}>Login</button>
               </form>
            </Tab.Panel>
         </Tab.Panels>
      </Tab.Group>
   )
}