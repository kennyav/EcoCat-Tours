import React from 'react';


// components
import Bookings from './components/Bookings.jsx';

function App(props) {
  return (
    <Bookings setTitle={(title) => props.setTitle(title)} />
  );
};

export default App;

