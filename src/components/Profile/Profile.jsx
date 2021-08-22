import React from 'react';
import MyPostsContainer from './MyPosts/MyPosts-container';
import ProfileInfo from "./ProfileInfo/ProfileInfo"

const Profile = (props) => {
  
  return ( 
    <div>
        <ProfileInfo profile={props.profile} status={props.status} 
                     isOwner = {props.isOwner} updateStatus={props.updateStatus} 
                     savePhoto={props.savePhoto} saveProfile={props.saveProfile} />
        { props.isOwner && <MyPostsContainer profile = {props.profile} />}       
    </div> 
  )  
}
export default Profile;