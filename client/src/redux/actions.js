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

export const getDogs = () => {
  return async function (dispatch) {
    const res = await axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: GET_DOGS,
      payload: res.data,
    });
  };
};

export const findDogs = (name) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`http://localhost:3001/dogs?name=${name}`);
      return dispatch({
        type: GET_NAME_DOG,
        payload: res.data,
      });
    } catch (e) {
      alert("Sorry, we couldn't find your dog :(");
    }
  };
};

export const findId = (id) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`http://localhost:3001/dogs/${id}`);
      return dispatch({
        type: GET_ID_DOG,
        payload: res.data,
      });
    } catch (e) {
      alert("Sorry, we couldn't find your dog :(");
    }
  };
};

export const postDog = (data) => {
  return async function () {
    try {
      const res = await axios.post(`http://localhost:3001/dog`, data);
      return res;
    } catch (e) {
      alert("Sorry, we couldn't create your dog :p");
    }
  };
};

export const getTemps = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`http://localhost:3001/temperament`);
      return dispatch({
        type: GET_TEMP,
        payload: res.data,
      });
    } catch (e) {
      alert("Sorry, something went wrong");
    }
  };
};

export const setLoading = () => {
  return { type: SET_LOADING };
};

export const filterTemp = (temps) => {
  return { type: FILTER_TEMP, payload: temps};
};

/* ENDPOINTS FILTRADOS */
export const filterDb = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`http://localhost:3001/created`);
      return dispatch({
        type: FILTER_DB,
        payload: res.data,
      });
    } catch (e) {
      alert("Sorry, something went wrong");
    }
  };
};
export const filterApi = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`http://localhost:3001/api`);
      return dispatch({
        type: FILTER_API,
        payload: res.data,
      });
    } catch (e) {
      alert("Sorry, something went wrong");
    }
  };
};
