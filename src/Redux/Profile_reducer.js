import { stopSubmit } from "redux-form";
import { usersAPI } from "../Api/api";
import { profileAPI } from "../Api/api";

const ADD_POST = 'ADD-POST';
//const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [
        {id:'1', message: 'Hi! how are you?', likesCount: 12},
        {id:'2', message: 'It`s my first post', likesCount: 11},
        {id:'3', message: 'Hello kitty!'},
        {id:'4', message: 'Z-z-z'},
        {id:'5', message: 'Z-z-z'},
        {id:'6', message: 'Z-z-z'}
      ],
    //newPostText: 'added texx',
    profile: null,
    status: 'initial status'
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
              };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
             
        }
        // case UPDATE_NEW_POST_TEXT: {
        //     return {
        //         ...state,
        //         newPostText: action.newText
        //     }
        // }
        case SET_STATUS: {
            debugger;
            return {
                ...state,
                status: action.status
            }
        }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile}
        }
        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos }}
        }
        default:
            return state;
    }    
    
}
export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})

export const getUserProfile = (userId) => async (dispatch) => {
    let response = await usersAPI.getProfile (userId);
    dispatch (setUserProfile (response.data)); 

} 

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus (userId)
    debugger;
    dispatch (setStatus (response.data)); 
} 

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus (status)
    debugger;
    if (response.data.resultCode === 0) {
        dispatch (setStatus (status));
}} 

export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto (file);
    if (response.data.resultCode === 0) {
        dispatch (savePhotoSuccess (response.data.data.photos));
}}

export const saveProfile = (profile) => async (dispatch, getState) => {
    
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile (profile);   

    if (response.data.resultCode === 0) {
       dispatch (getUserProfile (userId));
    } else {
        dispatch (stopSubmit ("edit-profile", {_error: response.data.messages}));
        return Promise.reject(response.data.messages);
    }
}
 

export default profileReducer;