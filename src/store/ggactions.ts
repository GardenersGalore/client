import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getPlant } from '../api';
import { RootState, GG, Plant, SearchState } from '../constants/types';


export const FETCHING_DATA = 'FETCHING_DATA';
export const FETCHING_DATA_SUCCESS = 'FETCHING_DATA_SUCCESS';
export const FETCHING_DATA_FAILURE = 'FETCHING_DATA_FAILURE';

export const SET_PLANT = 'SET_PLANT';
export const SET_SEARCH = 'SET_SEARCH';


const setPlant = (plant: Plant) => {
    return {
      type: SET_PLANT,
      plant,
    };
};

export const setSearch = (search : SearchState) => {
  return {
    type: SET_SEARCH,
    search,
  };
};

export const fetchingData = () => {
  return {
    type: FETCHING_DATA,
  };
};

const fetchingDataSuccess = () => {
  return {
    type: FETCHING_DATA_SUCCESS,
  };
};

export const fetchingDataFailure = (error: string) => {
  return {
    type: FETCHING_DATA_FAILURE,
    error,
  };
};

export const getPlantData = (name : string) => {
  return async (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: any) => {
    dispatch(fetchingData());
    try {
        const results: Plant = await getPlant(
            name
        );
        dispatch(setPlant(results));
        dispatch(fetchingDataSuccess());
    } catch (error) {
      dispatch(fetchingDataFailure(error.message));
    }
  };
};

