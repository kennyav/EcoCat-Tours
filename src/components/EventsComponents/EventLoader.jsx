import React, { useState, useEffect } from 'react';
import httpClient from '../../httpClient';
import Event from '../Event';
import { useSelector } from 'react-redux';

const EventLoader = ({ eventId, event }) => {
  const url = useSelector((state) => state.development.value)
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const resp = await httpClient.get(`${url}:8000/events/${eventId}`);
        setSchedule(resp.data);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };

    fetchSchedule();
  }, [eventId, url]);

  if (!schedule) {
    return null; // Render nothing until the schedule is loaded
  }

  const daysMapping = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const days = schedule.days.split('').map((bit, index) => bit === '1' ? daysMapping[index] : null).filter(day => day !== null).join(', ');

  return <Event event={event} days={days} schedule={schedule} />;
};

export default EventLoader;
