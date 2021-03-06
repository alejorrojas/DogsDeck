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
  ORDER_NAME,
  ORDER_WEIGHT,
  DELETE_DOG,
  ERROR,
  ADD_FAV,
  DELETE_FAV,
  CLEAR,
  ORDER_HEIGHT,
} from "./actions";

const initialState = {
  copyDogs: [],
  allDogs: [],
  temps: [],
  detail: [],
  favs: [],
  loading: true,
  error: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR:
      return {
        ...state,
        allDogs: [...state.copyDogs],
      };
    case ADD_FAV:
      return {
        ...state,
        favs: [...state.favs, action.payload],
      };
    case DELETE_FAV:
      return {
        ...state,
        favs: state.favs.filter((dog) => dog.id !== action.payload.id),
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        error: !state.error,
      };
    case DELETE_DOG:
      return { ...state };
    case ORDER_NAME:
      const orderName = state.copyDogs.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        else return 0;
      });
      if (action.payload === "A-Z") {
        return {
          ...state,
          allDogs: orderName,
        };
      } else {
        return {
          ...state,
          allDogs: orderName.reverse(),
        };
      }
    case ORDER_HEIGHT: 
      const orderHeight = state.copyDogs.sort((a,b)=>{
        const heightA = a.height.split("-")
        const heightB = b.height.split("-")

        const numberA1 = Number(heightA.at(0))
        const numberA2 = Number(heightA.at(2))
        const numberB1 = Number(heightB.at(0))
        const numberB2 = Number(heightB.at(2))

        const resultA = (numberA1+numberA2)/2
        const resultB = (numberB1+numberB2)/2

        return resultA - resultB
      })

      if(action.payload ==='lessheight'){
        return{
          ...state,
          allDogs: orderHeight
        }
      }
      else{
        return{
          ...state,
          allDogs: orderHeight.reverse()
        }
      }


    case ORDER_WEIGHT:
      const orderWeight = state.copyDogs.sort((a, b) => {
        const weightA = a.weight.split(" ");
        const weightB = b.weight.split(" ");

        return Number(weightA.at(0)) - Number(weightB.at(0));
      });
      if (action.payload === "lessweight") {
        return {
          ...state,
          allDogs: orderWeight,
        };
      } else {
        return {
          ...state,
          allDogs: orderWeight.reverse(),
        };
      }
    case FILTER_TEMP:
      const filterDogs = state.copyDogs.filter((dog) =>
        dog.temperament?.includes(action.payload)
      );

      return {
        ...state,
        allDogs: filterDogs,
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
        error: false,
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
