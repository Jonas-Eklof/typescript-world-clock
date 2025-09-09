// src/pages/CityDetail.tsx
import { useParams, Link } from "react-router-dom";
import timezonesData from "../timezones.json";
import type { City } from "../types";
import AnalogClock from "../components/Clock/AnalogClock";

export default function CityDetail() {
  const { id } = useParams<{ id: string }>();

  const customCities: City[] = JSON.parse(
    localStorage.getItem("customCities") || "[]"
  );
  const allCities: City[] = [...timezonesData.timezones, ...customCities];
  const city = allCities.find((c) => c.id === id);

  if (!city) {
    return (
      <div>
        City not found. <Link to="/">Tillbaka</Link>
      </div>
    );
  }

  // Korrigerad villkorssats som hanterar undefined säkert
  const backgroundImage =
    city.imageUrl && city.imageUrl.length > 0
      ? city.imageUrl
      : "https://images.unsplash.com/photo-1519354754184-e1d9c46182c0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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
        <AnalogClock timeZone={city.timezone} size={250} />
      </div>
    </div>
  );
}
