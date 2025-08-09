const mongoose = require("mongoose");
const AnswerSchema = new mongoose.Schema({
  text: { type: String, required: true },
  modelSource: { type: String, required: true },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Answer", AnswerSchema);
