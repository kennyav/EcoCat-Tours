import React, { useState, useEffect } from 'react'
import httpClient from '../../httpClient';

export default function Register() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("")
   const [confirmed, setConfirmed] = useState(false)

   let confirmPassCSS = confirmed ? "focus:ring-green-600 focus:border-green-600 dark:focus:ring-green-500 dark:focus:border-green-500" : "focus:ring-red-600 focus:border-red-600 dark:focus:ring-red-500 dark:focus:border-red-500"

   useEffect(() => {
      if (password === confirmPassword) {
         setConfirmed(true);

      }
   }, [confirmPassword, password])

   const registerUser = async () => {
      try {
         const resp = await httpClient.post("//127.0.0.1:8000/register", {
            email,
            password,
         });

         console.log(resp)
         
         window.location.href = "/";
      } catch (error) {
         if (error.response.status === 401) {
            alert("Invalid credentials");
         }
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
                     Create and Account
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
                           required />
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
                           required />
                     </div>
                     <div>
                        <label
                           htmlFor="password"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                           Confirm Password
                        </label>
                        <input
                           type="password"
                           name="confirmPassword"
                           id="confirmPassword"
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}
                           placeholder="••••••••"
                           className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 ${confirmPassCSS} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                           required />
                     </div>
                     <button type="button" onClick={() => registerUser()} disabled={!confirmed} className={`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}>Create Account</button>
               </div>
            </div>
         </div>
      </section>
   );
}
