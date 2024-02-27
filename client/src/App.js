import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Main from './components/Main'

function App() {

  const [sessionData, setSessionData] = useState();

  // const initiateLogin = async () => {
  //   try {
  //     // Make a GET request to the "/login" route
  //     const response = await axios.get('http://localhost:3000/login', { withCredentials: true });
  //     // Redirect the user to the returned URL
  //     window.location.href = response.data.redirect_url;
  //   } catch (error) {
  //     // Handle errors
  //     console.error('Error initiating login:', error.message);
  //   }
  // };

  // // Function to initiate the login
  // const initiateLogout = async () => {
  //   try {
  //     // Make a GET request to the "/login" route
  //     const response = await axios.get('/logout', { withCredentials: true });
  //     // Redirect the user to the returned URL
  //     window.location.href = response.data.redirect_url;
  //   } catch (error) {
  //     // Handle errors
  //     console.error('Error initiating logout:', error.message);
  //   }
  //};

  useEffect(() => {
    // Load the initial session data injected into the window object
    const initialData = window.initialSessionData;
    setSessionData(initialData);
    // Clear the initial data to clean up the global namespace
    window.initialSessionData = null;
  }, []);

  return (
    <div className='flex h-screen w-full justify-center items-center'>
      {sessionData ? (
        //   <div>
        //     <button
        //         className='bg-black text-white rounded-md p-2'
        //         onClick={initiateLogout} id="qsLoginBtn">
        //         Logout
        //       </button>
        //       <Main />
        //   </div>
        // ) : (
        //   <div>
        //     <h1 id="profileDropDown">Welcome Guest</h1>
        //     <p>
        //       <button
        //         className='bg-black text-white rounded-md p-2'
        //         onClick={initiateLogin} id="qsLoginBtn">
        //         Login
        //       </button>
        //     </p>
        //   </div>
        <div>
          <h1>Welcome User</h1>
          <p><a href="/logout" id="qsLogoutBtn">Logout</a></p>
        </div>)
        :
        (<div>
          <h1 id="profileDropDown">Welcome Guest</h1>
          <p><a href="/login" id="qsLoginBtn">Login</a></p>
        </div>)
      }
    </div >
  );
};

export default App;