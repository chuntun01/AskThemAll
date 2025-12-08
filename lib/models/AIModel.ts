// File: lib/models/AIModel.ts

import mongoose, { Schema, Document, Model, models } from "mongoose";

// Sửa lại Interface để khớp với Schema
export interface IAIModel extends Document {
  modelId: string;
  displayName: string;
  provider: string;
  isFree: boolean;
  createdAt: Date; 
  updatedAt: Date; 
}

// Định nghĩa Schema, gắn nó với Interface để tăng cường kiểm tra
const AIModelSchema: Schema<IAIModel> = new Schema({
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
}, { 
  timestamps: true // Thêm tùy chọn để tự động quản lý createdAt/updatedAt
});

//Tạo Model với logic kiểm tra tồn tại 
const AIModel: Model<IAIModel> =
  models.AIModel || mongoose.model<IAIModel>("AIModel", AIModelSchema); 

export default AIModel;