import { useState, useEffect } from "react";

const getTimeForZone = (timeZone: string): Date => {
  const formatter = new Intl.DateTimeFormat("sv-SE", {
    timeZone,
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const parts = formatter.formatToParts(new Date());
  const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "0", 10);
  const minute = parseInt(
    parts.find((p) => p.type === "minute")?.value || "0",
    10
  );
  const second = parseInt(
    parts.find((p) => p.type === "second")?.value || "0",
    10
  );

  const date = new Date();
  date.setHours(hour, minute, second);
  return date;
};

export const useTime = (timeZone: string) => {
  const [time, setTime] = useState<Date>(() => getTimeForZone(timeZone));
  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeForZone(timeZone)), 1000);
    return () => clearInterval(timer);
  }, [timeZone]);
  return time;
};
