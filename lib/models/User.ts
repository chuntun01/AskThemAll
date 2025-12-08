// lib/models/User.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  username: string;
  email: string;
  avatarUrl?: string;
  isAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatarUrl: { type: String },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, 
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

// ép kiểu rõ ràng
const UserModel: Model<IUser> =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);

export default UserModel;
