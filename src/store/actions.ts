import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getPlant, getGardens, getGarden, getPlantings } from '../api';
import { RootState, GG, Plant, SearchState, Garden, Planting } from '../constants/types';

export const FETCHING_DATA = 'FETCHING_DATA';
export const FETCHING_DATA_SUCCESS = 'FETCHING_DATA_SUCCESS';
export const FETCHING_DATA_FAILURE = 'FETCHING_DATA_FAILURE';

export const SET_PLANT = 'SET_PLANT';
export const SET_GARDENS = 'SET_GARDENS';
export const SET_GARDEN = 'SET_GARDEN';
export const SET_SEARCH = 'SET_SEARCH';
export const SET_SELECTED_GARDEN_CELL = 'SET_SELECTED_GARDEN_CELL';

const setPlant = (plant: Plant) => {
  return {
    type: SET_PLANT,
    plant,
  };
};

const setGardens = (gardens: Garden[]) => {
  return {
    type: SET_GARDENS,
    gardens,
  };
};

const setGarden = (garden: Garden) => {
  return {
    type: SET_GARDEN,
    garden,
  };
};

export const setSearch = (search: SearchState) => {
  return {
    type: SET_SEARCH,
    search,
  };
};

export const setSelectedGardenCell = (x: number, y: number) => {
  return {
    type: SET_SELECTED_GARDEN_CELL,
    x,
    y,
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

export const getPlantData = (name: string) => {
  return async (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: any) => {
    dispatch(fetchingData());
    try {
      const results: Plant = await getPlant(name);
      dispatch(setPlant(results));
      dispatch(fetchingDataSuccess());
    } catch (error) {
      dispatch(fetchingDataFailure(error.message));
    }
  };
};

export const getGardensData = (username: string) => {
  return async (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: any) => {
    dispatch(fetchingData());
    try {
      console.log(`Getting gardens for: ${username}`);
      const results: Garden[] = await getGardens(username);
      console.log(results);
      dispatch(setGardens(results));
      dispatch(fetchingDataSuccess());
    } catch (error) {
      dispatch(fetchingDataFailure(error.message));
    }
  };
};

async function asyncForEach(array: any[], callback: any) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export const getGardenData = (garden_name: string) => {
  return async (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: any) => {
    dispatch(fetchingData());
    try {
      console.log(`Getting: ${garden_name}`);
      const garden: Garden = await getGarden(garden_name);
      console.log(garden);
      const plantings: Planting[] = await getPlantings(garden_name);

      await asyncForEach(plantings, async (planting: Planting) => {
        planting.plant = await getPlant(planting.plant_name);
      });

      garden.plantings = plantings;
      dispatch(setGarden(garden));
      dispatch(fetchingDataSuccess());
    } catch (error) {
      dispatch(fetchingDataFailure(error.message));
    }
  };
};
