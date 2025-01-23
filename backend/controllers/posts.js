const Post = require('../models/Post');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError, UnauthorizedError } = require('../errors');

const getAllPosts = async (req, res) => {
  const posts = await Post.find({})
    .populate('user', 'name')
    .populate('comments.user', 'name')
    .sort('-createdAt');
  res.status(StatusCodes.OK).json({ posts });
};

const createPost = async (req, res) => {
  req.body.user = req.user.userId;
  const post = await Post.create(req.body);
  
  // Populate user info before sending response
  const populatedPost = await Post.findById(post._id)
    .populate('user', 'name')
    .populate('comments.user', 'name');
    
  res.status(StatusCodes.CREATED).json({ post: populatedPost });
};

const likePost = async (req, res) => {
  const { id: postId } = req.params;
  const userId = req.user.userId;

  const post = await Post.findById(postId);
  if (!post) {
    throw new NotFoundError('Post not found');
  }

  const isLiked = post.likes.includes(userId);
  if (isLiked) {
    post.likes = post.likes.filter(id => id.toString() !== userId.toString());
  } else {
    post.likes.push(userId);
  }

  await post.save();
  
  // Populate user info before sending response
  const populatedPost = await Post.findById(post._id)
    .populate('user', 'name')
    .populate('comments.user', 'name');
    
  res.status(StatusCodes.OK).json({ post: populatedPost });
};

const addComment = async (req, res) => {
  const { id: postId } = req.params;
  const { content } = req.body;
  
  if (!content) {
    throw new BadRequestError('Comment content is required');
  }

  const post = await Post.findById(postId);
  if (!post) {
    throw new NotFoundError('Post not found');
  }

  post.comments.push({
    content,
    user: req.user.userId
  });

  await post.save();
  
  // Populate user info before sending response
  const populatedPost = await Post.findById(post._id)
    .populate('user', 'name')
    .populate('comments.user', 'name');
    
  res.status(StatusCodes.OK).json({ post: populatedPost });
};

const deletePost = async (req, res) => {
  const { id: postId } = req.params;
  const userId = req.user.userId;

  const post = await Post.findById(postId);
  if (!post) {
    throw new NotFoundError('Post not found');
  }

  // Check if user owns the post
  if (post.user.toString() !== userId) {
    throw new UnauthorizedError('Not authorized to delete this post');
  }

  await Post.findByIdAndDelete(postId);
  res.status(StatusCodes.OK).json({ msg: 'Post deleted successfully' });
};

const updatePost = async (req, res) => {
  const { id: postId } = req.params;
  const { content } = req.body;
  const userId = req.user.userId;

  const post = await Post.findById(postId);
  if (!post) {
    throw new NotFoundError('Post not found');
  }

  // Check if user owns the post
  if (post.user.toString() !== userId) {
    throw new UnauthorizedError('Not authorized to update this post');
  }

  post.content = content;
  await post.save();

  const populatedPost = await Post.findById(post._id)
    .populate('user', 'name')
    .populate('comments.user', 'name');

  res.status(StatusCodes.OK).json({ post: populatedPost });
};

const deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const userId = req.user.userId;

  const post = await Post.findById(postId);
  if (!post) {
    throw new NotFoundError('Post not found');
  }

  const comment = post.comments.id(commentId);
  if (!comment) {
    throw new NotFoundError('Comment not found');
  }

  // Check if user owns the comment
  if (comment.user.toString() !== userId) {
    throw new UnauthorizedError('Not authorized to delete this comment');
  }

  comment.remove();
  await post.save();

  const populatedPost = await Post.findById(post._id)
    .populate('user', 'name')
    .populate('comments.user', 'name');

  res.status(StatusCodes.OK).json({ post: populatedPost });
};

const updateComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const { content } = req.body;
  const userId = req.user.userId;

  const post = await Post.findById(postId);
  if (!post) {
    throw new NotFoundError('Post not found');
  }

  const comment = post.comments.id(commentId);
  if (!comment) {
    throw new NotFoundError('Comment not found');
  }

  // Check if user owns the comment
  if (comment.user.toString() !== userId) {
    throw new UnauthorizedError('Not authorized to update this comment');
  }

  comment.content = content;
  await post.save();

  const populatedPost = await Post.findById(post._id)
    .populate('user', 'name')
    .populate('comments.user', 'name');

  res.status(StatusCodes.OK).json({ post: populatedPost });
};

module.exports = {
  getAllPosts,
  createPost,
  likePost,
  addComment,
  deletePost,
  updatePost,
  deleteComment,
  updateComment
}; 