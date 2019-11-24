import { Garden, GG } from '../constants/types';
import * as ACTION from './actions';

const initialState: GG = {
  username: '',
  garden: null,
  user: null,
  userAll: [],
  gardens: [],
  isLoading: 0,
  isError: false,
  plant: null,
  plantAll: [],
  searchQuestion: [],
  search: null,
  error: '',
  selectedGardenCell: [-1, -1],
  question: null,
  questions: [],
  selectedGarden: '',
  forecast: null,
  forecastIsError: false,
  forecastIsLoading: false,
  forecastError: '',
};

export const reducers = (state: GG = initialState, action: any) => {
  switch (action.type) {
    case ACTION.FETCHING_DATA:
      return {
        ...state,
        isLoading: state.isLoading ++,
        error: '',
      };

    case ACTION.FETCHING_DATA_FORECAST:
      return {
        ...state,
        forecastIsLoading: true,
        forecastError: '',
      };

    case ACTION.SET_SEARCH:
      return {
        ...state,
        search: action.search,
      };

    case ACTION.SET_SELECTED_GARDEN_CELL:
      return {
        ...state,
        selectedGardenCell: [action.x, action.y],
      };

    case ACTION.FETCHING_DATA_SUCCESS:
      return {
        ...state,
        isError: false,
        isLoading: state.isLoading --,
      };

    case ACTION.FETCHING_DATA_SUCCESS_FORECAST:
      return {
        ...state,
        forecastIsError: false,
        forecastIsLoading: false,
      };

    case ACTION.FETCHING_DATA_FAILURE:
      return {
        ...state,
        isLoading: 0,
        isError: true,
        error: action.error,
      };

    case ACTION.FETCHING_DATA_FAILURE_FORECAST:
      return {
        ...state,
        forecastIsError: true,
        forecastIsLoading: false,
        forecastError: action.error,
      };

    case ACTION.SET_PLANT:
      return {
        ...state,
        plant: action.plant,
      };

    case ACTION.SET_USERNAME:
      return {
        ...state,
        username: action.username,
      };

    case ACTION.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case ACTION.SET_SELECTED_GARDEN:
      return {
        ...state,
        selectedGarden: action.gardenName,
      };

    case ACTION.SET_GARDENS:
      return {
        ...state,
        gardens: action.gardens,
      };

    case ACTION.SET_FORECAST:
      return {
        ...state,
        forecast: action.forecast,
      };

    case ACTION.SET_PLANTSEARCH:
      return {
        ...state,
        plantAll: action.plants,
      };

    case ACTION.SET_GARDENSEARCH:
      return {
        ...state,
        gardens: action.gardens,
      };

    case ACTION.SET_USERSEARCH:
      return {
        ...state,
        userAll: action.users,
      };

    case ACTION.SEARCH_SET_QUESTION:
      return {
        ...state,
        searchQuestion: action.questions,
      };

    case ACTION.SET_GARDEN:
      const newGardens: Garden[] = [];

      state.user.gardens.forEach((g: Garden) => {
        if (g.name === action.garden.name) {
          newGardens.push(action.garden);
        } else {
          newGardens.push(g);
        }
      });
      const newUser = state.user;
      newUser.gardens = newGardens;
      return {
        ...state,
        user: newUser,
      };

    case ACTION.SET_QUESTIONS:
      return {
        ...state,
        questions: action.questions,
      };

    case ACTION.SET_QUESTION:
      return {
        ...state,
        question: action.question,
      };

    case ACTION.POST_NEW_QUESTION:
      return {
        ...state,
        question: action.question,
      };

    case ACTION.POST_NEW_ANSWER:
      return {
        ...state,
        answer: action.answer,
      };

    default:
      return state;
  }
};
