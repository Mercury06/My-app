import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.scss';
import logo from './../../assets/images/myspacelogo.svg';

const Header = (props) => {
    
    return <header className={s.header}>
    <NavLink to = {'/'}>
    <div className={s.logoBlock}><img src={logo} alt='logo' /></div>
    </NavLink>
    <div className={s.logoutBlock}> 
        { props.isAuth ? <div> <b>{props.login}</b> <button className={s.loginButton} onClick={props.logoutThunkCreator}>Logout</button></div>
                       : <NavLink to = {'/login'}> <button className={s.loginButton}>Login</button> </NavLink>}
    </div>
    </header>
}
export default Header;