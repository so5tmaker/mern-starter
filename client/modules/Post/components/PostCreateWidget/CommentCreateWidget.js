import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './PostCreateWidget.css';

export class CommentCreateWidget extends Component {
  addComment = () => {
    const authorRef = this.refs.author;
    const commentRef = this.refs.comment;
    if (authorRef.value && commentRef.value) {
      this.props.addComment(this.props, authorRef.value, commentRef.value);
      authorRef.value = commentRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${styles.appear}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewComment" /></h2>
          <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} ref="author" />
          <textarea placeholder={this.props.intl.messages.commentContent} className={styles['form-field']} ref="comment" />
          <a className={styles['post-submit-button']} href="#" onClick={this.addComment}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

CommentCreateWidget.propTypes = {
  addComment: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(CommentCreateWidget);
