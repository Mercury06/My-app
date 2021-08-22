import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import styles from './users.module.scss';

let Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props}) => {
    
    return <div>
       
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalUsersCount={totalUsersCount} pageSize={pageSize} />
       <div className={styles.usersPortion}>
       {
           users.map( u => <User user={u} 
                                 followingInProgress={props.followingInProgress} 
                                 unfollowThunkCreator={props.unfollowThunkCreator}
                                 followThunkCreator={props.followThunkCreator} 
                                 key = {u.id} /> 
           
        )}
        </div>
    </div>    
}

export default Users;