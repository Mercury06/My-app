import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import profileReducer from './Profile_reducer';
import dialogsReducer from './Dialogs_reducer';
import sidebarReducer from './Sidebar_reducer';
import usersReducer from "./Users_reducer";
import authReducer from "./Auth_reducer";
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from "./App-reducer";

let reducers = combineReducers ({
        profilePage: profileReducer,
        dialogsPage: dialogsReducer,
        sidebar: sidebarReducer,
        usersPage: usersReducer,
        auth: authReducer,
        form: formReducer,
        app: appReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//const store = createStore (reducer, composeEnhancers (applyMiddleware(...middleware)));

const store = createStore (reducers, composeEnhancers (applyMiddleware(thunkMiddleware)));
window.store = store;

export default store;