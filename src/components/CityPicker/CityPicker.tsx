// src/components/CityPicker/CityPicker.tsx
import React, { useState } from "react";
import timezonesData from "../../timezones.json";
import type { City, TimeZoneString } from "../../types";

interface CityPickerProps {
  onSelect: (city: City) => void;
}

export default function CityPicker({ onSelect }: CityPickerProps) {
  const [query, setQuery] = useState("");
  const [customName, setCustomName] = useState("");
  const [customTZ, setCustomTZ] = useState("");
  const [useCustomTimeZone, setUseCustomTZ] = useState(false);
  const [selectedTZ, setSelectedTZ] = useState("");

  const allCities = timezonesData.timezones as City[];

  // Unika tidszoner (utan useMemo eftersom det är en enkel operation)
  const uniqueTimezones = Array.from(
    new Set(allCities.map((c) => c.timezone))
  ).sort();

  const filtered = allCities.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      (c.country || "").toLowerCase().includes(query.toLowerCase())
  );

  const isValidTimeZone = (tz: string) => {
    try {
      Intl.DateTimeFormat("sv-SE", { timeZone: tz });
      return true;
    } catch {
      return false;
    }
  };

  const handleAddCustom = () => {
    const tzToUse = useCustomTimeZone ? customTZ.trim() : selectedTZ;
    const trimmedName = customName.trim();

    if (!trimmedName) return alert("Ange ett namn för staden.");
    if (!tzToUse) return alert("Välj eller skriv en tidszon.");
    if (!isValidTimeZone(tzToUse)) return alert("Ogiltig tidszon.");

    const newCity: City = {
      id: `custom-${trimmedName
        .toLowerCase()
        .replace(/\s+/g, "-")}-${Date.now()}`,
      name: trimmedName,
      country: "",
      timezone: tzToUse as TimeZoneString,
      imageUrl: undefined,
      mode: "analog",
    };

    const saved = JSON.parse(localStorage.getItem("customCities") || "[]");
    localStorage.setItem("customCities", JSON.stringify([...saved, newCity]));

    onSelect(newCity);
    setCustomName("");
    setCustomTZ("");
    setUseCustomTZ(false);
    setSelectedTZ(uniqueTimezones[0] ?? "");
  };

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
                  width: 56,
                  height: 56,
                  borderRadius: 6,
                  background: "#eee",
                }}
              />
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
          value={useCustomTimeZone ? "other" : selectedTZ}
          onChange={(e) => {
            const val = e.target.value;
            if (val === "other") {
              setUseCustomTZ(true);
              setSelectedTZ("");
            } else {
              setUseCustomTZ(false);
              setSelectedTZ(val as TimeZoneString);
            }
          }}
          style={{ width: "100%", padding: 8, marginBottom: 8 }}
        >
          {uniqueTimezones.map((tz) => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
          <option value="other">Annan tidszon / Skriv själv...</option>
        </select>

        {useCustomTimeZone && (
          <input
            placeholder="Skriv tidszon, ex Europe/London"
            value={customTZ}
            onChange={handleInputChange(setCustomTZ)}
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
