import { connect } from 'react-redux';
import { addPostActionCreator } from '../../../Redux/Profile_reducer';
import MyPosts from './MyPosts';


const mapStateToProps = (state) => {
    
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
const mapDispatchToProps =(dispatch) => {
    
    return {
        
        addPost: (newPostText, avaUrl, fullName) => {
            dispatch(addPostActionCreator(newPostText, avaUrl, fullName));
        }
    }
}

const MyPostsContainer = connect (mapStateToProps, mapDispatchToProps) (MyPosts);

export default MyPostsContainer;