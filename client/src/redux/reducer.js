import {
  GET_NAME_DOG,
  GET_DOGS,
  GET_ID_DOG,
  SET_LOADING,
  GET_TEMP,
  POST_DOG,
  FILTER_DB,
  FILTER_API,
  FILTER_TEMP,
} from "./actions";

const initialState = {
  copyDogs: [],
  allDogs: [],
  temps: [],
  detail: [],
  loading: true,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_TEMP:
      const temp = action.payload;
      const filterDogs = state.copyDogs.filter((dog) => {
        const find = dog.temperament?.filter((t) => t === action.payload);
        return find;
      });
      console.log("filter", filterDogs);
      return {
        ...state,
        // allDogs: filterDogs,
      };
    case FILTER_API:
      return {
        ...state,
        allDogs: action.payload,
      };
    case FILTER_DB:
      return {
        ...state,
        allDogs: action.payload,
      };
    case POST_DOG:
      return { ...state };
    case GET_TEMP:
      return {
        ...state,
        temps: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ID_DOG:
      return {
        ...state,
        detail: action.payload,
        loading: false,
      };
    case GET_DOGS:
      return {
        ...state,
        allDogs: action.payload,
        copyDogs: action.payload,
        loading: false,
      };
    case GET_NAME_DOG:
      return {
        ...state,
        allDogs: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default rootReducer;
