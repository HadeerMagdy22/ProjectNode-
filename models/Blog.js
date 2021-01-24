const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = new Schema({
  title:{
    type: String,
    maxLength: 256,
    required: true,
  },
  imgUrl:{
    type:String
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const todoModel = mongoose.model('Todo', todoSchema);

module.exports = todoModel;
