
import { Schema, model, models, Document } from "mongoose";

interface IUser extends Document {
  clerkId: string;
  username: string;
  email: string;
  avatarUrl?: string;
  role: "member" | "admin";
}

const UserSchema = new Schema<IUser>(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatarUrl: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      default: "member",
      enum: ["member", "admin"],
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

const User = models.User || model<IUser>("User", UserSchema);

export default User;