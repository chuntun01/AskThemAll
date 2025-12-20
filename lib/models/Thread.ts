import { Schema, model, models, type Model, type Document } from "mongoose";

export interface IThread extends Document {
  userId: string;                 // clerkId
  title?: string;
  selectedModelIds: string[];     // openrouter model ids
  turn: number;                   // current turn counter
  createdAt: Date;
  updatedAt: Date;
}

const ThreadSchema = new Schema<IThread>(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, default: "" },
    selectedModelIds: { type: [String], default: [] },
    turn: { type: Number, default: 0 },
  },
  { timestamps: true, collection: "threads" }
);

ThreadSchema.index({ userId: 1, updatedAt: -1 });

const Thread: Model<IThread> =
  (models.Thread as Model<IThread>) || model<IThread>("Thread", ThreadSchema);

export default Thread;
