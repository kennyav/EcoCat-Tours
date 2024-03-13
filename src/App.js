import React, { useState, useEffect } from 'react';

// components
import Login from './components/Login';
import Main from './components/Main'

function App() {

  const [sessionData, setSessionData] = useState();

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
     fetch('/api/time').then(res => res.json()).then(data => {
        setCurrentTime(data.time);
     });
  }, []);


  useEffect(() => {
    // Load the initial session data injected into the window object
    const initialData = window.initialSessionData;
    setSessionData(initialData);
    // Clear the initial data to clean up the global namespace
    window.initialSessionData = null;
  }, []);

  return (
    <div className='flex h-screen w-full justify-center items-center'>
      {/* {sessionData ? (
        <Main />)
        :
        (<div>
          <Login />
        </div>)
      } */}
      <p>The current time is: {currentTime}</p>
    </div >
  );
};

export default App;