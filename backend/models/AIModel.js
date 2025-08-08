const mongoose = require("mongoose");

const AIModelSchema = new mongoose.Schema({
  modelId: {
    // Tên định danh trên OpenRouter, ví dụ: 'mistralai/mistral-7b-instruct'
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    // Tên hiển thị cho người dùng, ví dụ: 'Mistral 7B'
    type: String,
    required: true,
  },
  provider: {
    // Nhà cung cấp, ví dụ: 'Mistral AI'
    type: String,
    default: "Unknown",
  },
  isFree: {
    // Đánh dấu là miễn phí hay không
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("AIModel", AIModelSchema);
