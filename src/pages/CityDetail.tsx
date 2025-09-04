// src/pages/CityDetail.tsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import timezonesData from "../timezones.json";
import type { City } from "../types";
import AnalogClock from "../components/Clock/AnalogClock";

export default function CityDetail() {
  const { id } = useParams<{ id: string }>();
  const city: City | undefined = timezonesData.timezones.find(
    (c) => c.id === id
  );

  if (!city) {
    return (
      <div>
        City not found. <Link to="/">Tillbaka</Link>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${city.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: 24,
        color: "#fff",
      }}
    >
      <Link to="/" style={{ color: "#fff" }}>
        <button className="backButton">← Tillbaka</button>
      </Link>
      <div
        style={{
          maxWidth: 900,
          marginTop: 40,
          background: "rgba(0,0,0,0.45)",
          padding: 24,
          borderRadius: 12,
        }}
      >
        <h1>
          {city.name}, {city.country}
        </h1>
        <p>{city.timezone}</p>
        <AnalogClock timeZone={city.timezone} size={300} />
      </div>
    </div>
  );
}
