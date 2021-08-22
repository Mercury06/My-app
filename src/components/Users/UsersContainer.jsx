import React from 'react';
import {connect} from 'react-redux';
import { follow, unfollow, setCurrentPage, setUsers, setUsersTotalCount, toggleIsFetching, toggleFollowingprogress, 
        getUsersThunkCreator, followThunkCreator, unfollowThunkCreator } from '../../Redux/Users_reducer';
import Users from './Users';
import preloader from './../../assets/images/spin.gif';
import { compose } from 'redux';
import {receiveUsers, getPagesize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress} from "./../../Redux/Users-seletors";


const fetching_style = {
    height: '100px', 
    width: '100px'
}

class UsersContainer extends React.Component {
    
    componentDidMount () {
        
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);  
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize, this.props.currentPage );
        
       
    }
    
    render () {
        
        return <>
            { this.props.isFetching ? <img style={fetching_style} src={ preloader } /> : null }
            <Users totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      onPageChanged={this.onPageChanged}
                      users={this.props.users}
                      follow={this.props.follow}
                      unfollow={this.props.unfollow}
                      toggleFollowingprogress={this.props.toggleFollowingprogress} 
                      followingInProgress={this.props.followingInProgress}
                      followThunkCreator={this.props.followThunkCreator}
                      unfollowThunkCreator={this.props.unfollowThunkCreator} /> 
                </>
    }
}

let mapStateToProps = (state) => {
    
    return {
        users: receiveUsers(state),
        pageSize: getPagesize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose (
    //    withAuthRedirect,
        connect (mapStateToProps, {
                follow, 
                unfollow,
                setUsers,
                setCurrentPage,
                setUsersTotalCount,
                toggleIsFetching,
                toggleFollowingprogress,
                getUsersThunkCreator,
                followThunkCreator,
                unfollowThunkCreator })) (UsersContainer)