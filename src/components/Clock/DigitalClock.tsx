import React from "react";
import { useTime } from "../../hooks/useTime";

interface DigitalClockProps {
  timeZone: string;
}

const DigitalClock: React.FC<DigitalClockProps> = ({ timeZone }) => {
  const time = useTime(timeZone);

  return <div className="digitalClock">{time.toLocaleTimeString("sv-SE")}</div>;
};

export default DigitalClock;
