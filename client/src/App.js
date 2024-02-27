import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [sessionData, setSessionData] = useState();

  const initiateLogin = async () => {
    try {
      // Make a GET request to the "/login" route
      const response = await axios.get('http://localhost:3000/login');
      // Redirect the user to the returned URL
      window.location.href = response.data.redirect_url;
    } catch (error) {
      // Handle errors
      console.error('Error initiating login:', error.message);
    }
  };

  // Function to initiate the login
  const initiateLogout = async () => {
    try {
      // Make a GET request to the "/login" route
      const response = await axios.get('http://localhost:3000/logout');
      // Redirect the user to the returned URL
      window.location.href = response.data.redirect_url;
    } catch (error) {
      // Handle errors
      console.error('Error initiating logout:', error.message);
    }
  };

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
        <div>
          <button
              className='bg-black text-white rounded-md p-2'
              onClick={initiateLogout} id="qsLoginBtn">
              Logout
            </button>
        </div>
      ) : (
        <div>
          <h1 id="profileDropDown">Welcome Guest</h1>
          <p>
            <button
              className='bg-black text-white rounded-md p-2'
              onClick={initiateLogin} id="qsLoginBtn">
              Login
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default App;