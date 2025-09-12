import { useState, useEffect } from "react";

// get the current time for Sweden
const getTimeForZone = (timeZone: string): Date => {
  return new Date(new Date().toLocaleString("sv-SE", { timeZone }));
};

// custom react hook that returns the current time for a given timezone
// the setInterval updates the time every second
export const useTime = (timeZone: string) => {
  const [time, setTime] = useState<Date>(() => getTimeForZone(timeZone));

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeForZone(timeZone)), 1000);
    return () => clearInterval(timer);
  }, [timeZone]);

  return time;
};
