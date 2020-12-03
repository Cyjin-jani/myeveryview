import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    UPDATE_USER,
    ADD_TO_SCRAP,
    GET_SCRAP_ITEMS,
    REMOVE_SCRAP_ITEM,
} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case REGISTER_USER:
            return {...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case AUTH_USER:
            return {...state, userData: action.payload }
        case LOGOUT_USER:
            return {...state }
        case UPDATE_USER:
            return {...state, userSuccess: action.payload} //임시
        case ADD_TO_SCRAP:
            return {...state, 
                    userData: {
                        ...state.userData,
                        scrap: action.payload
                }}
        case GET_SCRAP_ITEMS:
            return { ...state, scrapDetail: action.payload }
        case REMOVE_SCRAP_ITEM:
            return { ...state, scrapDetail: action.payload.reviewInfo,
                userData: {...state.userData, scrap: action.payload.scrap}
            }
                    
        default:
            return state;
    }
}