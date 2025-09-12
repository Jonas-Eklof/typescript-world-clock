import React, { useState } from "react";
import timezonesData from "../../timezones.json";
import type { City, TimeZoneString, StoredCity } from "../../types";
import { isCity } from "../../utils/typeGuards";

interface CityPickerProps {
  onSelect: (city: City) => void;
}

export default function CityPicker({ onSelect }: CityPickerProps) {
  const [query, setQuery] = useState("");
  const [customName, setCustomName] = useState("");
  const [customTimeZone, setCustomTimeZone] = useState("");
  const [useCustomTimeZone, setUseCustomTimeZone] = useState(false);

  const allCities = timezonesData.timezones as City[];

  const uniqueTimezones = Array.from(
    new Set(allCities.map((c) => c.timezone))
  ).sort();

  const [selectedTimeZone, setSelectedTimeZone] = useState(
    uniqueTimezones[0] || ""
  );

  const filtered = allCities.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      (c.country || "").toLowerCase().includes(query.toLowerCase())
  );

  // helper function that validates if a given timezone-string is valid
  const isValidTimeZone = (timezone: string) => {
    try {
      Intl.DateTimeFormat("sv-SE", { timeZone: timezone });
      return true;
    } catch {
      return false;
    }
  };

  const handleAddCustom = () => {
    const timezoneToUse = useCustomTimeZone
      ? customTimeZone.trim()
      : selectedTimeZone;
    const trimmedName = customName.trim();

    if (!trimmedName) return alert("Ange ett namn för staden.");
    if (!timezoneToUse) return alert("Välj eller skriv en tidszon.");
    if (!isValidTimeZone(timezoneToUse)) return alert("Ogiltig tidszon.");

    const newCity: City = {
      id: `custom-${trimmedName
        .toLowerCase()
        .replace(/\s+/g, "-")}-${Date.now()}`,
      name: trimmedName,
      country: "",
      timezone: timezoneToUse as TimeZoneString,
      imageUrl: undefined,
      mode: "analog",
    };

    // load the stored cities and filter them with a type guard
    const saved = JSON.parse(localStorage.getItem("customCities") || "[]");
    const validCities = saved.filter(isCity);

    const cityToStore: StoredCity = {
      id: newCity.id,
      name: newCity.name,
      country: newCity.country,
      timezone: newCity.timezone,
      mode: newCity.mode,
    };

    localStorage.setItem(
      "customCities",
      JSON.stringify([...validCities, cityToStore])
    );

    // reset input fields
    onSelect(newCity);
    setCustomName("");
    setCustomTimeZone("");
    setUseCustomTimeZone(false);
    setSelectedTimeZone(uniqueTimezones[0] ?? "");
  };

  // utility for creating change handlers for all inputs without repeating the code
  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value);

  return (
    <div className="cityPicker">
      <input
        placeholder="Sök stad..."
        value={query}
        onChange={handleInputChange(setQuery)}
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />

      <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
        {filtered.map((city) => (
          <div
            className="mapList"
            key={city.id}
            onClick={() => onSelect(city)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onSelect(city)}
          >
            {city.imageUrl ? (
              <img src={city.imageUrl} alt={city.name} />
            ) : (
              <div
                style={{
                  minWidth: 56,
                  height: 56,
                  borderRadius: 6,
                  background: "#eee",
                }}
              >
                <h3>No image available</h3>
              </div>
            )}
            <div>
              <div style={{ fontWeight: 700 }}>{city.name}</div>
              <div style={{ fontSize: 12, color: "#666" }}>
                {city.country} — {city.timezone}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="addNewCity" style={{ marginTop: 8 }}>
        <h4 style={{ margin: "8px 0" }}>Lägg till egen stad</h4>

        <input
          placeholder="Namn"
          value={customName}
          onChange={handleInputChange(setCustomName)}
          style={{ width: "100%", padding: 8, marginBottom: 8 }}
        />

        <label style={{ display: "block", marginBottom: 6 }}>
          Välj tidszon
        </label>
        <select
          value={useCustomTimeZone ? "other" : selectedTimeZone}
          onChange={(e) => {
            const val = e.target.value;
            if (val === "other") {
              setUseCustomTimeZone(true);
              setSelectedTimeZone("");
            } else {
              setUseCustomTimeZone(false);
              setSelectedTimeZone(val as TimeZoneString);
            }
          }}
          style={{ width: "100%", padding: 8, marginBottom: 8 }}
        >
          {uniqueTimezones.map((timezone) => (
            <option key={timezone} value={timezone}>
              {timezone}
            </option>
          ))}
          <option value="other">Annan tidszon / Skriv själv...</option>
        </select>

        {useCustomTimeZone && (
          <input
            placeholder="Skriv tidszon, ex Europe/London"
            value={customTimeZone}
            onChange={handleInputChange(setCustomTimeZone)}
            style={{ width: "100%", padding: 8, marginBottom: 8 }}
          />
        )}

        <button className="btn" onClick={handleAddCustom}>
          Lägg till
        </button>
      </div>
    </div>
  );
}
