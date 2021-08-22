import React from 'react';
import s from './ProfileInfo.module.scss';
import ProfileStatuswithHooks from './ProfileStatuswithHooks';
import userPhoto from './../../../assets/images/ava_rez.jpg';
import { useState } from 'react';
import ProfileDataForm from "./ProfileDataForm";
import {UploadIcon} from './../../common/Icons/Boxicons';


const ProfileInfo = (props) => {
    
    let [editMode, setEditMode] = useState(false);
    
    if (!props.profile) {
        return <img src='./../../../assets/images/spin.gif' alt="Loading..."/>
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
                  
            <div className={s.descriptionBlock}>
            <div className={s.avatarWrapper}>    
                
                <img src={props.profile.photos.large || userPhoto} className={s.mainPhoto} />
                { props.isOwner && <div className={s.spanText}><div className={s.spanStyle}><label for={"inputId"} className={s.labelStyle}><UploadIcon /> Set new avatar</label></div></div> }
                
                { props.isOwner && 
                <div className={s.inputWrapper}> 
                    <input className={s.inputButton} type={'file'} id={'inputId'} onChange = {onMainPhotoSelected}/>
          
                </div>}
            </div>
                { editMode ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} /> 
                           : <ProfileData profile={props.profile} isOwner={props.isOwner} 
                                          toEditMode={ () => {setEditMode(true)}} />}
                <ProfileStatuswithHooks status={props.status} updateStatus={props.updateStatus} />
          
            </div> 
        )  
    }

const ProfileData = ({profile, isOwner, toEditMode}) => {
    return <div>
                { isOwner && <div className={s.profileButton}><button onClick={toEditMode}>edit profile </button></div> }
                    <div style={{ marginTop: '18px'}}>
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
    </div>
}

const Contacts = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;