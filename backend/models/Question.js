const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  ai_name: String,
  answer_text: String,
  response_time_ms: Number,
});

const questionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  question: String,
  answers: [answerSchema],
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
