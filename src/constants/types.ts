export interface RootState {
  gg: GG;
}

export interface GG {
  username: string;
  user: User;
  gardens: Garden[];
  garden: Garden;
  plant: Plant;
  plantAll: Plant[];
  error: string;
  search: SearchState;
  isLoading: boolean;
  isError: boolean;
  selectedGardenCell: [number, number];
  selectedGarden: string;
}

export interface User {
  name: string;
  username: string;
  email: string;
  password: string;
  phone_number: string;
  experience: string;
  gardens: Garden[];
  favourite_plants: PlantLike[];
}

export interface PlantLike {
  plant: Plant;
  count: number;
}

export interface Planting {
  plant_name: string;
  garden_name: string;
  x_coord: number;
  y_coord: number;
  planted_at: Date;
  description: string;
  planted_from: string;
  harvest_count: number;
  plant: Plant;
}

export interface Location {
  type: string;
  coordinates: number[];
}

export interface Garden {
  name: string;
  username: string;
  description: string;
  location: Location;
  location_name: string;
  garden_width: number;
  garden_height: number;
  plantings: Planting[];
}

export interface Plant {
  name: string;
  en_wikipedia_url: string;
  binomial_name: string;
  description: string;
  median_lifespan: string;
  median_days_to_first_harvest: number;
  median_days_to_last_harvest: number;
  height: number;
  spread: number;
  row_spacing: number;
  sowing_method: string;
  sun_requirements: string;
  svg_icon: string;
}

export interface SearchState {
  query: string;
}

/*
Old Types

*/

export interface GeoCode {
  status: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface Filter {
  units: 'si' | 'us';
  searchedLocation: string;
  timestamp: number;
}

export interface Timezone {
  timezone: string;
  offset: number;
  latitude: number;
  longitude: number;
}

export interface Weather {
  time: number;
  summary: string;
  icon: string;
  sunriseTime: number;
  sunsetTime: number;
  moonPhase: number;
  nearestStormDistance: number;
  precipIntensity: number;
  precipIntensityMax: number;
  precipIntensityMaxTime: number;
  precipProbability: number;
  precipType: string;
  temperature: number;
  apparentTemperature: number;
  temperatureHigh: number;
  temperatureHighTime: number;
  temperatureLow: number;
  temperatureLowTime: number;
  apparentTemperatureHigh: number;
  apparentTemperatureHighTime: number;
  apparentTemperatureLow: number;
  apparentTemperatureLowTime: number;
  apparentTemperatureMin: number;
  apparentTemperatureMinTime: number;
  apparentTemperatureMax: number;
  apparentTemperatureMaxTime: number;
  dewPoint: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windGust: number;
  windBearing: number;
  cloudCover: number;
  uvIndex: number;
  visibility: number;
}

export interface Forecast {
  latitude: number;
  longitude: number;
  timezone: string;
  currently: Weather;
  minutely: {
    summary: string;
    icon: string;
    data: Weather[];
  };
  hourly: {
    summary: string;
    icon: string;
    data: Weather[];
  };
  daily: {
    summary: string;
    icon: string;
    data: Weather[];
  };
  flags: any;
  offset: number;
}

export interface NavBarState {
  location: string;
  timestamp: number;
}

export interface WeatherMapState {
  latitude: number;
  longitude: number;
  location: string;
  error: string;
  isLoading: boolean;
}

export interface ForecastState {
  isLoading: boolean;
  filter: Filter;
  location: string;
  timezone: Timezone;
  currentWeather: Weather;
  hourlyForecast: {
    summary: string;
    icon: string;
    data: Weather[];
  };
  dailyForecast: {
    summary: string;
    icon: string;
    data: Weather[];
  };
  error: string;
}

export interface ToolTipType {
  display: boolean;
  data: {
    key: string;
    group: string;
    description?: string;
  };
  type: 'network' | 'app';
  pos?: {
    x: number;
    y: number;
  };
}
