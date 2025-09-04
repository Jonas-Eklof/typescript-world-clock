// src/components/TimeCard/TimeCard.tsx
import React from "react";
import AnalogClock from "../Clock/AnalogClock";
import DigitalClock from "../Clock/DigitalClock";
import type { City } from "../../types";
import { Link } from "react-router-dom";

interface TimeCardProps {
  city: City;
  mode: "analog" | "digital";
  onToggleMode: (id: string) => void;
  onRemove: (id: string) => void;
}

const TimeCard: React.FC<TimeCardProps> = ({
  city,
  mode,
  onToggleMode,
  onRemove,
}) => {
  return (
    <div className="timeCard">
      <div>
        <h3 style={{ margin: 0 }}>{city.name}</h3>
        <p style={{ margin: "4px 0 10px", color: "#666" }}>{city.country}</p>

        <div style={{ display: "flex", justifyContent: "center" }}>
          {mode === "analog" ? (
            <AnalogClock timeZone={city.timezone} size={200} />
          ) : (
            <DigitalClock timeZone={city.timezone} />
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          marginTop: 12,
        }}
      >
        <button className="btn" onClick={() => onToggleMode(city.id)}>
          {mode === "analog" ? " Visa Digital" : "Visa Analog"}
        </button>
        <Link
          to={`/city/${encodeURIComponent(city.id)}`}
          style={{ textDecoration: "none" }}
        >
          <button className="btn">Detalj</button>
        </Link>
        <button
          className="btn"
          onClick={() => onRemove(city.id)}
          style={{ background: "#ef4444" }}
        >
          Ta bort
        </button>
      </div>
    </div>
  );
};

export default TimeCard;
