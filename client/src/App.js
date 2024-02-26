// import main
//import Main from "./components/Main";
import axios from 'axios';

// function App() {

//   return (
//     <Main />
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';

const App = () => {
  const [session, setSession] = useState(null);

  // Function to initiate the login
  const initiateLogin = async () => {
    try {
      // Make a GET request to the "/login" route
      const response = await axios.get('http://localhost:3001/login');
      console.log(response)
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
      const response = await axios.get('http://localhost:3001/logout');
      // Redirect the user to the returned URL
      window.location.href = response.data.redirect_url;
    } catch (error) {
      // Handle errors
      console.error('Error initiating logout:', error.message);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/user-data');
        setSession(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      {session ? (
        <div>
          <button onClick={initiateLogout} id="qsLoginBtn">
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h1 id="profileDropDown">Welcome Guest</h1>
          <p>
            <button onClick={initiateLogin} id="qsLoginBtn">
              Login
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default App;

