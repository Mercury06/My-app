import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../../common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../Utils/validators/validators';
import s from './MyPosts.module.scss';
import Post from "./Post/Post"




const MyPosts = (props) => {
   
    let postsElements =
        props.posts.map (p => <Post key={p.id} avaUrl={p.avaUrl} message={p.message} fullname={p.fullName} 
                                    likesCount={p.likesCount} />);
    
    let newPostElement = React.createRef ();

    let onAddPost = (values) => {      
       
        let avaUrl = props.profile.photos.small;
        let fullName = props.profile.fullName;
        props.addPost(values.newPostText, avaUrl, fullName);
       
    }

   
    return ( 
        <div className={s.postsBlock}>
            <h3>My Posts </h3>
            <AddNewPostForm onSubmit={onAddPost}/>
            
            <div className={s.posts}>
            { postsElements }               
            </div>
        </div>
    )        
}

const maxLength50 = maxLengthCreator(50);

let AddNewPostForm = (props) => {
    
    return (
        <form onSubmit={props.handleSubmit}>
                <div>
                    <Field name="newPostText" component={Textarea} placeholder={"Post message"}
                           validate={[required, maxLength50]} />
                    
                 </div>
                <div>
                    <button > Add post</button>
                </div>
        </form>
    )
}

AddNewPostForm = reduxForm({form: "ProfileAddNewPostForm"})(AddNewPostForm);

export default MyPosts;