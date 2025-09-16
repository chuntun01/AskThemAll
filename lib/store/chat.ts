// src/lib/store/chat.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  modelId?: string;
}

interface ChatStore {
  // state
  messages: Message[];
  selectedModelIds: string[];
  currentThreadId: string | null;

  // actions
  setMessages: (v: Message[] | ((prev: Message[]) => Message[])) => void;
  addMessage: (m: Message) => void;
  clearMessages: () => void;
  setSelectedModelIds: (ids: string[]) => void;
  setCurrentThreadId: (id: string | null) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      messages: [],
      selectedModelIds: [],
      currentThreadId: null,

      // Cho phép truyền MẢNG hoặc HÀM updater(prev)=>newArray
      setMessages: (v) =>
        set((s) => ({
          messages:
            typeof v === "function"
              ? (v as (p: Message[]) => Message[])(s.messages)
              : v,
        })),

      addMessage: (m) => set((s) => ({ messages: [...s.messages, m] })),

      // Bắt đầu chat mới => xoá msg + reset thread
      clearMessages: () => set({ messages: [], currentThreadId: null }),

      setSelectedModelIds: (ids) =>
        set({ selectedModelIds: Array.from(new Set(ids)) }),

      setCurrentThreadId: (id) => set({ currentThreadId: id }),
    }),
    {
      name: "chat-store-v1",
      partialize: (s) => ({
        messages: s.messages,
        selectedModelIds: s.selectedModelIds,
        currentThreadId: s.currentThreadId,
      }),
    }
  )
);
