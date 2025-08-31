// lib/models/Answer.js
import { Schema, model, models } from "mongoose";

const AnswerSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    // Tham chiếu đến câu hỏi mà nó trả lời
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    // Tham chiếu đến AI model đã tạo ra câu trả lời này
    authorModel: {
      type: Schema.Types.ObjectId,
      ref: "AIModel",
      required: true,
    },
    createDate: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "answers" }
);

const Answer = models.Answer || model("Answer", AnswerSchema);

export default Answer;
