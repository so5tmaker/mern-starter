import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './PostCreateWidget.css';

export class CommentEditWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: {},
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      comment: this.props.comment,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log('this.props', this.props);
    const authorRef = this.refs.author;
    const commentRef = this.refs.comment;
    if (authorRef.value && commentRef.value) {
      authorRef.value = commentRef.value = '';
      this.setState({ comment: {} });
      this.props.editComment(this.props);
    }
  }

  onChange = (e) => {
    const state = this.state.comment;
    state[e.target.name] = e.target.value;
    this.setState({ comment: state });
  }

  render() {
    const cls = `${styles.form} ${(this.props.showEditPost ? styles.appear : '')}`;
    return (
      <div className={cls} id="myForm">
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="editComment" /></h2>
          <form onSubmit={this.onSubmit}>
            <input
              placeholder={this.props.intl.messages.authorName}
              name="author" value={this.state.comment.author} onChange={this.onChange}
              className={styles['form-field']} ref="author"
            />
            <textarea
              placeholder={this.props.intl.messages.commentContent}
              name="comment" value={this.state.comment.comment} onChange={this.onChange}
              className={styles['form-field']} ref="comment"
            />
            <button type="submit" className={styles['post-submit-button']}><FormattedMessage id="submit" /></button>
          </form>
        </div>
      </div>
    );
  }
}

CommentEditWidget.propTypes = {
  editComment: PropTypes.func.isRequired,
  comment: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    comid: PropTypes.string.isRequired,
  })).isRequired,
  showEditPost: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(CommentEditWidget);
