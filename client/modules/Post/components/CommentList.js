import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import CommentListItem from './PostListItem/CommentListItem';

function CommentList(props) {
  return (
    <div className="listView">
      {
        props.comments.map(comment => (
          <CommentListItem
            comment={comment}
            key={comment.comid}
            onDelete={() => props.handleDeleteComment(comment.comid)}
          />
        ))
      }
    </div>
  );
}

PostList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    comid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteComment: PropTypes.func.isRequired,
};

export default CommentList;
