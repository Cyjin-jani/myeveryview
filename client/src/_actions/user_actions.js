import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    UPDATE_USER,
    ADD_TO_SCRAP,
    GET_SCRAP_ITEMS
    
} from './types';
import { USER_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

//유저 정보 업데이트 관련 액션
export function updateUser(dataToSubmit){
    // console.log('data 액션에 잘 넘어왔니?', dataToSubmit);
    const request = axios.post(`${USER_SERVER}/update`, dataToSubmit)
    .then(response => response.data);

    return {
        type: UPDATE_USER,
        payload: request
    }
}

//scrap관련 액션
export function addToScrap(id){
    // console.log('data 액션에 잘 넘어왔니?', id);
    let body = {
        reviewProductId: id
    }
    const request = axios.post(`${USER_SERVER}/addToScrap`, body)
    .then(response => response.data);

    return {
        type: ADD_TO_SCRAP,
        payload: request
    }
}


export function getScrapItems(scrapItems, userScrap){
    
    const request = axios.get(`/api/product/reviewProducts_by_id?id=${scrapItems}&type=array`)
    .then(response => {
        return response.data
    });

    return {
        type: GET_SCRAP_ITEMS,
        payload: request
    }
}





