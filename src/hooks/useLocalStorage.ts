import { useState, useEffect } from "react";
import { isCity } from "../utils/typeGuards";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    const raw = localStorage.getItem(key);
    if (!raw) return initialValue;

    try {
      const parsed = JSON.parse(raw) as T;

      if (key === "wc.selectedCities" || key === "customCities") {
        if (Array.isArray(parsed) && parsed.every(isCity)) {
          return parsed;
        }
        return initialValue;
      }
      return parsed;
    } catch (error) {
      console.warn("useLocalStorage parse error", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn("useLocalStorage setItem error", error);
    }
  }, [key, state]);

  return [state, setState] as const;
}
