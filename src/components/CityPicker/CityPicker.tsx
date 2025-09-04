// src/components/CityPicker/CityPicker.tsx
import React, { useState } from "react";
import timezonesData from "../../timezones.json";
import type { City } from "../../types";

interface CityPickerProps {
  onSelect: (city: City) => void;
}

export default function CityPicker({ onSelect }: CityPickerProps) {
  const [query, setQuery] = useState("");
  const allCities: City[] = timezonesData.timezones;

  const filtered = allCities.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      (c.country || "").toLowerCase().includes(query.toLowerCase())
  );

  // Enkel form för att lägga till custom stad
  const [customName, setCustomName] = useState("");
  const [customTZ, setCustomTZ] = useState("");

  return (
    <div style={{ maxHeight: "70vh", overflow: "auto" }}>
      <input
        placeholder="Sök stad..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
        {filtered.map((city) => (
          <div
            key={city.id}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => onSelect(city)}
          >
            <img
              src={city.imageUrl}
              alt={city.name}
              style={{
                width: 56,
                height: 56,
                objectFit: "cover",
                borderRadius: 6,
              }}
            />
            <div>
              <div style={{ fontWeight: 700 }}>{city.name}</div>
              <div style={{ fontSize: 12, color: "#666" }}>
                {city.country} — {city.timezone}
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr style={{ margin: "12px 0" }} />

      <div>
        <h4>Lägg till egen stad</h4>
        <input
          placeholder="Namn"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
        />
        <input
          placeholder="Tidszon (ex Europe/London)"
          value={customTZ}
          onChange={(e) => setCustomTZ(e.target.value)}
        />
        <button
          onClick={() => {
            if (!customName || !customTZ) return;
            const newCity: City = {
              id: `custom-${customName
                .toLowerCase()
                .replace(/\s+/g, "-")}-${Date.now()}`,
              name: customName,
              country: "Custom",
              timezone: customTZ,
              imageUrl: undefined,
              mode: "analog",
            };
            onSelect(newCity);
            setCustomName("");
            setCustomTZ("");
          }}
        >
          Lägg till
        </button>
      </div>
    </div>
  );
}
