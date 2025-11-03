import mongoose, {Schema, Document, Model} from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  username: string;
  email: string;
  avatarUrl?: string;
  role: "member" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}

// Định nghĩa schema
const UserSchema = new Schema<IUser>(
  {
    clerkId: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    avatarUrl: {type: String},
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

// ✅ Rất quan trọng: ép kiểu rõ ràng để tránh lỗi overload union
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
