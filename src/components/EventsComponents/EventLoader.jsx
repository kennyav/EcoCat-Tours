import React, { useState, useEffect } from 'react';
import httpClient from '../../httpClient';
import Event from '../Event';

const EventLoader = ({ eventId, event }) => {
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const resp = await httpClient.get(`//127.0.0.1:8000/events/${eventId}`);
        setSchedule(resp.data);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };

    fetchSchedule();
  }, [eventId]);

  if (!schedule) {
    return null; // Render nothing until the schedule is loaded
  }

  const daysMapping = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const days = schedule.days.split('').map((bit, index) => bit === '1' ? daysMapping[index] : null).filter(day => day !== null).join(', ');

  return <Event event={event} days={days} schedule={schedule} />;
};

export default EventLoader;
