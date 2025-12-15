import { Schema, model, models, Document, Model } from "mongoose";

interface IQuestion extends Document {
  userId?: string;
  question: string;
  answers: string[];
  threadId?: Schema.Types.ObjectId | null;
  selectedModels: Schema.Types.ObjectId[];
  createDate: Date;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    userId: { type: String, index: true, required: true },
    question: { type: String, required: true },
    answers: { type: [String], default: [] },
    threadId: { type: Schema.Types.ObjectId, index: true, default: null },
    selectedModels: [{ type: Schema.Types.ObjectId, ref: "AIModel" }],
    createDate: { type: Date, default: Date.now, index: true },
  },
  {
    timestamps: true,
    collection: "questions",
  }
);

//  Ép kiểu 
const Question: Model<IQuestion> =
  (models.Question as Model<IQuestion>) || model<IQuestion>("Question", QuestionSchema);

export default Question;
export type { IQuestion };
