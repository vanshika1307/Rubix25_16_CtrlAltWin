const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');
const {
  getAllPosts,
  createPost,
  likePost,
  addComment,
  deletePost,
  updatePost,
  deleteComment,
  updateComment
} = require('../controllers/posts');

// Public route - anyone can view posts
router.get('/', getAllPosts);

// Protected routes - require authentication
router.post('/', authenticateUser, createPost);
router.post('/:id/like', authenticateUser, likePost);
router.post('/:id/comments', authenticateUser, addComment);

// Add these new routes
router.delete('/:id', authenticateUser, deletePost);
router.patch('/:id', authenticateUser, updatePost);
router.delete('/:postId/comments/:commentId', authenticateUser, deleteComment);
router.patch('/:postId/comments/:commentId', authenticateUser, updateComment);

module.exports = router; 