import { ADD_POST, ADD_POSTS, DELETE_POST, ADD_COMMENT, ADD_COMMENTS, DELETE_COMMENT } from './PostActions';

// Initial State
const initialState = { data: [] };

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        data: [action.post, ...state.data],
      };

    case ADD_POSTS:
      return {
        data: action.posts,
      };

    case DELETE_POST:
      return {
        data: state.data.filter(post => post.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

export const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        data: [action.comment, ...state.data],
      };

    case ADD_COMMENTS:
      return {
        data: action.comments,
      };

    case DELETE_COMMENT:
      return {
        data: state.data.filter(comment => comment.comid !== action.comid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all comments
export const getComments = state => state.comments.data;

// Get comment by cuid
export const getComment = (state, comid) => state.comments.data.filter(comment => comment.comid === comid)[0];

// Get all posts
export const getPosts = state => state.posts.data;

// Get post by cuid
export const getPost = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0];

// Export Reducer
export default PostReducer;
