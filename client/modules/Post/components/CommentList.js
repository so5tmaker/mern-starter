import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import CommentListItem from './PostListItem/CommentListItem';

function CommentList(props) {
  const newProps = props.props;
  const comments = newProps.post.comments;
  // if (comments) {
  return (
    <div className="listView">
      {
        comments.map(comment => (
          <CommentListItem
            comment={comment}
            key={comment.comid}
            onDelete={() => props.handleDeleteComment(newProps, comment.comid)}
          />
        ))
      }
    </div>
  );
  // } else {
  // return (<div className="listView"></div>);
  // }
}

CommentList.propTypes = {
  comment: PropTypes.arrayOf(PropTypes.shape({
    comid: PropTypes.string.isRequired,
  })).isRequired,
  post: PropTypes.arrayOf(PropTypes.shape({
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteComment: PropTypes.func.isRequired,
};

export default CommentList;
