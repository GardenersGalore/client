import { GG } from '../constants/types';
import * as ACTION from './actions';

const initialState: GG = {
  username: 'test',
  garden: null,
  user: null,
  gardens: [],
  isLoading: false,
  plant: null,
  search: null,
  error: '',
  selectedGardenCell: [-1, -1],
  question: null,
  questions: [],
};

export const reducers = (state: any = initialState, action: any) => {
  switch (action.type) {
    case ACTION.FETCHING_DATA:
      return {
        ...state,
        isLoading: true,
        error: '',
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
        isLoading: false,
      };

    case ACTION.FETCHING_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case ACTION.SET_PLANT:
      return {
        ...state,
        plant: action.plant,
      };

    case ACTION.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case ACTION.SET_GARDENS:
      return {
        ...state,
        gardens: action.gardens,
      };

    case ACTION.SET_GARDEN:
      return {
        ...state,
        garden: action.garden,
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
