import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/PostListItem/PostListItem.css';

// Import Components
import CommentCreateWidget from '../../components/PostCreateWidget/CommentCreateWidget';
import CommentEditWidget from '../../components/PostCreateWidget/CommentEditWidget';
import CommentList from '../../components/CommentList';

// Import Actions
import { addCommentRequest, deleteCommentRequest, editCommentRequest, fetchPost } from '../../PostActions';

// Import Selectors
import { getPost } from '../../PostReducer';
import { getComments } from '../../CommentReducer';

class PostDetailPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: [],
    }
  }

  componentDidMount() {
    // this.props.dispatch(fetchPost(params.cuid));
  }

  handleAddComment(props, author, comment) {
    const self = props.props;
    self.dispatch(addCommentRequest({ author, comment }, self.post.cuid));
  }

  handleDeleteComment(props, comid) {
    if (confirm('Do you want to delete this comment?')) { // eslint-disable-line
      props.dispatch(deleteCommentRequest(props.params.cuid, comid));
    }
  }

  handleEditComment(self, props, comment) {
    self.setState({comment: comment});
    console.log('this', self, self.state.comment);
    //props.dispatch(editCommentRequest(props.post.cuid, comment));
  }

  handlePutComment(self, props, comment) {
    //self.setState({comment: comment});
    //console.log('this', self);
    //props.dispatch(editCommentRequest(props.post.cuid, comment));
  }

  render() {
    return (
      <div>
        <Helmet title={this.props.post.title} />
        <div className={`${styles['single-post']} ${styles['post-detail']}`}>
          <h3 className={styles['post-title']}>{this.props.post.title}</h3>
          <p className={styles['author-name']}><FormattedMessage id="by" /> {this.props.post.name}</p>
          <p className={styles['post-desc']}>{this.props.post.content}</p>
        </div>
        <CommentList handleDeleteComment={this.handleDeleteComment}
          handleEditComment={this.handleEditComment}
          props={this.props}
          self={this}
        />
        <CommentCreateWidget addComment={this.handleAddComment}
          props={this.props}
          comment={this.state.comment}
        />
        <CommentEditWidget editComment={this.handlePutComment}
          props={this.props}
          comment={this.state.comment}
        />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in server side.
PostDetailPage.need = [params => {
  return fetchPost(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    post: getPost(state, props.params.cuid),
    comments: getComments(state),
  };
}

PostDetailPage.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

PostDetailPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(PostDetailPage);
