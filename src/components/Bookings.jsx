import React, { useEffect } from 'react'

export default function Bookings({setTitle}) {
  useEffect(() => {
    setTitle("Bookings"); 
  }, [setTitle]);

  return (
    <div>test</div>
  )
}

