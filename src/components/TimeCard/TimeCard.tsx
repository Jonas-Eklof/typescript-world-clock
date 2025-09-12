import React from "react";
import AnalogClock from "../Clock/AnalogClock";
import DigitalClock from "../Clock/DigitalClock";
import type { City } from "../../types";
import { Link } from "react-router-dom";

export interface TimeCardProps {
  city: City;
  mode: "analog" | "digital";
  onToggleMode: (id: string) => void;
  onRemove: (id: string) => void;
}

const TimeCard = ({ city, mode, onToggleMode, onRemove }: TimeCardProps) => {
  return (
    <div className="timeCard">
      <div>
        <h3>{city.name}</h3>
        <p className="country-text">{city.country}</p>

        <div className="clock-container">
          {mode === "analog" ? (
            <AnalogClock timeZone={city.timezone} size={200} />
          ) : (
            <DigitalClock timeZone={city.timezone} />
          )}
        </div>
      </div>

      <div className="timecard-buttons">
        <button className="btn" onClick={() => onToggleMode(city.id)}>
          {mode === "analog" ? "Visa Digital" : "Visa Analog"}
        </button>
        <Link to={`/city/${city.id}`}>
          <button className="btn">Detalj</button>
        </Link>
        <button className="btn remove-btn" onClick={() => onRemove(city.id)}>
          Ta bort
        </button>
      </div>
    </div>
  );
};

export default TimeCard;
