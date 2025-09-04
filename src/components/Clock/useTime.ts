import { useState, useEffect } from "react";

export const useTime = (timeZone: string): Date => {
  const getTimeForZone = (tz: string): Date => {
    const formatter = new Intl.DateTimeFormat("sv-SE", {
      timeZone: tz,
      hour12: false,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

    const parts = formatter.formatToParts(new Date());
    const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "0");
    const minute = parseInt(
      parts.find((p) => p.type === "minute")?.value || "0"
    );
    const second = parseInt(
      parts.find((p) => p.type === "second")?.value || "0"
    );

    const date = new Date();
    date.setHours(hour, minute, second);
    return date;
  };

  const [time, setTime] = useState<Date>(getTimeForZone(timeZone));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimeForZone(timeZone));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeZone]);

  return time;
};
