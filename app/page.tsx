"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import AnswerDisplay from "./components/AnswerDisplay";
import ModelSelector from "./components/ModelSelector";
import NavbarMenu from "./components/NavMenu";
import { useChatStore } from "@/lib/store/chat";
import type { Message } from "@/lib/store/chat";

interface AIModel {
  _id: string;
  modelId: string;
  displayName: string;
}

function normalizeAnswersToMessages(raw: any): Message[] {
  const answers = Array.isArray(raw?.answers) ? raw.answers : [];
  return answers.map((ans: any) => {
    const id = ans?._id || crypto.randomUUID();
    const content =
      typeof ans?.content === "string" && ans.content.trim()
        ? ans.content
        : "(không có nội dung)";

    // authorModel có thể là string id, hoặc object { _id, modelId, displayName }
    let modelId: string | undefined;
    const a = ans?.authorModel;
    if (typeof a === "string") modelId = a;
    else if (a && typeof a === "object") {
      if (typeof a.modelId === "string") modelId = a.modelId;
      else if (typeof a._id === "string") modelId = a._id;
      else if (a._id && typeof a._id === "object" && typeof a._id.toString === "function") {
        modelId = a._id.toString();
      }
    }

    return { id, role: "assistant", content, modelId };
  });
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [availableModels, setAvailableModels] = useState<AIModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    messages,
    setMessages,
    addMessage,
    selectedModelIds,
    setSelectedModelIds,
    currentThreadId,
    setCurrentThreadId,
  } = useChatStore();

  const selectedModels = useMemo<AIModel[]>(() => {
    if (!Array.isArray(availableModels) || availableModels.length === 0) return [];
    const byId = new Map<string, AIModel>(availableModels.map((m) => [m.modelId, m]));
    return selectedModelIds
      .map((id) => byId.get(id))
      .filter((m): m is AIModel => m !== undefined);
  }, [availableModels, selectedModelIds]);

  // Adapter khớp type React.Dispatch<React.SetStateAction<AIModel[]>>
  const onSetSelectedModels: React.Dispatch<React.SetStateAction<AIModel[]>> = (value) => {
    const next = typeof value === "function" ? value(selectedModels) : value;
    setSelectedModelIds(next.map((m) => m.modelId));
  };

  const listEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Load danh sách model
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/models");
        if (!res.ok) throw new Error("Failed to fetch models");
        const data: AIModel[] = await res.json();
        setAvailableModels(data);
      } catch {
        setError("Không thể tải danh sách AI model.");
      }
    })();
  }, []);

  // Nếu model list đổi, loại bỏ các id không còn hợp lệ
  useEffect(() => {
    if (!availableModels.length || !selectedModelIds.length) return;
    const valid = new Set(availableModels.map((m) => m.modelId));
    const filtered = selectedModelIds.filter((id) => valid.has(id));
    if (filtered.length !== selectedModelIds.length) setSelectedModelIds(filtered);
  }, [availableModels, selectedModelIds, setSelectedModelIds]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedModelIds.length) {
      setError("Vui lòng chọn ít nhất một AI model để hỏi.");
      return;
    }
    const q = question.trim();
    if (!q) {
      setError("Vui lòng nhập câu hỏi.");
      return;
    }

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: q };
    addMessage(userMsg);
    setQuestion("");
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // gửi kèm threadId hiện tại; nếu null, server sẽ tạo mới và trả về
        body: JSON.stringify({ question: q, selectedModelIds, threadId: currentThreadId }),
      });
      if (!res.ok) {
        let ejson: any = {};
        try { ejson = await res.json(); } catch {}
        throw new Error(ejson.message || "Yêu cầu thất bại");
      }
      const result = await res.json();

      // nếu server trả threadId mới, lưu lại để các câu sau đi chung đoạn chat
      if (result?.threadId && result.threadId !== currentThreadId) {
        setCurrentThreadId(result.threadId);
      }

      const assistantMsgs = normalizeAnswersToMessages(result);

      // ✅ dùng updater function – chốt literal type cho role để TS không báo
      setMessages((prev) => [
        ...prev,
        ...(assistantMsgs.length
          ? assistantMsgs
          : [
              {
                id: crypto.randomUUID(),
                role: "assistant" as const,
                content: "Mình chưa nhận được trả lời từ server.",
              } as Message,
            ]),
      ]);
    } catch (err: any) {
      setError(err?.message || "Đã xảy ra lỗi khi gửi câu hỏi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .gradient-bg {
          background: linear-gradient(45deg, #8DBCC7, #A4CCD9, #EBFFD8, #38f9d7);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }
        .glassmorphism {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .scroll-clip { overflow: hidden; border-radius: inherit; }
        :global(.chat-body) { scrollbar-width: thin; scrollbar-color: rgba(0,0,0,.28) transparent; scrollbar-gutter: stable both-edges; }
        :global(.chat-body::-webkit-scrollbar) { width: 8px; }
        :global(.chat-body::-webkit-scrollbar-track) { background: transparent; border-radius: 9999px; margin: 12px 0; }
        :global(.chat-body::-webkit-scrollbar-thumb) { background: rgba(0,0,0,.28); border-radius: 9999px; border: 2px solid transparent; background-clip: padding-box; }
        :global(.chat-body:hover::-webkit-scrollbar-thumb) { background: rgba(0,0,0,.42); }
        :global(.textarea-auto) { scrollbar-width: thin; }
        :global(.textarea-auto::-webkit-scrollbar) { width: 6px; }
        :global(.textarea-auto::-webkit-scrollbar-track) { background: transparent; }
        :global(.textarea-auto::-webkit-scrollbar-thumb) { background: rgba(0,0,0,.28); border-radius: 9999px; }
      `}</style>

      <main className="gradient-bg fixed inset-0 overflow-hidden pt-17">
        <NavbarMenu
          isMenuOpen={isMenuOpen}
          onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
          onClose={() => setIsMenuOpen(false)}
          historyItems={[]}
        />

        <div className="h-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col relative z-30">
          <div className="flex justify-center mb-4 shrink-0 w-full">
            <ModelSelector
              availableModels={availableModels}
              selectedModels={selectedModels}
              setSelectedModels={onSetSelectedModels}
            />
          </div>
        </div>

        <section className="fixed left-1/2 -translate-x-1/2 top-[7.5rem] z-30 w-full max-w-7xl px-6">
          <div className="w-full h-[calc(100vh-7.5rem-1.5rem)] min-h-[600px] max-h-[calc(100vh-7.5rem-1.5rem)] glassmorphism rounded-3xl flex flex-col">
            <div className="scroll-clip rounded-3xl flex-1">
              <div className="chat-body h-full overflow-y-auto px-6 pr-3 sm:pr-4 py-5">
                <AnswerDisplay
                  messages={messages}
                  isLoading={isLoading}
                  selectedModels={selectedModels}
                  error={error}
                />
                <div ref={listEndRef} />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="border-t border-white/40 glassmorphism px-4 py-4 rounded-b-3xl">
              <div className="flex items-center gap-2">
                <textarea
                  rows={1}
                  value={question}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                    e.currentTarget.style.height = "auto";
                    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  placeholder="Hỏi bất kỳ điều gì..."
                  className="textarea-auto flex-1 max-h-[200px] px-4 py-3 rounded-3xl bg-white/80 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#79A3B1] focus:border-transparent shadow-md resize-none overflow-y-auto transition-all"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 px-5 rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Gửi
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
