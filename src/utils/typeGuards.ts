import type { City } from "../types";

export function isCity(obj: any): obj is City {
  return (
    obj &&
    typeof obj.id === "string" &&
    typeof obj.name === "string" &&
    typeof obj.timezone === "string"
    // kan lägga till fler kontroller för coordinates, offsets etc.
  );
}
