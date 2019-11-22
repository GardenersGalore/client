import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  getPlant,
  getGardens,
  getGarden,
  getPlantings,
  getGardenPlant,
  postPlanting,
  getUser,
  getAllPlant,
  getForecast,
} from '../api';
import { RootState, GG, Plant, SearchState, Garden, Planting, User, Forecast } from '../constants/types';

export const FETCHING_DATA = 'FETCHING_DATA';
export const FETCHING_DATA_SUCCESS = 'FETCHING_DATA_SUCCESS';
export const FETCHING_DATA_FAILURE = 'FETCHING_DATA_FAILURE';

export const FETCHING_DATA_FORECAST = 'FETCHING_DATA_FORECAST';
export const FETCHING_DATA_SUCCESS_FORECAST = 'FETCHING_DATA_SUCCESS_FORECAST';
export const FETCHING_DATA_FAILURE_FORECAST = 'FETCHING_DATA_FAILURE_FORECAST';

export const SET_FORECAST = 'SET_FORECAST';
export const SET_PLANT = 'SET_PLANT';
export const SET_USER = 'SET_USER';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_GARDENS = 'SET_GARDENS';
export const SET_GARDEN = 'SET_GARDEN';
export const SET_SEARCH = 'SET_SEARCH';
export const SET_SELECTED_GARDEN_CELL = 'SET_SELECTED_GARDEN_CELL';
export const SET_SELECTED_GARDEN = 'SET_SELECTED_GARDEN';
export const SET_GARDEN_HEIGHT = 'SET_GARDEN_HEIGHT';
export const SET_GARDEN_WIDTH = 'SET_GARDEN_WIDTH';
export const SET_PLANTSEARCH = 'SET_PLANTSEARCH';

export const ADD_PLANTING_TO_GARDEN = 'ADD_PLANTING_TO_GARDEN';

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

const setPlantSearch = (plants: Plant[]) => {
  return {
    type: SET_PLANTSEARCH,
    plants,
  };
};

export const setGarden = (garden: Garden) => {
  return {
    type: SET_GARDEN,
    garden,
  };
};

export const setUsername = (username: string) => {
  return {
    type: SET_USERNAME,
    username,
  };
};

export const setUser = (user: User) => {
  return {
    type: SET_USER,
    user,
  };
};

export const setForecast = (forecast : Forecast) => {
  return {
    type : SET_FORECAST,
    forecast
  }
}

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

export const setSelectedGarden = (gardenName: string) => {
  return {
    type: SET_SELECTED_GARDEN,
    gardenName,
  };
};

export const setGardenHeight = (newHeight: number) => {
  return {
    type: SET_GARDEN_HEIGHT,
    newHeight,
  };
};

export const setGardenWidth = (newWidth: number) => {
  return {
    type: SET_GARDEN_WIDTH,
    newWidth,
  };
};

export const addPlantingToGarden = (newPlanting: Planting) => {
  return {
    type: ADD_PLANTING_TO_GARDEN,
    newPlanting,
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


export const fetchingDataForecast = () => {
  return {
    type: FETCHING_DATA_FORECAST,
  };
};

const fetchingDataSuccessForecast = () => {
  return {
    type: FETCHING_DATA_SUCCESS_FORECAST,
  };
};

export const fetchingDataFailureForecast = (error: string) => {
  return {
    type: FETCHING_DATA_FAILURE_FORECAST,
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

export const getAllPlantData = (name: string) => {
  return async (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: any) => {
    dispatch(fetchingData());
    try {
      const results: Plant[] = await getAllPlant(name);
      console.log(results);
      dispatch(setPlantSearch(results));
      dispatch(fetchingDataSuccess());
    } catch (error) {
      dispatch(fetchingDataFailure(error.message));
    }
  };
};

export const getUserData = (username: string) => {
  return async (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: any) => {
    dispatch(fetchingData());
    try {
      const results: User = await getUser(username);
      console.log('RECEIVED USER', results);
      dispatch(setUser(results));
      dispatch(fetchingDataSuccess());
    } catch (error) {
      dispatch(fetchingDataFailure(error.message));
    }
  };
};

export const getGardenPlantData = (plant: string) => {
  return async (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: any) => {
    dispatch(fetchingData());
    try {
      const results: Garden[] = await getGardenPlant(plant);
      dispatch(setGardens(results));
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

export const getGardenData = (gardenName: string) => {
  return async (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: any) => {
    dispatch(fetchingData());
    try {
      console.log(`Getting: ${gardenName}`);
      const garden: Garden = await getGarden(gardenName);
      console.log(garden);
      const plantings: Planting[] = await getPlantings(gardenName);

      const unique = [...new Set(plantings.map(item => item.plant_name))];
      console.log('aa', garden);

      console.log('UNIQUE IS:');
      console.log(unique);

      await asyncForEach(unique, async (u: string) => {
        const uniquePlant = await getPlant(u);
        plantings.forEach((planting: Planting) => {
          if (planting.plant_name === u) {
            planting.plant = uniquePlant;
          }
        });
      });

      // THIS IS THE ROAD BLOCK!! :(
      // await asyncForEach(plantings, async (planting: Planting) => {
      //   planting.plant = await getPlant(planting.plant_name);
      // });
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

export const getForecastData = (city_name: string, country_name : string) => {
  return async (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: any) => {
    dispatch(fetchingDataForecast());
    try {
      const results: Forecast = await getForecast(city_name, country_name);
      console.log(results);
      dispatch(setForecast(results));
      dispatch(fetchingDataSuccessForecast());
    } catch (error) {
      dispatch(fetchingDataFailureForecast(error.message));
    }
  };
};
