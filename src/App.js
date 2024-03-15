import React, { useState, useEffect } from 'react';

// components
import Login from './components/Login';
import Main from './components/Main'

function App() {

  return (
    <div className='flex h-screen w-full justify-center items-center'>
      {false ? (
        <Main />)
        :
        (<div>
          <Login />
        </div>)
      }
    </div >
  );
};

export default App;

