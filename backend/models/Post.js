const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Please provide post content'],
    maxlength: 1000
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    content: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema); 