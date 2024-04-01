import React, { useState } from 'react'

// events import
import Event from './Event'

export default function Dates(props) {

   return (
      <div>
         {/* if the event is in the shown month, year, and day then show else don't */}
         {currentWeekDayNumbers.some(dayObj => dayObj.day === props.dayNumber && dayObj.show) &&
            <Event
               signal={props.signal}
               setSignal={props.setSignal}
               index={props.i}
               event={props.event}
               month={props.currentMonth}
               year={props.currentYear}
               day={props.dayNumber}
            />}
      </div >
   )
}
