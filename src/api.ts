import { Plant, Garden, Planting, User, Question } from './constants/types';
import { resolve } from 'dns';

const CLOUD_FUNCTION_URL = 'http://localhost:3000/';

const checkStatus = (response: any): any => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(response.statusText);
  }
};

const parseJSON = (response: any): any => response.json();

const readResponse = (response: any): any => {
  console.log(response);
  return response;
};

export const getPlant = (name: string): Promise<Plant> => {
  const requestUrl = `${CLOUD_FUNCTION_URL}plant?name=${name}`;
  return fetch(requestUrl)
    .then(checkStatus)
    .then(parseJSON)
    .then((data: Plant) => data);
};

export const getAllPlant = (name: string): Promise<Plant[]> => {
  const requestUrl = `${CLOUD_FUNCTION_URL}plant-search?name=${name}`;
  return fetch(requestUrl)
    .then(checkStatus)
    .then(parseJSON)
    .then((data: Plant[]) => data);
};

export const getAllGarden = (name: string): Promise<Garden[]> => {
  const requestUrl = `${CLOUD_FUNCTION_URL}garden-search?name=${name}`;
  return fetch(requestUrl)
    .then(checkStatus)
    .then(parseJSON)
    .then((data: Garden[]) => data);
};

export const getAllUser = (name: string): Promise<User[]> => {
  const requestUrl = `${CLOUD_FUNCTION_URL}user-search?name=${name}`;
  return fetch(requestUrl)
    .then(checkStatus)
    .then(parseJSON)
    .then((data: User[]) => data);
};

export const getAllQuestion = (name: string): Promise<Question[]> => {
  const requestUrl = `${CLOUD_FUNCTION_URL}question-search?name=${name}`;
  return fetch(requestUrl)
    .then(checkStatus)
    .then(parseJSON)
    .then((data: Question[]) => data);
};

export const getUser = (username: string): Promise<User> => {
  const requestUrl = `${CLOUD_FUNCTION_URL}userall?username=${username}`;
  return fetch(requestUrl)
    .then(checkStatus)
    .then(parseJSON)
    .then((data: User) => data);
};

export const getGardens = (username: string): Promise<Garden[]> => {
  const requestUrl = `${CLOUD_FUNCTION_URL}gardens?username=${username}`;
  return fetch(requestUrl)
    .then(checkStatus)
    .then(parseJSON)
    .then(readResponse)
    .then((data: Garden[]) => data);
};

export const getGardenPlant = (plant: string): Promise<Garden[]> => {
  const requestUrl = `${CLOUD_FUNCTION_URL}gardenPlant-search?name=${plant}`;
  return fetch(requestUrl)
    .then(checkStatus)
    .then(parseJSON)
    .then(readResponse)
    .then((data: Garden[]) => data);
};

export const getGarden = (name: string): Promise<Garden> => {
  const requestUrl = `${CLOUD_FUNCTION_URL}garden?name=${name}`;
  return fetch(requestUrl)
    .then(checkStatus)
    .then(parseJSON)
    .then((data: Garden) => data);
};

export const getPlantings = (gardenName: string): Promise<Planting[]> => {
  const requestUrl = `${CLOUD_FUNCTION_URL}plantings?garden_name=${gardenName}`;
  return fetch(requestUrl)
    .then(checkStatus)
    .then(parseJSON)
    .then((data: Planting[]) => data);
};

export const postPlanting = (planting: Planting): Promise<Planting> => {
  const requestUrl = `${CLOUD_FUNCTION_URL}planting`;

  const body = JSON.stringify({
    plantName: planting.plant_name,
    gardenName: planting.garden_name,
    xCoord: planting.x_coord,
    yCoord: planting.y_coord,
    description: planting.description,
    plantedFrom: planting.planted_from,
    harvestCount: planting.harvest_count,
  });
  console.log('POSTING PLANTING!');
  console.log(planting);
  console.log(body);
  return fetch(requestUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: body,
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(readResponse)
    .then((data: Planting) => data);
};

export const deletePlanting = (planting: Planting): Promise<Planting> => {
  const requestUrl = `${CLOUD_FUNCTION_URL}planting`;

  const body = JSON.stringify({
    plantName: planting.plant_name,
    gardenName: planting.garden_name,
    xCoord: planting.x_coord,
    yCoord: planting.y_coord,
    description: planting.description,
    plantedFrom: planting.planted_from,
    harvestCount: planting.harvest_count,
  });
  console.log('POSTING PLANTING!');
  console.log(planting);
  console.log(body);
  return fetch(requestUrl, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: body,
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(readResponse)
    .then((data: Planting) => data);
};
