import React from 'react';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import { Redirect, Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileInfo/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import {connect} from "react-redux";
import {initializeApp} from "./Redux/App-reducer";
import {compose} from "redux";
import preloader from './assets/images/spin.gif';
import PagePlugNotFound from './pages/404.jsx';
import PageDev from './pages/PageEmpty';


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
      return <img style={fetching_style} src={ preloader } alt="Loading..."/>
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
        <Switch>
          <Route exact path='/' render={() => <Redirect  from="/" to = {'/profile'} />} />

          <Route path='/dialogs' render={() => <DialogsContainer />} />

          <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
          
          <Route path='/users' render={() => <UsersContainer />} />

          <Route path='/news' render={() => <PageDev />} />

          <Route path='/music' render={() => <PageDev />} />

          <Route path='/about' render={() => <UsersContainer />} />

          <Route path='/settings' render={() => <PageDev />} />

          <Route path='/login' render={() => <Login />} />

          <Route path='*' render={() => <PagePlugNotFound />} />
        </Switch>
        </div>
      </div>
    )}};

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default compose (
  withRouter,
  connect (mapStateToProps, {initializeApp})) (App);
