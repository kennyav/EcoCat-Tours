import React from 'react';


// components
import Bookings from './components/Bookings.jsx';
import NavBar from './components/NavBar.jsx';
import Header from './components/Header.jsx';

function App(props) {
  return (
    <div className='flex flex-row w-full h-screen'>
      <NavBar />
      <div className='flex flex-col w-full h-screen bg-[#F2F8FC]'>
        <Header title={props.title} />
        <div className='w-full h-screen py-[20px] overflow-scroll overflow-x-hidden'>
          <Bookings setTitle={(title) => props.setTitle(title)} />
        </div>
      </div>
    </div>
  );
};

export default App;

