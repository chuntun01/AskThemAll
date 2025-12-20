import mongoose, { Schema, Document, Model } from "mongoose";

export interface IConversation extends Document {
  userId: string;              // Clerk userId
  title: string;
  lastMessageAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema = new Schema<IConversation>(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true, trim: true },
    lastMessageAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true, collection: "conversations" }
);

ConversationSchema.index({ userId: 1, lastMessageAt: -1 });

const Conversation: Model<IConversation> =
  mongoose.models.Conversation ||
  mongoose.model<IConversation>("Conversation", ConversationSchema);

export default Conversation;
