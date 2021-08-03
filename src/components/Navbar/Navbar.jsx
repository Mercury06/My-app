import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
       <nav className={s.nav}>
        <div className={s.item}>
          <NavLink to="/profile" activeClassName={s.activeLink}>profile</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/dialogs" activeClassName={s.activeLink}>messages</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/users" activeClassName={s.activeLink}>users</NavLink>
        </div>
        <div className={s.item}>
          <a>news</a>
        </div>
        <div className={s.item}>
          <a>music</a>
        </div>
        <div className={s.item}>
          <a>settings</a>
        </div>
      </nav>)
    }
    export default Navbar;