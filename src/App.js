import React, { useState, useEffect } from 'react';
import httpClient from './httpClient';


// components
import Bookings from './components/Bookings.jsx';
import Login from './components/Login/Login.jsx';
import NavBar from './components/NavBar.jsx';
import Header from './components/Header.jsx';

function App(props) {
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("http://127.0.0.1:8000/auth/@me");
        setUser(resp.data);
      } catch (error) {
        console.log("Not authenticated");
      }
    })();
  }, []);


  return (
    <div>
      {user ?
        <div className='flex flex-row w-full h-screen'>
          <NavBar />
          <div className='flex flex-col w-full h-screen bg-[#F2F8FC]'>
            <Header title={props.title} />
            <div className='w-full h-screen  py-[20px] overflow-scroll'>
              <Bookings setTitle={(title) => props.setTitle(title)} />
            </div>
          </div>
        </div> : <Login />}
    </div>
  );
};

export default App;

