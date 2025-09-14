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
      index: true,
    },
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },

    // Tham chiếu đến AI model đã tạo ra câu trả lời này
    authorModel: {
      type: Schema.Types.ObjectId,
      ref: "AIModel",
      required: true,
    },

    // --- NEW: gom nhóm đoạn chat ---
    threadId: {
      type: Schema.Types.ObjectId,
      index: true,
      default: null,
    },

    createDate: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { collection: "answers" }
);

// Index gợi ý thêm cho hiệu năng khi lấy dữ liệu
AnswerSchema.index({ threadId: 1, createDate: 1 });

const Answer = models.Answer || model("Answer", AnswerSchema);
export default Answer;
