import React from "react";
import { useTime } from "../../hooks/useTime";

interface DigitalClockProps {
  timeZone: string;
}

const DigitalClock: React.FC<DigitalClockProps> = ({ timeZone }) => {
  const time = useTime(timeZone);

  return (
    <div
      style={{
        fontSize: "34px",
        fontWeight: "bold",
        color: "#2c3e50",
        backgroundColor: "white",
        padding: "10px 20px",
        borderRadius: "5px",
      }}
    >
      {time.toLocaleTimeString("sv-SE")}
    </div>
  );
};

export default DigitalClock;
