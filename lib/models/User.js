// lib/models/User.js
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    // Định nghĩa các trường khớp với database của bạn
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // Sử dụng đúng tên trường 'createDate' và 'updateDate'
    createDate: {
      type: Date,
      default: Date.now,
    },
    updateDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Chỉ định rõ collection để đảm bảo không có nhầm lẫn
    collection: "users",
  }
);

const User = models.User || model("User", UserSchema);

export default User;
