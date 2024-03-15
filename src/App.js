import React, { useState, useEffect } from 'react';
import httpClient from './httpClient.ts';


// components
import Bookings from './components/Bookings.jsx';
import NavBar from './components/NavBar'
import Header from './components/Header'

function App() {
  const [user, setUser] = useState();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const resp = await httpClient.get("http://127.0.0.1:5000/@me");
  //       setUser(resp.data);
  //     } catch (error) {
  //       console.log("Not authenticated");
  //     }
  //   })();
  // }, []);

  const getUser = async () => {
    try {
      const resp = await httpClient.get("//127.0.0.1:5000/@me").then(resp => {
        return resp.data
      });
      setUser(resp.data);
    } catch (error) {
      console.log("Not authenticated");
    }
  };

  return (
    <div className='flex h-screen w-full justify-center items-center'>
      {false ? (
        <div className='flex flex-row w-full h-screen'>
          <NavBar />
          <div className='flex flex-col w-full h-screen bg-[#F2F8FC]'>
            <Header />
            <div className='w-full h-screen  py-[20px] overflow-scroll'>
              <Bookings />
            </div>
          </div>
        </div>
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
    </div >
  );
};

export default App;

