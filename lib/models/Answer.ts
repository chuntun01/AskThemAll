import mongoose, {Schema, Document, Model} from "mongoose";

export interface IAnswer extends Document {
  content: string;
  question: mongoose.Types.ObjectId;
  clerkId: string;
  username: string;
  authorModel: mongoose.Types.ObjectId;
  threadId?: mongoose.Types.ObjectId | null;
  createDate?: Date;
}

const AnswerSchema = new Schema<IAnswer>(
  {
    content: {type: String, required: true},
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
      index: true,
    },
    clerkId: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    authorModel: {type: Schema.Types.ObjectId, ref: "AIModel", required: true},
    threadId: {type: Schema.Types.ObjectId, index: true, default: null},
    createDate: {type: Date, default: Date.now, index: true},
  },
  {collection: "answers"}
);

AnswerSchema.index({threadId: 1, createDate: 1});

const Answer: Model<IAnswer> =
  mongoose.models.Answer || mongoose.model<IAnswer>("Answer", AnswerSchema);

export default Answer;
