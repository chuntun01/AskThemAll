import { Schema, model, models, type Model, type Document } from "mongoose";

export type ThreadRole = "system" | "user" | "assistant";

export interface IThreadMessage extends Document {
  threadId: Schema.Types.ObjectId;
  role: ThreadRole;
  content: string;
  modelId?: string | null;    // openrouter model id for assistant
  turn: number;
  createdAt: Date;
}

const ThreadMessageSchema = new Schema<IThreadMessage>(
  {
    threadId: { type: Schema.Types.ObjectId, ref: "Thread", required: true, index: true },
    role: { type: String, enum: ["system", "user", "assistant"], required: true },
    content: { type: String, required: true },
    modelId: { type: String, default: null, index: true },
    turn: { type: Number, required: true, index: true },
    createdAt: { type: Date, default: Date.now, index: true },
  },
  { collection: "thread_messages" }
);

ThreadMessageSchema.index({ threadId: 1, createdAt: 1 });
ThreadMessageSchema.index({ threadId: 1, modelId: 1, createdAt: 1 });

const ThreadMessage: Model<IThreadMessage> =
  (models.ThreadMessage as Model<IThreadMessage>) || model<IThreadMessage>("ThreadMessage", ThreadMessageSchema);

export default ThreadMessage;
