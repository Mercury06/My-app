import profileReducer from "./Profile_reducer";
import dialogsReducer from "./Dialogs_reducer";
import sidebarReducer from "./Sidebar_reducer";

let store = {
  _state : {
    
    profilePage: {
        posts: [
            {id:'1', message: 'Hi! how are you?', likesCount: 12},
            {id:'2', message: 'It`s my first post', likesCount: 11},
            {id:'3', message: 'Hello kitty!', likesCount: 12},
            {id:'4', message: 'Z-z-z', likesCount: 6},
            {id:'5', message: 'Z-z-z', likesCount: 2},
            {id:'6', message: 'Z-z-z', likesCount: 6}
          ],
        newPostText: 'added text'
    },
    dialogsPage: {
        messages: [
            {id:'1', message: 'Hi!'},
            {id:'2', message: 'How are you?'},
            {id:'3', message: 'Hello kitty!'},
            {id:'4', message: 'Z-z-z'},
            {id:'5', message: 'Z-z-z'},
            {id:'6', message: 'Z-z-z'}
          ],
        dialogs: [
            {id:'1', name: 'Dimych'},
            {id:'2', name: 'Andrey'},
            {id:'3', name: 'Sveta'},
            {id:'4', name: 'Sasha'},
            {id:'5', name: 'Victor'},
            {id:'6', name: 'Valera'}
          ],
        newMessageBody: ""
    }
  },
  _callSubscriber () {
    console.log('state changed')
  },

  getState () {
     return this._state;
  },
  subscribe (observer) {
    this._callSubscriber = observer;
  },
  

  dispatch (action) {
    this._state.profilePage = profileReducer (this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer (this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer (this._state.sidebar, action);

    this._callSubscriber (this._state);
  }
  
}

  window.store=store;

  export default store;