// import React, { useState, useEffect } from 'react';

// // components
// import Login from './components/Login';
// import Main from './components/Main'

// function App() {

//   const [sessionData, setSessionData] = useState();

//   const [currentTime, setCurrentTime] = useState(0);

//   useEffect(() => {
//      fetch('/api/time').then(res => res.json()).then(data => {
//         setCurrentTime(data.time);
//      });
//   }, []);


//   useEffect(() => {
//     // Load the initial session data injected into the window object
//     const initialData = window.initialSessionData;
//     setSessionData(initialData);
//     // Clear the initial data to clean up the global namespace
//     window.initialSessionData = null;
//   }, []);

//   return (
//     <div className='flex h-screen w-full justify-center items-center'>
//       {/* {sessionData ? (
//         <Main />)
//         :
//         (<div>
//           <Login />
//         </div>)
//       } */}
//       <p>The current time is: {currentTime}</p>
//     </div >
//   );
// };

// export default App;

import { useState } from 'react'
import axios from "axios";

function App() {

  // new line start
  const [profileData, setProfileData] = useState(null)


  function handleLogin() {
    axios({
      method: "GET",
      url: "/login",
      withCredentials: true
    })
      .then(response => {
        // Handle the response from the server
        console.log(response.data);
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  }

  function getData() {
    axios({
      method: "GET",
      url: "/profile",
    })
      .then((response) => {
        const res = response.data
        setProfileData(({
          profile_name: res.name,
          about_me: res.about
        }))
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
  }
  //end of new line 

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <button onClick={handleLogin}>Login</button>

        {/* new line start*/}
        <p>To get your profile details: </p><button onClick={getData}>Click me</button>
        {profileData && <div>
          <p>Profile name: {profileData.profile_name}</p>
          <p>About me: {profileData.about_me}</p>
        </div>
        }
        {/* end of new line */}
      </header>
    </div>
  );
}

export default App;