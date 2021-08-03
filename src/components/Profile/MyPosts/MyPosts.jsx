import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../../common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../Utils/validators/validators';
//import { addPostActionCreator, updateNewpostTextActionCreator } from '../../../Redux/Profile_reducer';
import s from './MyPosts.module.css';
import Post from "./Post/Post"




const MyPosts = (props) => {

    let postsElements =
        props.posts.map (p => <Post key={p.id} message={p.message} likesCount={p.likesCount} />);
    
    let newPostElement = React.createRef ();

    let onAddPost = (values) => {
        props.addPost(values.newPostText);
        //props.dispatch (addPostActionCreator());
        //newPostElement.current.value = '';
        //props.updateNewpostText ('');
    }

    // let onPostChange = () => {     // delete т.к. обновл на кажд нажатие поста заменено redux-form
        
    //     let text = newPostElement.current.value;
    //     props.updateNewpostText (text);
    //     //props.dispatch ({type: 'UPDATE-NEW-POST-TEXT', newText: text });
    //     //let action = updateNewpostTextActionCreator (text);
    //     //props.dispatch (action);
    // }
    
    return ( 
        <div className={s.postsBlock}>
            <h3>My Posts </h3>
            <AddNewPostForm onSubmit={onAddPost}/>
            
            <div className={s.posts}>
                { postsElements }
                {/*<Post message={postsData[0].message} likesCount={postsData[0].likesCount} />
                <Post message={postsData[1].message} likesCount={postsData[1].likesCount} />*/}
            </div>
        </div>
    )        
}

const maxLength10 = maxLengthCreator(10);

let AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
                <div>
                    <Field name="newPostText" component={Textarea} placeholder={"Post message"}
                           validate={[required, maxLength10]} />
                    
                 </div>
                <div>
                    <button > Add post</button>
                </div>
        </form>
    )
}

AddNewPostForm = reduxForm({form: "ProfileAddNewPostForm"})(AddNewPostForm);

export default MyPosts;