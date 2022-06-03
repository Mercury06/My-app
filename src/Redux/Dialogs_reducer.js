const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
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
          ]
    };

const dialogsReducer = (state = initialState, action) => {
      
    switch (action.type) {
        
            
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            };
       
        default:
            return state;
        }
    }
    export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody})
    
export default dialogsReducer;