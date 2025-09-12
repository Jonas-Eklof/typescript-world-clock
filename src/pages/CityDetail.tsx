import { useParams, Link } from "react-router-dom";
import timezonesData from "../timezones.json";
import type { City, ClockMode, StoredCity } from "../types";
import AnalogClock from "../components/Clock/AnalogClock";
import DigitalClock from "../components/Clock/DigitalClock";
import { useState, useMemo } from "react";
import { isCity } from "../utils/typeGuards";

export default function CityDetail() {
  const [clockMode, setClockMode] = useState<ClockMode>("analog");
  const { id } = useParams<{ id: string }>();

  // load all predefined cities from timezones.json
  const allPredefinedCities = timezonesData.timezones as City[];

  // loads custom cities stored in localStorage if there are any
  // then filters them with a type guard to make sure they are valid city-objects
  const storedCities: StoredCity[] = JSON.parse(
    localStorage.getItem("customCities") || "[]"
  ).filter(isCity);

  // converts stored cities into full city-objects with coordinates and imageUrl set to undefined since they are not stored
  const customCities: City[] = storedCities.map((storedCity) => ({
    ...storedCity,
    coordinates: undefined,
    imageUrl: undefined,
  }));

  // merge the lists of predefined cities and custom cities
  const allCities: City[] = [...allPredefinedCities, ...customCities];
  const city = allCities.find((c) => c.id === id);

  // calculates the time difference between the users local time and the chosen citys time
  // useMemo only recalculates when "city" is changed
  const timeDifference = useMemo(() => {
    if (!city) return "";

    try {
      const now = new Date();
      const localTimeString = now.toLocaleString("sv-SE");
      const cityTimeString = now.toLocaleString("sv-SE", {
        timeZone: city.timezone,
      });

      const localTime = new Date(localTimeString);
      const cityTime = new Date(cityTimeString);

      const diffMs = cityTime.getTime() - localTime.getTime();
      const diffHours = Math.round(diffMs / (1000 * 60 * 60));

      if (diffHours === 0) return "Samma tid som dig";
      return diffHours > 0
        ? `+${diffHours} timmar framför din tid`
        : `${Math.abs(diffHours)} timmar efter din tid`;
    } catch (error) {
      return "Kunde inte beräkna tidsskillnad";
    }
  }, [city]);

  if (!city) {
    return (
      <div>
        City not found. <Link to="/">Tillbaka</Link>
      </div>
    );
  }

  const backgroundImage =
    city.imageUrl && city.imageUrl.length > 0
      ? city.imageUrl
      : "https://images.unsplash.com/photo-1519354754184-e1d9c46182c0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const toggleClockMode = () => {
    setClockMode((prevMode) => (prevMode === "analog" ? "digital" : "analog"));
  };

  return (
    <div
      className="cityDetailBackground"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <Link to="/" style={{ color: "#fff" }}>
        <button className="backButton">← Tillbaka</button>
      </Link>

      <div className="detailViewWrapper">
        <h1>
          {city.name}
          {city.country && `, ${city.country}`}
        </h1>

        {city.coordinates && (
          <div className="coordinates-info">
            <p>
              📍 Koordinater: {city.coordinates.lat.toFixed(4)}° N,{" "}
              {city.coordinates.lng.toFixed(4)}° E
            </p>
          </div>
        )}

        <div className="time-difference-info">
          <p>⏰ {timeDifference}</p>
        </div>

        {clockMode === "analog" ? (
          <AnalogClock timeZone={city.timezone} size={250} />
        ) : (
          <DigitalClock timeZone={city.timezone} />
        )}

        <button
          className="btn"
          onClick={toggleClockMode}
          style={{ marginTop: "20px" }}
        >
          {clockMode === "analog" ? "Visa Digital" : "Visa Analog"}
        </button>
      </div>
    </div>
  );
}
