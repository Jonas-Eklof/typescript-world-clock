import { useState, useEffect } from "react";

// TypeScript-specific features that will be transpiled away
export type TimeZoneString = "Europe/Stockholm" | "America/New_York" | string;

export interface City {
  id: string;
  name: string;
  timezone: TimeZoneString;
  coordinates?: { lat: number; lng: number };
}

// Function with type annotations
const getTimeForZone = (timeZone: string): Date => {
  return new Date(new Date().toLocaleString("sv-SE", { timeZone }));
};

// Generic hook with TypeScript types
export const useTime = (timeZone: string) => {
  const [time, setTime] = useState<Date>(() => getTimeForZone(timeZone));

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeForZone(timeZone)), 1000);
    return () => clearInterval(timer);
  }, [timeZone]);

  return time;
};

// Type guard function
export function isCity(obj: any): obj is City {
  return obj && typeof obj.id === "string" && typeof obj.name === "string";
}
