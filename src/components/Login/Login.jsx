import React, { useState, useEffect } from 'react'
import httpClient from "../../httpClient"
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../../reducers/developmentSlice';
import { Switch } from '@headlessui/react'

export default function Login() {
   const [password, setPassword] = useState('');
   const [email, setEmail] = useState('');
   const [development, setDevelopment] = useState(false)
   const url = useSelector((state) => state.development.value)
   const dispatch = useDispatch()
   

   useEffect(() => {
      if (!development){
         dispatch(update("http://3.15.70.119"))
      } else if (development) {
         dispatch(update("http://127.0.0.1"))
      }
   }, [development])
   const logInUser = async () => {
      try {
         const resp = await httpClient.post(`${url}:8000/auth/login`, {
            email,
            password,
         });
         console.log(resp.data)
         window.location.href = "/"
      } catch (error) {
         console.log("error", error.response)
         // if (error.response.status === 401) {
         //    alert("Invalid credentials");
         // }
      }
   };

   return (
      <section className="bg-gray-50 dark:bg-gray-900">
         <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <h1 className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
               EcoCat Tours Reservation System
            </h1>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
               <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                     Sign in to your account
                  </h1>
                  <div>
                     <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Your email
                     </label>
                     <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        required="" />
                  </div>
                  <div>
                     <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Password
                     </label>
                     <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required="" />
                  </div>
                  <div className="flex items-center justify-between">
                     {/* <div className="flex items-start">
                           <div className="flex items-center h-5">
                              <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                           </div>
                           <div className="ml-3 text-sm">
                              <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                           </div>
                        </div> */}
                     {/* <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a> */}
                  </div>
                  <button type="button" onClick={() => logInUser()} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                     Don't have an account yet? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p>
               </div>
            </div>

            <div className="py-[10px]">
               <h3 className='py-[10px] text-lg font-medium leading-6 text-gray-900'>
                  Toggle Development (currently in development)
               </h3>
               <Switch
                  checked={development}
                  onChange={() => setDevelopment(!development)}
                  className={`${development ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
               >
                  <span className="sr-only">Enable notifications</span>
                  <span className={`${development ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
               </Switch>
            </div>
         </div>
      </section>
   )
}