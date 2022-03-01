import {
  GET_NAME_DOG,
  GET_DOGS,
  GET_ID_DOG,
  SET_LOADING,
  GET_TEMP,
  POST_DOG,
} from "./actions";

const initialState = {
  copyDogs: [],
  allDogs: [],
  temps: [],
  loading: true,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
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
        allDogs: action.payload,
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
