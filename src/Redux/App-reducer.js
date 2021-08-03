import { stopSubmit } from "redux-form";
import { authAPI } from "../Api/api";
import { getAuthUserDataThunkCreator } from "./Auth_reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';


let initialState = {
    initialized: false       
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state, 
                initialized: true
            }
        
        default:
            return state;
    }    
}

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS});

export const initializeApp = () => (dispatch) => {
    let promise = dispatch (getAuthUserDataThunkCreator());
    Promise.all([promise])
        .then (() => {
            dispatch(initializedSuccess());
    });    
}

// export const loginThunkCreator = (email, password, rememberMe) => (dispatch) => {
//     authAPI.login(email, password, rememberMe)
//             .then ( response => {
//                if (response.data.resultCode === 0) {
//                     dispatch (getAuthUserDataThunkCreator ());
//                } else {                   
//                    let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
//                    dispatch(stopSubmit("login", {_error: message}));
//                }
//             });
// }

// export const logoutThunkCreator = () => (dispatch) => {
//     authAPI.logout()
//             .then ( response => {
//                if (response.data.resultCode === 0) {
//                 dispatch (setAuthUserData (null, null, null, false));
//                }
//             });
// }

export default appReducer;