import { GG } from '../constants/types';
import * as ACTION from './ggactions';

const initialState: GG = {
  isLoading: false,
  plant : null,
  search : null,
  error: '',
};

export const ggreducers = (state: any = initialState, action: any) => {
  switch (action.type) {
    case ACTION.FETCHING_DATA:
      return {
        ...state,
        isLoading: true,
        error: '',
      };

    case ACTION.SET_SEARCH:
      return{
        ...state,
        search: action.search,
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

    default:
      return state;
  }
};
