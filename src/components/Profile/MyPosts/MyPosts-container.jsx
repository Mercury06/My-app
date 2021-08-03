import React from 'react';
import { connect } from 'react-redux';
import { addPostActionCreator, updateNewpostTextActionCreator } from '../../../Redux/Profile_reducer';
import store from '../../../Redux/Redux-store';

import MyPosts from './MyPosts';


const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
const mapDispatchToProps =(dispatch) => {
    return {
        // updateNewpostText: (text) => {
        //     let action = updateNewpostTextActionCreator (text)
        //     dispatch(action);
        // },
        addPost: (newPostText) => {
            dispatch(addPostActionCreator(newPostText));
        }
    }
}

const MyPostsContainer = connect (mapStateToProps, mapDispatchToProps) (MyPosts);

export default MyPostsContainer;