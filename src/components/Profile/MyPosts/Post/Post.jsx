import React from 'react';
import s from './Post.module.css'

const Post= (props) => {
   
    return ( 
            <div className={s.item}>
             <img src='https://yt3.ggpht.com/ytc/AAUvwnjblYh55yPUOpcpbx-Ug7sA83cKyGzzokpHXS3Y=s900-c-k-c0x00ffffff-no-rj'></img>
             {props.message}
             <div>
             <span>Like</span> {props.likesCount}
             </div>
            </div>
    ) 
}
export default Post;