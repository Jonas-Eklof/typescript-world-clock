export type TimeZoneString =
  | "Europe/Stockholm"
  | "Europe/London"
  | "America/New_York"
  | "America/Los_Angeles"
  | "Asia/Tokyo"
  | "Asia/Shanghai"
  | "Asia/Singapore"
  | "Asia/Dubai"
  | "Australia/Sydney"
  | "Pacific/Auckland"
  | "Africa/Cairo"
  | "Europe/Paris"
  | "Europe/Berlin"
  | "Europe/Madrid"
  | "America/Chicago"
  | "America/Toronto"
  | "America/Sao_Paulo"
  | "Africa/Johannesburg"
  | "Asia/Seoul"
  | "Asia/Mumbai"
  | string;

export interface City {
  id: string;
  name: string;
  country?: string;
  timezone: TimeZoneString;
  offset?: string;
  dstOffset?: string;
  coordinates?: { lat: number; lng: number };
  imageUrl?: string;
  mode?: ClockMode;
}

export type StoredCity = Omit<City, "coordinates" | "imageUrl">;

export type ClockMode = "analog" | "digital";
