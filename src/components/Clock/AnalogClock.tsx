import React from "react";
import { useTime } from "../../hooks/useTime";

interface AnalogClockProps {
  timeZone: string;
  size?: number;
}

const AnalogClock: React.FC<AnalogClockProps> = ({ timeZone, size = 250 }) => {
  const time = useTime(timeZone);

  const secondRotation = (time.getSeconds() / 60) * 360;
  const minuteRotation =
    (time.getMinutes() / 60) * 360 + (time.getSeconds() / 60) * 6;
  const hourRotation =
    (time.getHours() / 12) * 360 + (time.getMinutes() / 60) * 30;

  return (
    <div className="analog-clock-container">
      <div className="analog-clock" style={{ width: size, height: size }}>
        {/* Markeringar */}
        {Array.from({ length: 60 }, (_, i) => {
          const isHourMarker = i % 5 === 0;
          return (
            <div
              key={i}
              className="clock-marking"
              style={{ transform: `rotate(${i * 6}deg)` }}
            >
              <div className={isHourMarker ? "hour-marker" : "minute-marker"} />
            </div>
          );
        })}

        {/* Visare */}
        <div
          className="hour-hand"
          style={{ transform: `rotate(${hourRotation}deg)` }}
        />
        <div
          className="minute-hand"
          style={{ transform: `rotate(${minuteRotation}deg)` }}
        />
        <div
          className="second-hand"
          style={{ transform: `rotate(${secondRotation}deg)` }}
        />

        {/* Mittpunkt */}
        <div className="clock-center" />
      </div>
    </div>
  );
};

export default AnalogClock;
