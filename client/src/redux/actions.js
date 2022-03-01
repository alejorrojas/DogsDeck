import axios from 'axios'

export const GET_DOGS = 'GET_DOGS'
export const FIND_DOGS = 'FIND_DOGS'




export const getDogs = ()=>{
    return  async function(dispatch){
        const res = await axios.get('http://localhost:3001/dogs')
        return dispatch({
            type: GET_DOGS,
            payload: res.data
        })
    }
}

export const findDogs = (name) =>{
    return async function(dispatch){
        const res = await axios.get(`http://localhost:3001/dogs?name=${name}`)
        return dispatch({
            type: FIND_DOGS,
            payload: res.data
        })
    }
}