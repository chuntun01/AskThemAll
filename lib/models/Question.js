// lib/models/Question.js
import { Schema, model, models } from "mongoose";

const QuestionSchema = new Schema(
  {
    userId: {
      type: String,
      default: null,
    },
    question: {
      type: String,
      required: true,
    },
    answers: {
      type: Array,
      default: [],
    },

    // --- THÊM TRƯỜNG MỚI TẠI ĐÂY ---
    // Mảng chứa các ID tham chiếu đến AIModel collection
    selectedModels: [
      {
        type: Schema.Types.ObjectId,
        ref: "AIModel",
      },
    ],
    // ---------------------------------

    createDate: {
      type: Date,
      default: Date.now,
    },
    updateDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "questions",
  }
);

const Question = models.Question || model("Question", QuestionSchema);

export default Question;
