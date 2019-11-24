export interface RootState {
  gg: GG;
}

// GG = GardenersGalore contains info for the main state of the website
export interface GG {
  username: string;
  user: User;
  gardens: Garden[];
  garden: Garden;
  plant: PlantInfo;
  plantAll: Plant[];
  userAll: User[];
  searchQuestion: SearchQuestion[];
  error: string;
  search: SearchState;
  isLoading: boolean;
  isError: boolean;
  selectedGardenCell: [number, number];
  questions: Question[];
  question: Question;
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
  gardens: Garden[];
  favourite_plants: PlantLike[];
  pictureURL: string;
  blogs: Blog[];
}

export interface SearchQuestion {
  question_title: string;
  author: string;
  description: string;
  _id: string;
}

export interface Blog {
  date: number;
  name: string;
  username: string;
  content: string;
  tags: string[];
}

// this contains info for a specific type of plant
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

export interface BlogInfo {
  date: number;
  name: string;
  username: string;
  content: string;
  tags: string[];
  user: User;
}

// this contains extended info about a specific type of plant
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
  plantings: PlantingInfo[];
  blogs: BlogInfo[];
}

// this contains extended info about a specific planting
// a planting is an instance of a plant, ie the exact one someone has planted
export interface PlantingInfo {
  plant_name: string;
  garden_name: string;
  x_coord: number;
  y_coord: number;
  planted_at: Date;
  description: string;
  planted_from: string;
  harvest_count: number;
  pictureURL: string;
  plant: Plant;
  garden: Garden;
}

export interface PlantLike {
  plant: Plant;
  count: number;
}

// a planting is an instance of a plant, ie the exact one someone has planted
export interface Planting {
  plant_name: string;
  garden_name: string;
  x_coord: number;
  y_coord: number;
  planted_at: Date;
  description: string;
  planted_from: string;
  harvest_count: number;
  pictureURL: string;
  plant: Plant;
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

export interface Answer {
  answer: string;
  author: string;
  question_title: string;
}

export interface Question {
  question_title: string;
  author: string;
  description: string;
  answers: Answer[];
  _id: _id;
}

export interface _id {
  $oid: string;
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
