import React, { useState, useEffect } from 'react';
import httpClient from './httpClient';


// components
import Bookings from './components/Bookings.jsx';
import NavBar from './components/NavBar'
import Header from './components/Header'

function App(props) {
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("http://127.0.0.1:8000/@me");
        setUser(resp.data);
      } catch (error) {
        console.log("Not authenticated");
      }
    })();
  }, []);

  const getUser = async () => {
    try {
      const resp = await httpClient.get("//127.0.0.1:8000/@me")
      console.log("Response data", resp.data)
      setUser(resp.data);
    } catch (error) {
      console.log("Not authenticated", error);
    }
  };

  return (
    <body>
      {user ? (
        <Bookings setTitle={(title) => props.setTitle(title)} />
      ) :
        (
          <div>
            <a href="/login">
              <button>Login</button>
            </a>
            <button onClick={() => getUser()}>Get User Info</button>
          </div>
        )
      }
    </body>
  );
};

export default App;

