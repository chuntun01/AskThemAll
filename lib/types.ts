// lib/types.ts

// Dành cho các AI Model
export interface AIModel {
  _id: string;
  modelId: string;
  displayName: string;
  isFree: boolean;
}

// Dành cho thông tin người dùng trong database
export interface UserProfile {
  _id: string;
  clerkId: string;
  username: string;
  email: string;
  role: 'member' | 'admin';
  avatarUrl: string;
  createdAt: string;
}

// Dành cho một mục trong lịch sử chat
export interface HistoryItem {
  id: string;
  name: string;
  href: string;
  updatedAt?: number;
}

// Dành cho một tin nhắn trong cuộc trò chuyện
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  modelId?: string;
}