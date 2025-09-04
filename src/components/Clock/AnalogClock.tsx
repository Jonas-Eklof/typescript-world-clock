import React, { useState, useEffect } from "react";

interface AnalogClockProps {
  timeZone: string;
}

const getTimeForZone = (timeZone: string): Date => {
  const formatter = new Intl.DateTimeFormat("sv-SE", {
    timeZone,
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const parts = formatter.formatToParts(new Date());
  const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "0");
  const minute = parseInt(parts.find((p) => p.type === "minute")?.value || "0");
  const second = parseInt(parts.find((p) => p.type === "second")?.value || "0");

  const date = new Date();
  date.setHours(hour, minute, second);
  return date;
};

const AnalogClock: React.FC<AnalogClockProps> = ({ timeZone }) => {
  const [time, setTime] = useState<Date>(getTimeForZone(timeZone));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimeForZone(timeZone));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeZone]);

  const secondRotation = (time.getSeconds() / 60) * 360;
  const minuteRotation =
    (time.getMinutes() / 60) * 360 + (time.getSeconds() / 60) * 6;
  const hourRotation =
    (time.getHours() / 12) * 360 + (time.getMinutes() / 60) * 30;

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

        {/* Timsiffror */}
        {/* {Array.from({ length: 12 }, (_, i) => {
          const angle = i * 30 - 90; // Start vid toppen
          const radius = 90; // Avstånd från centrum
          const centerX = 65;
          const centerY = 65;
          const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
          const y = centerY + radius * Math.sin((angle * Math.PI) / 180);

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#2c3e50",
              }}
            >
              {i === 0 ? 12 : i}
            </div>
          );
        })} */}

        {/* Timvisare */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "5px",
            height: "40px",
            backgroundColor: "#2c3e50",
            borderRadius: "10px",
            transform: `translate(-50%, -100%) rotate(${hourRotation}deg)`,
            transformOrigin: "bottom center",
          }}
        />

        {/* Minutenvisare */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "4px",
            height: "60px",
            backgroundColor: "#34495e",
            borderRadius: "10px",
            transform: `translate(-50%, -100%) rotate(${minuteRotation}deg)`,
            transformOrigin: "bottom center",
          }}
        />

        {/* Sekundvisare */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "2px",
            height: "60px",
            backgroundColor: "#e74c3c",
            borderRadius: "10px",
            transform: `translate(-50%, -100%) rotate(${secondRotation}deg)`,
            transformOrigin: "bottom center",
          }}
        />

        {/* Mittpunkt */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "15px",
            height: "15px",
            backgroundColor: "#e74c3c",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </div>
  );
};

export default AnalogClock;
