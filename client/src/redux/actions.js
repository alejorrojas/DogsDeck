import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const GET_NAME_DOG = "GET_NAME_DOG";
export const GET_ID_DOG = "GET_ID_DOG";
export const GET_TEMP = "GET_TEMP";
export const SET_LOADING = "SET_LOADING";
export const POST_DOG = "POST_DOG";
export const FILTER_DB = "FILTER_DB";
export const FILTER_API = "FILTER_API";
export const FILTER_TEMP = "FILTER_TEMP";
export const ORDER_NAME = "ORDER_NAME";
export const ORDER_WEIGHT = "ORDER_WEIGHT";
export const DELETE_DOG = "DELETE_DOG";
export const ERROR = "ERROR";
export const ADD_FAV = "ADD_FAV";
export const DELETE_FAV = "DELETE_FAV";
export const CLEAR = "CLEAR";
export const ORDER_HEIGHT = "ORDER_HEIGHT";

export const getDogs = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get("/dogs");
      return dispatch({
        type: GET_DOGS,
        payload: res.data,
      });
    } catch (e) {
      return dispatch({
        type: ERROR,
      });
    }
  };
};

export const findDogs = (name) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`/dogs?name=${name}`);
      return dispatch({
        type: GET_NAME_DOG,
        payload: res.data,
      });
    } catch (e) {
      return dispatch({
        type: ERROR,
      });
    }
  };
};

export const findId = (id) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`/dogs/${id}`);
      return dispatch({
        type: GET_ID_DOG,
        payload: res.data,
      });
    } catch (e) {
      return dispatch({
        type: ERROR,
      });
    }
  };
};

export const postDog = (data) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`/dogs`, data);
      return res;
    } catch (e) {
      return dispatch({
        type: ERROR,
      });
    }
  };
};

export const getTemps = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`/temperaments`);
      return dispatch({
        type: GET_TEMP,
        payload: res.data,
      });
    } catch (e) {
      return dispatch({
        type: ERROR,
      });
    }
  };
};

export const addFav = (payload) => {
  return { type: ADD_FAV, payload };
};
export const deleteFav = (id) => {
  return { type: DELETE_FAV, payload: id };
};

export const setLoading = () => {
  return { type: SET_LOADING };
};
export const setError = () => {
  return { type: ERROR };
};
export const setClear = () => {
  return { type: CLEAR };
};

export const deleteDog = (id) => {
  return async function (dispatch) {
    try {
      await axios.delete(`/delete/${id}`);
      return dispatch({
        type: DELETE_DOG,
      });
    } catch (e) {
      return dispatch({
        type: ERROR,
      });
    }
  };
};

export const orderHeight = (payload)=>{
  return {type: ORDER_HEIGHT, payload}
}



/*FILTROS Y ORDENAMIENTOS */

export const filterTemp = (temps) => {
  return { type: FILTER_TEMP, payload: temps };
};
export const orderName = (order) => {
  return { type: ORDER_NAME, payload: order };
};
export const orderWeight = (order) => {
  return { type: ORDER_WEIGHT, payload: order };
};

/* ENDPOINTS FILTRADOS */
export const filterDb = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`/dogs/filter/created`);
      return dispatch({
        type: FILTER_DB,
        payload: res.data,
      });
    } catch (e) {
      return dispatch({
        type: ERROR,
      });
    }
  };
};
export const filterApi = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`/dogs/filter/api`);
      return dispatch({
        type: FILTER_API,
        payload: res.data,
      });
    } catch (e) {
      return dispatch({
        type: ERROR,
      });
    }
  };
};
