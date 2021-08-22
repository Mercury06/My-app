import React from 'react';
import styles from './users.module.scss';
import userPhoto from '../../assets/images/ava_rez.jpg';
import { NavLink } from 'react-router-dom';


let User = ({user,followingInProgress, unfollowThunkCreator, followThunkCreator }) => {
    let u = user;
    
    return (
      
        <div className={styles.userCard}>
            
                <div className={styles.avatar}>
                    <NavLink to = {'/profile/' + u.id}>
                    <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto} />
                    </NavLink>
                </div>
               
               
                    <div className={styles.userInfo}>
                        <div><b>{u.name}</b></div> 
                        <div>Status {u.status}</div>                 
                        <div>{'Country'}</div>
                        <div>{'City'}</div>
                    </div>
                    <div className={styles.followButton}>
                         { u.followed 
                            ? <button className={styles.button} disabled={ followingInProgress.some(id=>id===u.id)} 
                              onClick={()=> { unfollowThunkCreator (u.id);
                        
                         } }>Unfollow</button>

                            :<button className={styles.button} disabled={ followingInProgress.some(id=>id===u.id)} 
                             onClick={()=> { followThunkCreator(u.id);
                        
                        } }>Follow</button>}
                    </div>            
            
       </div>)
        }

export default User;