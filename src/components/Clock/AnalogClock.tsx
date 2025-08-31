import React, { useState, useEffect } from "react";

const AnalogClock: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Beräkna rotation för varje visare
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
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          border: "10px solid #2c3e50",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
          backgroundColor: "white",
        }}
      >
        {/* Centreringscontainer för enklare positionering */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Timmarkeringar */}
          {Array.from({ length: 60 }, (_, i) => {
            const isHourMarker = i % 5 === 0;
            const angle = i * 6;

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: "0",
                  left: "49.3%",
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
                    marginTop: "5px",
                  }}
                />
              </div>
            );
          })}

          {/* Timsiffror */}
          {Array.from({ length: 12 }, (_, i) => {
            const angle = i * 30 - 90; // -90 för att börja från toppen
            const radius = 100; // Avstånd från centrum
            const x = 150 + radius * Math.cos((angle * Math.PI) / 180);
            const y = 150 + radius * Math.sin((angle * Math.PI) / 180);

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${x - 8}px`, // Justera för centrering
                  top: `${y - 10}px`, // Justera för centrering
                  width: "20px",
                  height: "20px",
                  textAlign: "center",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#2c3e50",
                  transform: "translate(-50%, -50%)", // Centrera perfekt
                }}
              >
                {i === 0 ? 12 : i}
              </div>
            );
          })}
        </div>

        {/* Timvisare */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "8px",
            height: "70px",
            backgroundColor: "#2c3e50",
            borderRadius: "10px",
            transform: `translateX(-50%) translateY(-100%) rotate(${hourRotation}deg)`,
            transformOrigin: "bottom center",
            zIndex: 10,
          }}
        />

        {/* Minutenvisare */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "6px",
            height: "100px",
            backgroundColor: "#34495e",
            borderRadius: "10px",
            transform: `translateX(-50%) translateY(-100%) rotate(${minuteRotation}deg)`,
            transformOrigin: "bottom center",
            zIndex: 20,
          }}
        />

        {/* Sekundvisare */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "2px",
            height: "120px",
            backgroundColor: "#e74c3c",
            borderRadius: "10px",
            transform: `translateX(-50%) translateY(-100%) rotate(${secondRotation}deg)`,
            transformOrigin: "bottom center",
            zIndex: 30,
          }}
        />

        {/* Centrerad punkt */}
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
            zIndex: 40,
          }}
        />
      </div>

      <div
        style={{
          marginTop: "20px",
          fontSize: "34px",
          fontWeight: "bold",
          color: "#2c3e50",
          backgroundColor: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        {time.toLocaleTimeString("sv-SE")}
      </div>

      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
          color: "#7f8c8d",
          maxWidth: "500px",
        }}
      ></div>
    </div>
  );
};

export default AnalogClock;
