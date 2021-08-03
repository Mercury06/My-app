import React from 'react';
import s from './Dialogs.module.css';
import {NavLink, Redirect} from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem'; 
import Message from './Message/Message';
import { sendMessageCreator, updateNewMessageBodyCreator } from '../../Redux/Dialogs_reducer';
import Login from '../Login/Login';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../Utils/validators/validators';

const Dialogs = (props) => {
    
    let state = props.dialogsPage;
    
    let dialogsElements = state.dialogs.map ( d => <DialogItem name = {d.name} key={d.id} id={d.id} />);
    let messagesElements = state.messages.map ( m => <Message message ={m.message} key={m.id} />);
    let newMessageBody = state.newMessageBody;
   
    // let onSendMessageClick = () => {
    //     props.sendMessage();
    // }
    // let onNewMessageChange = (e) => {
    //     let body = e.target.value;
    //     props.updateNewMessageBody(body);
    // }

    let addNewMessage = (values) => {
        props.sendMessage (values.newMessageBody);
    } 
    if (!props.isAuth) return <Redirect to ={"/login"} />

    return (
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>    
                <div className={s.messages}>
                    <div>{messagesElements}</div>
                    {/* <form>
                        <div><textarea value = {newMessageBody} 
                                       onChange = {onNewMessageChange}
                                       placeholder='Enter your message'></textarea></div>
                        <div><button onClick={onSendMessageClick}>Send</button></div>
                    </form>                   */}
                    <AddMessageFormRedux onSubmit = {addNewMessage}/> 
                </div>
            </div>
    )
}

const maxLength50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
    return (
        <form onSubmit = {props.handleSubmit}>
                <div>
                    <Field component = {Textarea} name = "newMessageBody" placeholder="Enter your message" 
                           validate={[required, maxLength50]}/>
                </div>
                <div><button>Send</button></div>
        </form>    
    )
}

const AddMessageFormRedux = reduxForm ({form: "dialogAddMessageForm"}) (AddMessageForm);

export default Dialogs;