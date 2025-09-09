// lib/models/Question.js
import { Schema, model, models } from "mongoose";

const QuestionSchema = new Schema(
  {
    userId: { type: String, default: null },

    // Nội dung câu hỏi (giữ nguyên tên field bạn đang dùng)
    question: { type: String, required: true },

    // Nếu bạn đang dùng Answer collection riêng thì có thể không cần mảng này.
    // Mình giữ lại để không phá vỡ code cũ.
    answers: { type: Array, default: [] },

    // --- NEW: nhóm nhiều Q&A vào cùng 1 “đoạn chat” ---
    threadId: { type: Schema.Types.ObjectId, index: true, default: null },

    // Các model đã chọn khi hỏi (giữ nguyên)
    selectedModels: [
      { type: Schema.Types.ObjectId, ref: "AIModel" }
    ],

    createDate: { type: Date, default: Date.now, index: true },
    updateDate: { type: Date, default: Date.now },
  },
  {
    collection: "questions",
    timestamps: false, // bạn đang dùng createDate/updateDate thủ công
  }
);

// Cập nhật updateDate tự động khi save/update
QuestionSchema.pre("save", function (next) {
  this.updateDate = new Date();
  next();
});

// Index gợi ý cho hiệu năng (Atlas chạy tốt hơn)
QuestionSchema.index({ threadId: 1, createDate: -1 });
QuestionSchema.index({ createDate: -1 });

const Question = models.Question || model("Question", QuestionSchema);
export default Question;
