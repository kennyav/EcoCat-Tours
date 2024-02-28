import React, { useState, useEffect } from 'react';

// components
import Login from './components/Login';
import Main from './components/Main'

function App() {

  const [sessionData, setSessionData] = useState();

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
        <Main />)
        // <div>
        //   <h1>Welcome User</h1>
        //   <p><a href="/logout" id="qsLogoutBtn">Logout</a></p>
        // </div>)
        :
        (<div>
          {/* <h1 id="profileDropDown">Welcome Guest</h1>
          <p><a href="/login" id="qsLoginBtn">Login</a></p> */}
          <Login />
        </div>)
      }
    </div >
  );
};

export default App;