export type City = {
  id: string;
  name: string;
  country: string;
  coord: Coordinates;
  weather: Weather;
};

export type Coordinates = {
  lon: number;
  lat: number;
};

export type Weather = {
  summary: Summary;
  temperature: Temperature;
  wind: Wind;
  clouds: Clouds;
  timestamp: number;
};

export type Summary = {
  title: string;
  description: string;
  icon: string;
};

export type Temperature = {
  actual: number;
  feelsLike: number;
  min: number;
  max: number;
};

export type Wind = {
  speed: number;
  deg: number;
};

export type Clouds = {
  all: number;
  visibility: number;
  humidity: number;
};
