import mongoose, { Schema, Document, Model } from "mongoose";

export type ChatRole = "system" | "user" | "assistant";

export interface IConversationMessage extends Document {
  conversationId: mongoose.Types.ObjectId;
  role: ChatRole;
  content: string;
  modelId?: string | null; // chỉ assistant mới có
  createdAt: Date;
  updatedAt: Date;
}

const ConversationMessageSchema = new Schema<IConversationMessage>(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },
    role: {
      type: String,
      enum: ["system", "user", "assistant"],
      required: true,
    },
    content: { type: String, required: true },
    modelId: { type: String, default: null, index: true },
  },
  { timestamps: true, collection: "conversation_messages" }
);

ConversationMessageSchema.index({ conversationId: 1, createdAt: 1 });
ConversationMessageSchema.index({ conversationId: 1, modelId: 1, createdAt: 1 });

const ConversationMessage: Model<IConversationMessage> =
  mongoose.models.ConversationMessage ||
  mongoose.model<IConversationMessage>("ConversationMessage", ConversationMessageSchema);

export default ConversationMessage;
