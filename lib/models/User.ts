// lib/models/User.ts
import { Schema, model, models, type Document, type Model } from "mongoose";

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
      enum: [0, 1],
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

const User: Model<IUser> =
  (models.User as Model<IUser>) || model<IUser>("User", UserSchema);

export default User;
