import type { City } from "../types";
import type { StoredCity } from "../types";

export function isCity(obj: any): obj is City {
  return (
    obj &&
    typeof obj.id === "string" &&
    typeof obj.name === "string" &&
    typeof obj.timezone === "string"
  );
}

export const isStoredCity = (item: any): item is StoredCity => {
  return (
    item &&
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    (typeof item.country === "string" || item.country === undefined) &&
    typeof item.timezone === "string" &&
    (item.mode === undefined ||
      item.mode === "analog" ||
      item.mode === "digital")
  );
};
