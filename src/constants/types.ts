export interface RootState {
  gg: GG;
}

export interface GG {
  username: string;
  user: User;
  gardens: Garden[];
  garden: Garden;
  plant: PlantInfo;
  plantAll: Plant[];
  error: string;
  search: SearchState;
  isLoading: boolean;
  isError: boolean;
  selectedGardenCell: [number, number];
  selectedGarden: string;
  forecast: Forecast;
  forecastIsLoading: boolean;
  forecastIsError: boolean;
  forecastError: string;
}

export interface User {
  name: string;
  username: string;
  email: string;
  password: string;
  phone_number: string;
  experience: string;
  pictureURL: string;
  gardens: Garden[];
  favourite_plants: PlantLike[];
  blogs : Blog[];
}

export interface Blog{
  date : Date;
  name : string;
  username : string;
  content : string;
  tags : string[];
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

export interface BlogInfo{
  date : number;
  name : string;
  username : string;
  content : string;
  tags : string[];
  user : User;
}

export interface PlantInfo {
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
  plantings : PlantingInfo[];
  blogs : BlogInfo[];
}

export interface PlantingInfo {
  plant_name: string;
  garden_name: string;
  x_coord: number;
  y_coord: number;
  planted_at: Date;
  description: string;
  planted_from: string;
  harvest_count: number;
  pictureURL : string;
  plant: Plant;
  garden: Garden;
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
  pictureURL : string;
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
  city_name: string;
  country_name: string;
  garden_width: number;
  garden_height: number;
  plantings: Planting[];
  pictureURL: string;
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

export interface Forecast {
  city_name: string;
  lon: string;
  lat: string;
  country_code: string;
  data: WeatherDay[];
}

export interface WeatherDay {
  date: string;
  rainfall_probability: number;
  rainfall_amount: number;
  max_temperature: number;
  min_temperature: number;
  snow: number;
  weather: Weather;
}
export interface Weather {
  icon: string;
  code: number;
  description: string;
}

export interface NavBarState {
  location: string;
  timestamp: number;
}
