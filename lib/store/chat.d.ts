// types/chat.d.ts
import type { UseBoundStore, StoreApi } from "zustand";

export interface AIModel {
  _id: string;
  modelId: string;
  displayName: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  modelId?: string;
  modelName?: string;
}

export type MessagesUpdater =
  | Message[]
  | ((prev: Message[]) => Message[]);

export interface ChatState {
  // dữ liệu hội thoại hiện tại (frontend)
  messages: Message[];

  // mảng id các model đã chọn (ví dụ "google/gemini-flash-1.5")
  selectedModelIds: string[];

  // id đoạn chat hiện tại (gắn với DB), có thể null nếu chưa tạo
  currentThreadId: string | null;

  // actions
  setMessages: (next: MessagesUpdater) => void;
  addMessage: (msg: Message) => void;
  clearMessages: () => void;

  setSelectedModelIds: (ids: string[]) => void;
  setCurrentThreadId: (id: string | null) => void;
}

// Export hook đã typify
export const useChatStore: UseBoundStore<StoreApi<ChatState>>;
