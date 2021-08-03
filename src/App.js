import React from 'react';
import './App.css';
//import Dialogs from './components/Dialogs/Dialogs';
//import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route } from "react-router-dom";
import { withRouter } from 'react-router';
//import store, { addPost } from './Redux/state';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileInfo/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import {connect} from "react-redux";
import {initializeApp} from "./Redux/App-reducer";
import {compose} from "redux";
import preloader from './assets/images/spin.gif';

const fetching_style = {
  height: '100px', 
  width: '100px'
}

class App extends React.Component {
  componentDidMount(props) {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) {
      return <img style={fetching_style} src={ preloader } />
    }

    return (
      //<BrowserRouter>
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>

          <Route path='/dialogs' render={() => <DialogsContainer />} />

          <Route path='/profile/:userId?' render={() => <ProfileContainer />} />

          <Route path='/users' render={() => <UsersContainer />} />

          <Route path='/login' render={() => <Login />} />

        </div>
      </div>)
  }
  //</BrowserRouter>)
};

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default compose (
  withRouter,
  connect (mapStateToProps, {initializeApp})) (App);
