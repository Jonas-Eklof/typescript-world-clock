// src/hooks/useLocalStorage.ts
import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    const raw = localStorage.getItem(key);
    if (!raw) return initialValue;

    try {
      return JSON.parse(raw) as T;
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
