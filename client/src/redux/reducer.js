import React from 'react'
import { FIND_DOGS, GET_DOGS } from './actions'

const initialState = {
    copyDogs: [],
    allDogs: [],
    temps: [],
    loading: true
}

const rootReducer = (state = initialState, action) => {
 
 switch(action.type){
    case GET_DOGS: 
    return {
        ...state,
        allDogs: action.payload,
        copyDogs: action.payload,
        loading: false
    }
    case FIND_DOGS: 
    return{
        ...state,
        allDogs: action.payload,
        loading: false
    }
    
     default:
         return state
 }

}

export default rootReducer