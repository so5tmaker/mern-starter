import { ADD_COMMENT, ADD_COMMENTS, DELETE_COMMENT } from './PostActions';

// Initial State
const initialState = { data: [] };

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

// Export Reducer
export default CommentReducer;
