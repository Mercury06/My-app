import React from 'react';
import { useState, useEffect } from 'react';
import s from './ProfileInfo.module.css';


const ProfileStatuswithHooks = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    React.useEffect = (() => {        
        setStatus(props.status);
    }, []);

    const activateEditMode = () => {
        
        setEditMode (true);
    }

    const deactivateEditMode = () => {
        setEditMode (false);
        props.updateStatus (status);
    }

    const onStatusChange = (e) => {
        
        setStatus (e.currentTarget.value)
        debugger;
    }
    
        return ( 
            <div>
                { !editMode &&
                <div>
                    <b>Status:</b><span onDoubleClick={activateEditMode}> {props.status || '++++'} </span>
                </div> 
                }
                { editMode &&
                <div>
                    <input onChange={onStatusChange} onBlur={deactivateEditMode} value={status} />
                </div> }
            </div>
        )  
    }
    

export default ProfileStatuswithHooks;