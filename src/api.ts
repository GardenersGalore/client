import { Forecast, GeoCode } from './constants/types';
import { Plant } from './constants/types';

const CLOUD_FUNCTION_URL = 'http://localhost:3000/';

const checkStatus = (response: any): any => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(response.statusText);
  }
};

const parseJSON = (response: any): any => response.json();


export const getPlant = (name : string) :Promise<Plant> => {
  const requestUrl =
    `${CLOUD_FUNCTION_URL}plant?name=${name}`;
  return fetch(requestUrl)
    .then(checkStatus)
    .then(parseJSON)
    .then((data: Plant) => data);
}

export const getGeocode = (latitude: number, longitude: number, address: string): Promise<GeoCode> => {
  const requestUrl =
    `${CLOUD_FUNCTION_URL}getGeocode?lat=${latitude}&lon=${longitude}&address=` + encodeURIComponent(address);
  return fetch(requestUrl)
    .then(checkStatus)
    .then(parseJSON)
    .then((data: GeoCode) => data);
};

export const getWeatherByTime = (
  latitude: number,
  longitude: number,
  time: number,
  exclude: string,
  units: string
): Promise<Forecast> => {
  const requestUrl =
    `${CLOUD_FUNCTION_URL}getWeather?lat=${latitude}&lon=${longitude}&time=${time}` +
    `&exclude=${encodeURIComponent(exclude)}&units=${encodeURIComponent(units)}`;
  return fetch(requestUrl)
    .then(checkStatus)
    .then(parseJSON)
    .then((data: any) => data);
};
