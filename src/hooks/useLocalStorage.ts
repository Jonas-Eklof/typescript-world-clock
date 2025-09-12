import { useState, useEffect } from "react";
import { isCity, isStoredCity } from "../utils/typeGuards";

// a custom hook that syncs a state value with localStorage
// generic <T> allows storing any type safely while keeping type inference
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    // try to load the stored value from localStorage when mounting/initializing the state
    const localStorageData = localStorage.getItem(key);
    if (!localStorageData) return initialValue;

    try {
      const parsed = JSON.parse(localStorageData) as T;

      if (key === "wc.selectedCities" || key === "customCities") {
        // ensuring that the parsed value is an array of valid City-objects
        if (Array.isArray(parsed) && parsed.every(isCity)) {
          return parsed;
        }
        return initialValue;
      }

      if (key === "customCities") {
        // ensuring that the parsed value is an array of valid StoredCity-objects
        if (Array.isArray(parsed) && parsed.every(isStoredCity)) {
          return parsed;
        }
        return initialValue;
      }

      // just return the parsed value for all other keys
      return parsed;
    } catch (error) {
      console.warn("useLocalStorage parse error", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      // save the state back into localStorage whenever key or state changes
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn("useLocalStorage setItem error", error);
    }
  }, [key, state]);

  // a "const assertion" that tells the TypeScript-compiler that the array acts like a tuple that is read only, and it must be in this order
  return [state, setState] as const;
}
