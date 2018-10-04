import Post from '../models/post';
import Comment from '../models/comment';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getPosts(req, res) {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addPost(req, res) {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    res.status(403).end();
  }

  const newPost = new Post(req.body.post);

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: saved });
  });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getPost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deletePost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addComment(req, res) {
  if (!req.body.comment.comment || !req.body.comment.author) {
    res.status(403).end();
  }

  Post.findOne({ cuid: req.params.cuid }).exec((errFind, post) => {
    if (errFind) {
      res.status(500).send(errFind);
    }

    const newComment = new Comment(req.body.comment);

    // Let's sanitize inputs
    newComment.author = sanitizeHtml(newComment.author);
    newComment.comment = sanitizeHtml(newComment.comment);
    newComment.comid = cuid();

    post.comments.push(newComment);

    post.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ post: saved });
    });
  });
}

/**
 * Get all commetns
 * @param req
 * @param res
 * @returns void
 */
export function getComments(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ comments: post.comments });
  });
}

/**
 * Get a single comment
 * @param req
 * @param res
 * @returns void
 */
export function getComment(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ comment: post.comments.filter(comments => comments.comid === req.params.comid)[0] });
  });
}

/**
 * Delete a comment
 * @param req
 * @param res
 * @returns void
 */
export function deleteComment(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((errFind, post) => {
    if (errFind) {
      res.status(500).send(errFind);
    }
    const list = post.comments;
    for (let i = list.length; i--;) {
      if (list[i].comid === req.params.comid) {
        list.splice(i, 1);
      }
    }
    post.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ post: saved });
    });
  });
}

/**
 * Edit a comment
 * @param req
 * @param res
 * @returns void
 */
export function putComment(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((errFind, post) => {
    if (errFind) {
      res.status(500).send(errFind);
    }

    if (post != null) {
      if (req.body.comment) {
        const newComment = new Comment(req.body.comment);
        const list = post.comments;
        for (let i = list.length; i--;) {
          if (list[i].comid === req.params.comid) {
            list.splice(i, 1);
            list.splice(i, 0, newComment);
            break;
          }
        }
        console.log('list', list);
        post.save((err, saved) => {
          console.log('err', err);
          if (err) {
            res.status(500).send(err);
          }
          res.json({ post: saved });
        });
      }
    }
  });
}

