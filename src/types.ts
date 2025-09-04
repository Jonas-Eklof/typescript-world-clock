export type TimeZoneString =
  | "Europe/Stockholm"
  | "Europe/London"
  | "America/New_York"
  | "America/Los_Angeles"
  | "Asia/Tokyo"
  | "Asia/Shanghai"
  | "Asia/Singapore"
  | "Asia/Dubai"
  | string;

export interface City {
  id: string; // matchar id i timezone.json (ex "europe-london")
  name: string;
  country?: string;
  timezone: TimeZoneString;
  offset?: string;
  dstOffset?: string;
  coordinates?: { lat: number; lng: number };
  imageUrl?: string;
  mode?: ClockMode;
}

export interface CityListFile {
  version: string;
  lastUpdated?: string;
  timezones: City[];
}

export type ClockMode = "analog" | "digital";
