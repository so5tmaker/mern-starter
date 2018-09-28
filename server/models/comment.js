import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const commentSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Comment', commentSchema);
