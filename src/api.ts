import { Plant, Garden, Planting, User, Weather, Forecast, Question, Answer } from './constants/types';
import { resolve } from 'dns';
import { Questions } from './views/questions';

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
  const requestUrl = `${CLOUD_FUNCTION_URL}plantinfo?name=${name}`;
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

export const getForecast = (city_name: string, country_name: string): Promise<Forecast> => {
  const requestUrl = `${CLOUD_FUNCTION_URL}weather?city_name=${city_name}&country_name=${country_name}`;
  return fetch(requestUrl)
    .then(checkStatus)
    .then(parseJSON)
    .then((data: Forecast) => data);
};

export const postUser = (user: User): Promise<User> => {
  const requestUrl = `${CLOUD_FUNCTION_URL}user`;

  const body = JSON.stringify({
    name: user.name,
    username: user.username,
    email: user.email,
    password: user.password,
    phone_number: user.phone_number,
    experience: user.experience,
    pictureURL: user.pictureURL,
  });
  console.log('POSTING USER!');
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

export const getQuestions = (username: string): Promise<Question[]> => {
  const requestUrl = `${CLOUD_FUNCTION_URL}forum/questions?username=${username}`;
  return fetch(requestUrl)
    .then(checkStatus)
    .then(parseJSON)
    .then(readResponse)
    .then((data: Question[]) => data);
};

export const getQuestion = (_id: string): Promise<Question> => {
  const requestUrl = `${CLOUD_FUNCTION_URL}forum/question?_id=${_id}`;
  return fetch(requestUrl)
    .then(checkStatus)
    .then(parseJSON)
    .then((data: Question) => data);
};

export const postPlanting = (planting: Planting): Promise<Planting> => {
  const requestUrl = `${CLOUD_FUNCTION_URL}planting`;

  const body = JSON.stringify({
    plant_name: planting.plant_name,
    garden_name: planting.garden_name,
    x_coord: planting.x_coord,
    y_coord: planting.y_coord,
    pictureURL: planting.pictureURL,
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
    method: 'DELETE',
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
    city_name: garden.city_name,
    country_name: garden.country_name,
    description: garden.description,
    garden_width: garden.garden_width,
    garden_height: garden.garden_height,
    pictureURL: garden.pictureURL,
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
    city_name: garden.city_name,
    country_name: garden.country_name,
    description: garden.description,
    gardenWidth: garden.garden_width,
    gardenHeight: garden.garden_height,
    pictureURL: garden.pictureURL,
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

export const postNewQuestion = (question: Question): Promise<Question> => {
  const requestUrl = `${CLOUD_FUNCTION_URL}forum/question`;

  const body = JSON.stringify({
    question_title: question.question_title,
    description: question.description,
    author: question.author,
  });
  console.log('POSTING NEW QUESTION');
  console.log(question);
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
    .then((data: Question) => data);
};

export const postNewAnswer = (answer: Answer): Promise<Answer> => {
  const requestUrl = `${CLOUD_FUNCTION_URL}forum/answer`;

  const body = JSON.stringify({
    question_title: answer.question_title,
    answer: answer.answer,
    author: answer.author,
  });
  console.log('POSTING NEW ANSWER');
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
    .then((data: Answer) => data);
};
