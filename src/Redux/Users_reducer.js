import { usersAPI } from "../Api/api";


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'


let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 5,
    isFetching: true,
    followingInProgress: []  
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state, 
                users: state.users.map ( u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }

        case UNFOLLOW:
            return {
                ...state, 
                users: state.users.map ( u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        
        case SET_USERS: {
            return { ...state, users: action.users }
            }

        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage  }
            }

        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count }
            }
        
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return { ...state, 
                     followingInProgress: action.isFetching 
                        ? [...state.followingInProgress, action.userId] 
                        : [state.followingInProgress.filter(id=>id !== action.userId)] 
                    }
            }
                
        default:
            return state;
    }    
    
}
export const follow = (userId) => ({ type: FOLLOW, userId })
export const unfollow = (userId) => ({ type: UNFOLLOW, userId }) 
export const setUsers = (users) => ({ type: SET_USERS, users }) 
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage }) 
export const setUsersTotalCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount }) 
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching }) 
export const toggleFollowingprogress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId }) 

export const getUsersThunkCreator = (currentPage, pageSize) => {
    
    return (dispatch) => {
        dispatch (toggleIsFetching (true));

        usersAPI.getUsers(currentPage, pageSize).then ( data => {
            dispatch (toggleIsFetching (false));
            dispatch (setUsers (data.items)); 
            dispatch (setUsersTotalCount (data.totalCount));
            dispatch (setCurrentPage (currentPage));
                       
        });
    }   
}

export const followThunkCreator = (userId) => {
    
    return (dispatch) => {
        dispatch (toggleFollowingprogress(true, userId));
        usersAPI.follow(userId)
        // axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, 
        // {withCredentials: true,
        // headers: {
        //     "API-KEY": "2f7e0949-cb64-4e72-9959-b867ce96f15c"
        // }})
            .then ( response => {
                if (response.data.resultCode == 0) {
                    dispatch (follow (userId));
                    }
                    dispatch (toggleFollowingprogress(false, userId));                    
                });                       
    }   
}

export const unfollowThunkCreator = (userId) => {
    
    return (dispatch) => {
        dispatch (toggleFollowingprogress(true, userId));
        usersAPI.unfollow(userId)
        // axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, 
        // {withCredentials: true,
        // headers: {
        //     "API-KEY": "2f7e0949-cb64-4e72-9959-b867ce96f15c"
        // }})
            .then ( response => {
                if (response.data.resultCode == 0) {
                    dispatch (unfollow (userId));
                    }
                    dispatch (toggleFollowingprogress(false, userId));                    
                });                       
    }   
}
export default usersReducer;