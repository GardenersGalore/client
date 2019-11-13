import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getPlant, getGardens, getGarden, getPlantings, getGardenPlant, postPlanting } from '../api';
import { RootState, GG, Plant, SearchState, Garden, Planting } from '../constants/types';

export const FETCHING_DATA = 'FETCHING_DATA';
export const FETCHING_DATA_SUCCESS = 'FETCHING_DATA_SUCCESS';
export const FETCHING_DATA_FAILURE = 'FETCHING_DATA_FAILURE';

export const SET_PLANT = 'SET_PLANT';
export const SET_GARDENS = 'SET_GARDENS';
export const SET_GARDEN = 'SET_GARDEN';
export const SET_SEARCH = 'SET_SEARCH';
export const SET_SELECTED_GARDEN_CELL = 'SET_SELECTED_GARDEN_CELL';
export const SET_GARDEN_HEIGHT = 'SET_GARDEN_HEIGHT';
export const SET_GARDEN_WIDTH = 'SET_GARDEN_WIDTH';

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

export const setGarden = (garden: Garden) => {
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

export const getGardenData = (garden_name: string) => {
  return async (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: any) => {
    dispatch(fetchingData());
    try {
      console.log(`Getting: ${garden_name}`);
      const garden: Garden = await getGarden(garden_name);
      console.log(garden);
      const plantings: Planting[] = await getPlantings(garden_name);

      const unique = [...new Set(plantings.map(item => item.plant_name))];
      console.log('aa', garden);

      console.log('UNIQUE IS:');
      console.log(unique);

      await asyncForEach(unique, async (u: string) => {
        const unique_plant = await getPlant(u);
        plantings.forEach((planting: Planting) => {
          if (planting.plant_name === u) {
            planting.plant = unique_plant;
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

// export const postPlantingData = ( planting : Planting )=> {
//   return async (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: any) => {
//     dispatch(fetchingData());
//     try {
//       console.log(`Getting: ${garden_name}`);
//       const garden: Garden = await getGarden(garden_name);
//       console.log(garden);
//       const plantings: Planting[] = await getPlantings(garden_name);

//       await asyncForEach(plantings, async (planting: Planting) => {
//         planting.plant = await getPlant(planting.plant_name);
//       });

//       garden.plantings = plantings;
//       dispatch(setGarden(garden));
//       dispatch(fetchingDataSuccess());
//     } catch (error) {
//       dispatch(fetchingDataFailure(error.message));
//     }
//   };
// };
