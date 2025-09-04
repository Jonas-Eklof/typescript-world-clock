import { useState } from "react";
import AnalogClock from "../Clock/AnalogClock";
import DigitalClock from "../Clock/DigitalClock";

interface TimeCardProps {
  city: string;
}

export default function TimeCard({ city }: TimeCardProps) {
  const [isAnalog, setIsAnalog] = useState(true);

  return (
    <div className="timeCard">
      <h2 style={{ marginBottom: "12px" }}>{city}</h2>

      {isAnalog ? (
        <AnalogClock timeZone={city} />
      ) : (
        <DigitalClock timeZone={city} />
      )}

      <button
        onClick={() => setIsAnalog((prev) => !prev)}
        style={{
          marginTop: "16px",
          padding: "8px 14px",
          border: "none",
          borderRadius: "6px",
          background: "#2c3e50",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Växla till {isAnalog ? "Digital" : "Analog"}
      </button>
    </div>
  );
}
