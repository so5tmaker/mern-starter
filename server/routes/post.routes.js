import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
const router = new Router();

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(PostController.deletePost);

// Get all Comments
router.route('/posts/:cuid/comments').get(PostController.getComments);

// Add a new Comment
router.route('/posts/:cuid/comments/').post(PostController.addComment);

// Get one comment by cuid
router.route('/posts/:cuid/comments/:comid').get(PostController.getComment);

// Delete a comment by cuid
router.route('/posts/:cuid/comments/:comid').delete(PostController.deleteComment);

export default router;
