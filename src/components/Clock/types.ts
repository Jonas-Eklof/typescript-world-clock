export interface City {
  id: string;
  name: string;
  country: string;
  timezone: string;
  offset: string;
  dstOffset: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  imageUrl: string;
}
