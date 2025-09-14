// File: lib/models/AIModel.js
import { Schema, model, models } from "mongoose";

// Ghi chú: Chúng ta sử dụng cú pháp import ES Module nhất quán
const AIModelSchema = new Schema({
  modelId: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    default: "Unknown",
  },
  isFree: {
    type: Boolean,
    default: true,
  },
});

// Ghi chú: Sử dụng `models` được import trực tiếp và cú pháp `export default`
const AIModel = models.AIModel || model("AIModel", AIModelSchema);

export default AIModel;
