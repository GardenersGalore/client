import { Plant, Garden, Planting, User } from './constants/types';
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
  const requestUrl = `${CLOUD_FUNCTION_URL}plant-garden?plant=${plant}`;
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
    plant_name: planting.plant_name,
    garden_name: planting.garden_name,
    x_coord: planting.x_coord,
    y_coord: planting.y_coord,
    description: planting.description,
    planted_from: planting.planted_from,
    harvest_count: planting.harvest_count,
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
  const requestUrl = `${CLOUD_FUNCTION_URL}planting?garden_name=${planting.garden_name}&x_coord=${planting.x_coord}&y_coord=${planting.y_coord}`;
  console.log('DELETING PLANTING!');
  console.log(planting);
  return fetch(requestUrl, {
    method: 'DELETE'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(readResponse)
    .then((data: Planting) => data);
};

export const postGarden = (garden: Garden): Promise<Garden> => {
  const requestUrl = `${CLOUD_FUNCTION_URL}garden`;

  const body = JSON.stringify({
    name: garden.name,
    username: garden.username,
    locationName: garden.location_name,
    description: garden.description,
    garden_width: garden.garden_width,
    garden_height: garden.garden_height,
  });
  console.log('POSTING GARDEN!');
  console.log(garden);
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
    .then((data: Garden) => data);
};

export const deleteGarden = (garden: Garden): Promise<Garden> => {
  const requestUrl = `${CLOUD_FUNCTION_URL}garden`;

  const body = JSON.stringify({
    name: garden.name,
    username: garden.username,
    location: garden.location,
    locationName: garden.location_name,
    description: garden.description,
    gardenWidth: garden.garden_width,
    gardenHeight: garden.garden_height,
  });

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
    .then((data: Garden) => data);
};
