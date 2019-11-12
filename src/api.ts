import { Plant, Garden, Planting, Question, Answer } from './constants/types';
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

const readResponse = (response : any) : any => {
  console.log(response);
  return response;
}

export const getPlant = (name : string) :Promise<Plant> => {
  const requestUrl =
    `${CLOUD_FUNCTION_URL}plant?name=${name}`;
  return fetch(requestUrl)
    .then(checkStatus)
    .then(parseJSON)
    .then((data: Plant) => data);
}

export const getGardens = (username : string) :Promise<Garden[]> => {
  const requestUrl =
    `${CLOUD_FUNCTION_URL}gardens?username=${username}`;
  return fetch(requestUrl)
    .then(checkStatus)
    .then(parseJSON)
    .then(readResponse)
    .then((data: Garden[]) => data);
}

export const getGarden = (name : string) :Promise<Garden> => {
  const requestUrl =
    `${CLOUD_FUNCTION_URL}garden?name=${name}`;
  return fetch(requestUrl)
    .then(checkStatus)
    .then(parseJSON)
    .then((data: Garden) => data);
}

export const getPlantings = (garden_name : string) :Promise<Planting[]> => {
  const requestUrl =
    `${CLOUD_FUNCTION_URL}plantings?garden_name=${garden_name}`;
  return fetch(requestUrl)
    .then(checkStatus)
    .then(parseJSON)
    .then((data: Planting[]) => data);
}

export const getQuestions = (username : string) :Promise<Question[]> => {
  const requestUrl =
    `${CLOUD_FUNCTION_URL}forum/questions?username=${username}`;
  return fetch(requestUrl)
    .then(checkStatus)
    .then(parseJSON)
    .then(readResponse)
    .then((data: Question[]) => data);
}

export const getQuestion = (question : string) :Promise<Question> => {
  const requestUrl =
    `${CLOUD_FUNCTION_URL}answers?question=${question}`;
  return fetch(requestUrl)
    .then(checkStatus)
    .then(parseJSON)
    .then((data: Question) => data);
}

export const getAnswers = (question : string) :Promise<Answer[]> => {
  const requestUrl =
    `${CLOUD_FUNCTION_URL}answers?question=${question}`;
  return fetch(requestUrl)
    .then(checkStatus)
    .then(parseJSON)
    .then((data: Answer[]) => data);
}