import React from 'react';
import s from './Post.module.css'
import { LikeIcon } from '../../../common/Icons/Boxicons';
import cn from 'classnames';
import userPhoto from './../../../../assets/images/avaPost.jpg';

const Post= (props) => {
   
    return ( 
            <div className={s.item}>
                <div className={s.itemAvaBlock}>
                    <div className={s.imageBlock}><img  src={ props.avaUrl || userPhoto}></img></div>
                    <div><span>{ props.fullname || "anonimous" } </span></div>
                </div>
                <div className={s.messageBlock}>
                    <div className={ cn ( s.itemMessage, s.itemMessageLeft)}>
                        <div className={s.itemText}>{props.message}</div>
                    </div>
                    <div className={s.likesBlock}><span><LikeIcon /></span> {props.likesCount}</div>                    
                </div>                 
            </div>
    ) 
}
export default Post;