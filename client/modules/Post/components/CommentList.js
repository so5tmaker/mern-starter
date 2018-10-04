import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import CommentListItem from './PostListItem/CommentListItem';

function CommentList(props) {
  const self = props.self;
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
            onEdit={() => props.handleEditComment(self, comment)}
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
  handleDeleteComment: PropTypes.func.isRequired,
  handleEditComment: PropTypes.func.isRequired,
};

export default CommentList;
