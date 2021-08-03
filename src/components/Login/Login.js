import React from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm} from "redux-form";
import { Input } from '../common/FormsControls/FormsControls';
import { required } from '../Utils/validators/validators';
import { loginThunkCreator } from '../../Redux/Auth_reducer';
import {Redirect} from 'react-router-dom';
import style from "./../common/FormsControls/FormsControle.module.css"

const LoginForm = (props) => {
    console.log("RERENDER");
    return (
    <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder = {"Email"} name = {"email"} component={Input} 
                   validate={[required]} />
        </div>
        <div>
            <Field placeholder = {"Password"} name = {"password"} component={Input} 
                   validate={[required]} type={"password"}/>   
        </div>
        <div>
            <Field component={Input} name = {"rememberMe"} type ={"checkbox"}/> remember me
        </div>
        {props.error && <div className = {style.formSummaryError}>
            {props.error}
        </div>}
        <div>
            <button>Login</button>
        </div>
    </form>
    )
}

const LoginReduxForm = reduxForm ({ form: "login" }) (LoginForm)

const Login = (props) => {
    
    const onSubmit = (formData) => {
        console.log (formData);
        props.loginThunkCreator (formData.email, formData.password, formData.rememberMe );
    }
    
    if (props.isAuth) {
        return <Redirect to = {"/profile"} />
    }
    return <div>
                <h1>Login</h1>
                <LoginReduxForm onSubmit={onSubmit} />
            </div>
    }

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect (mapStateToProps, {loginThunkCreator}) (Login);