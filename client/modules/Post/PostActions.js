import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';

export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';

// Export Actions
export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function addPostRequest(post) {
  return (dispatch) => {
    return callApi('posts', 'post', {
      post: {
        name: post.name,
        title: post.title,
        content: post.content,
      },
    }).then(res => dispatch(addPost(res.post)));
  };
}

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  };
}

export function fetchPosts() {
  return (dispatch) => {
    return callApi('posts').then(res => {
      dispatch(addPosts(res.posts));
    });
  };
}

export function fetchPost(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`).then(res => dispatch(addPost(res.post)));
  };
}

export function deletePost(cuid) {
  return {
    type: DELETE_POST,
    cuid,
  };
}

export function deletePostRequest(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`, 'delete').then(() => dispatch(deletePost(cuid)));
  };
}

// Export Actions For Comments
export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  };
}

export function addCommentRequest(comment, cuid, comid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}/comments/${comid}`, 'post', {
      comment: {
        author: comment.name,
        comment: comment.comment,
      },
    }).then(res => dispatch(addComment(res.post.comments.filter(comments => comments.comid === req.params.comid)[0])));
  };
}

export function addComments(comments) {
  return {
    type: ADD_COMMENTS,
    comments,
  };
}

export function fetchComments() {
  return (dispatch) => {
    return callApi(`posts/${cuid}/comments`).then(res => {
      dispatch(addPosts(res.comments));
    });
  };
}

export function fetchComment(cuid, comid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}/comments/${comid}`).then(res => dispatch(addComment(res.comment)));
  };
}

export function deleteComment(cuid, comid) {
  return {
    type: DELETE_COMMENT,
    cuid,
    comid,
  };
}

export function deleteCommentRequest(cuid, comid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}/comments/${comid}`, 'delete').then(() => dispatch(deleteComment(cuid, comid)));
  };
}

export function editComment(cuid, comid) {
  return {
    type: EDIT_COMMENT,
    cuid,
    comid,
  };
}

export function editCommentRequest(cuid, comid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}/comments/${comid}`, 'put').then(() => dispatch(editComment(cuid, comid)));
  };
}