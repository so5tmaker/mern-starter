import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './PostListItem.css';

function CommentListItem(props) {
  return (
    <div className={styles['single-post']}>
      <h3 className={styles['post-title']}>
      </h3>
      <p className={styles['author-name']}><FormattedMessage id="by" /> {props.comment.author}</p>
      <p className={styles['post-desc']}>{props.comment.comment}</p>
      <p className={styles['post-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deleteComment" /></a></p>
      <hr className={styles.divider} />
    </div>
  );
}

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CommentListItem;
