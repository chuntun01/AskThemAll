// // src/lib/store/chat.ts
// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// export interface Message {
//   id: string;
//   role: "user" | "assistant";
//   content: string;
//   modelId?: string;
// }

// interface ChatStore {
//   // state
//   messages: Message[];
//   selectedModelIds: string[];
//   currentThreadId: string | null;

//   // actions
//   setMessages: (v: Message[] | ((prev: Message[]) => Message[])) => void;
//   addMessage: (m: Message) => void;
//   clearMessages: () => void;
//   setSelectedModelIds: (ids: string[]) => void;
//   setCurrentThreadId: (id: string | null) => void;
// }

// export const useChatStore = create<ChatStore>()(
//   persist(
//     (set) => ({
//       messages: [],
//       selectedModelIds: [],
//       currentThreadId: null,

//       // Cho phép truyền MẢNG hoặc HÀM updater(prev)=>newArray
//       setMessages: (v) =>
//         set((s) => ({
//           messages:
//             typeof v === "function"
//               ? (v as (p: Message[]) => Message[])(s.messages)
//               : v,
//         })),

//       addMessage: (m) => set((s) => ({ messages: [...s.messages, m] })),

//       // Bắt đầu chat mới => xoá msg + reset thread
//       clearMessages: () => set({ messages: [], currentThreadId: null }),

//       setSelectedModelIds: (ids) =>
//         set({ selectedModelIds: Array.from(new Set(ids)) }),

//       setCurrentThreadId: (id) => set({ currentThreadId: id }),
//     }),
//     {
//       name: "chat-store-v1",
//       partialize: (s) => ({
//         messages: s.messages,
//         selectedModelIds: s.selectedModelIds,
//         currentThreadId: s.currentThreadId,
//       }),
//     }
//   )
// );
//-------------------------------=

// src/lib/store/chat.ts
import {create} from "zustand";
import {persist} from "zustand/middleware";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  modelId?: string;
  error?: string | null;
}

export interface ConversationListItem {
  id: string;
  title: string;
  lastMessageAt: string;
  ownerUserId?: string;
  ownerName?: string | null;
  ownerEmail?: string | null;
}

interface ChatStore {
  // state
  messages: Message[];
  selectedModelIds: string[];
  currentThreadId: string | null;

  isLoading: boolean;
  error: string | null;

  // actions
  clearMessages: () => void;
  setSelectedModelIds: (ids: string[]) => void;
  setCurrentThreadId: (id: string | null) => void;

  sendQuestion: (question: string) => Promise<void>;
  loadConversation: (threadId: string) => Promise<void>;
  listConversations: () => Promise<ConversationListItem[]>;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      messages: [],
      selectedModelIds: [],
      currentThreadId: null,

      isLoading: false,
      error: null,

      clearMessages: () =>
        set({messages: [], currentThreadId: null, error: null}),

      setSelectedModelIds: (ids) =>
        set({selectedModelIds: Array.from(new Set(ids))}),

      setCurrentThreadId: (id) => set({currentThreadId: id}),

      sendQuestion: async (question) => {
        const q = question.trim();
        if (!q) return;

        const {selectedModelIds, currentThreadId} = get();
        if (!selectedModelIds || selectedModelIds.length === 0) {
          set({error: "Bạn chưa chọn model.", isLoading: false});
          return;
        }

        set({isLoading: true, error: null});

        // optimistic user message
        const tempUserId = crypto.randomUUID();
        set({
          messages: [
            ...get().messages,
            {id: tempUserId, role: "user", content: q},
          ],
        });

        try {
          const res = await fetch("/api/chat", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              question: q,
              modelIds: selectedModelIds,
              threadId: currentThreadId,
            }),
          });

          if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err?.message ?? `Chat failed: ${res.status}`);
          }

          const data = await res.json();
          const newThreadId: string = data.threadId;

          const assistantMessages: Message[] = (data.assistant ?? []).map(
            (a: any) => ({
              id: a.messageId ?? crypto.randomUUID(),
              role: "user",
              content: a.content ?? "",
              modelId: a.modelId,
              error: a.error ?? null,
            })
          );

          set({
            currentThreadId: newThreadId,
            messages: [...get().messages, ...assistantMessages],
          });
        } catch (e: any) {
          set({error: e?.message ?? String(e)});
        } finally {
          set({isLoading: false});
        }
      },

      loadConversation: async (threadId) => {
        set({isLoading: true, error: null});
        try {
          const res = await fetch(`/api/conversations/${threadId}`);
          if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err?.message ?? `Load failed: ${res.status}`);
          }

          const data = await res.json();
          const messages: Message[] = (data.messages ?? [])
            .filter((m: any) => m.role === "user" || m.role === "assistant")
            .map((m: any) => ({
              id: m.id,
              role: m.role,
              content: m.content,
              modelId: m.modelId ?? undefined,
            }));

          set({
            currentThreadId: threadId,
            messages,
          });
        } catch (e: any) {
          set({error: e?.message ?? String(e)});
        } finally {
          set({isLoading: false});
        }
      },

      listConversations: async () => {
        const res = await fetch("/api/conversations");
        if (!res.ok) return [];
        const data = await res.json().catch(() => ({}));
        return (data.conversations ?? []).map((c: any) => ({
          id: c.id,
          title: c.title,
          lastMessageAt: c.lastMessageAt,
          ownerUserId: c.ownerUserId,
          ownerName: c.ownerName ?? null,
          ownerEmail: c.ownerEmail ?? null,
        }));
      },
    }),
    {
      name: "chat-store-v2",
      partialize: (s) => ({
        messages: s.messages,
        selectedModelIds: s.selectedModelIds,
        currentThreadId: s.currentThreadId,
      }),
    }
  )
);
