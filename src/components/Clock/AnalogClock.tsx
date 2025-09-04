// src/components/Clock/AnalogClock.tsx
import React from "react";
import { useTime } from "../../hooks/useTime";

interface AnalogClockProps {
  timeZone: string;
  size?: number; // valfritt, px
}

const AnalogClock: React.FC<AnalogClockProps> = ({ timeZone, size = 250 }) => {
  const time = useTime(timeZone);

  const secondRotation = (time.getSeconds() / 60) * 360;
  const minuteRotation =
    (time.getMinutes() / 60) * 360 + (time.getSeconds() / 60) * 6;
  const hourRotation =
    (time.getHours() / 12) * 360 + (time.getMinutes() / 60) * 30;

  const center = size / 2;
  const radiusNumbers = size * 0.45; // placera siffror nära kanten

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          border: "10px solid #2c3e50",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
          backgroundColor: "white",
        }}
        className="analog-clock"
      >
        {/* Markeringar */}
        {Array.from({ length: 60 }, (_, i) => {
          const isHourMarker = i % 5 === 0;
          const angle = i * 6;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                top: "0",
                left: "50%",
                height: "50%",
                transformOrigin: "bottom center",
                transform: `rotate(${angle}deg) translateX(-50%)`,
              }}
            >
              <div
                style={{
                  height: isHourMarker ? "20px" : "10px",
                  width: isHourMarker ? "4px" : "2px",
                  backgroundColor: isHourMarker ? "#2c3e50" : "#95a5a6",
                }}
              />
            </div>
          );
        })}

        {/* Visare */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 5,
            height: size * 0.14,
            background: "#2c3e50",
            transform: `translate(-50%, -100%) rotate(${hourRotation}deg)`,
            transformOrigin: "bottom center",
            borderRadius: 8,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 4,
            height: size * 0.24,
            background: "#34495e",
            transform: `translate(-50%, -100%) rotate(${minuteRotation}deg)`,
            transformOrigin: "bottom center",
            borderRadius: 6,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 2,
            height: size * 0.24,
            background: "#e74c3c",
            transform: `translate(-50%, -100%) rotate(${secondRotation}deg)`,
            transformOrigin: "bottom center",
            borderRadius: 2,
          }}
        />

        {/* Mittpunkt */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 14,
            height: 14,
            background: "#e74c3c",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </div>
  );
};

export default AnalogClock;
