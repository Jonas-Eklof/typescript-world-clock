import { useState, useEffect } from "react";

const getTimeForZone = (timeZone: string): Date => {
  return new Date(new Date().toLocaleString("sv-SE", { timeZone }));
};

export const useTime = (timeZone: string) => {
  const [time, setTime] = useState<Date>(() => getTimeForZone(timeZone));

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeForZone(timeZone)), 1000);
    return () => clearInterval(timer);
  }, [timeZone]);

  return time;
};
