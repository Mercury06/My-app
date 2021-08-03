import React from 'react';
import s from './ProfileInfo.module.css';
import {Preloader} from './../../common/preloader/Preloader';
import ProfileStatus from './ProfileStatus';
import ProfileStatuswithHooks from './ProfileStatuswithHooks';
import userPhoto from './../../../assets/images/ava_rez.jpg';
import { useState } from 'react';
import ProfileDataForm from "./ProfileDataForm";
import { saveProfile } from '../../../Redux/Profile_reducer';

const ProfileInfo = (props) => {
    //debugger;
    let [editMode, setEditMode] = useState(false);
    
    if (!props.profile) {
        return <img src='./../../../assets/images/spin.gif' />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto (e.target.files [0]);
        }
    }

    const onSubmit = (formData) => {           
        props.saveProfile (formData).then (
            () => {
                setEditMode(false);
            });
        }


    return ( 
        <div>
            <div className={s.img}>
                <img src="https://strahu-net.com/upload/iblock/3a1/elbrus_221.jpg" />
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large || userPhoto} className={s.mainPhoto} />
                { props.isOwner && <input type={'file'} onChange = {onMainPhotoSelected}/>}
                
                { editMode ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} /> 
                           : <ProfileData profile={props.profile} isOwner={props.isOwner} 
                                          toEditMode={ () => {setEditMode(true)}} />}
                <ProfileStatuswithHooks status={props.status} updateStatus={props.updateStatus} />
                <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
            </div>
        </div> 
        )  
    }

const ProfileData = ({profile, isOwner, toEditMode}) => {
    return <div>
                { isOwner && <div><button onClick={toEditMode}>edit</button></div> }
                    <div>
                        <b>Full name</b> {profile.fullName}
                    </div>
                    <div>
                        <b>UserId</b> {profile.userId}
                    </div>
                    <div>
                        <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
                    </div>
                    { profile.lookingForAJob &&
                    <div>
                        <b>My professional skills:</b> {profile.lookingForAJobDescription}
                    </div>}
                    <div>
                        <b>About me:</b> {profile.aboutMe}
                    </div>
                    <div>
                        <b>Contacts:</b> {Object.keys(profile.contacts).map(key =>{
                            return <Contacts contactTitle={key} key={key} contactValue={profile.contacts[key]} />
                        })}
                    </div>
    </div>
}

const Contacts = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;