"use client";

import {useEffect, useMemo, useRef, useState} from "react";
import ModelSelector from "./components/ModelSelector";
import NavbarMenu from "./components/NavMenu";
import {useChatStore} from "@/lib/store/chat";
import type {Message} from "@/lib/store/chat";
import {AIModel} from "@/types/AIModel";
import GradientStyles from "./components/GradientStyles";
import ChatSection from "./components/ChatSection";

function normalizeChatResultToMessages(raw: any): Message[] {
  const assistant = Array.isArray(raw?.assistant) ? raw.assistant : [];
  return assistant.map((a: any) => ({
    id: a?.messageId || crypto.randomUUID(),
    role: "assistant",
    content:
      typeof a?.content === "string" && a.content.trim()
        ? a.content
        : "(không có nội dung)",
    modelId: a?.modelId,
    error: a?.error ?? null,
  }));
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [availableModels, setAvailableModels] = useState<AIModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    messages,
    selectedModelIds,
    setSelectedModelIds,
    currentThreadId,
    setCurrentThreadId,
    clearMessages,
  } = useChatStore();

  const handleNewChat = () => {
    clearMessages(); // reset messages + currentThreadId
    setQuestion(""); // reset input
    setError(null); // reset local error
    setIsLoading(false); // reset local loading
  };

  const listEndRef = useRef<HTMLDivElement | null>(null);

  const selectedModels = useMemo<AIModel[]>(() => {
    if (!Array.isArray(availableModels) || availableModels.length === 0)
      return [];
    const byId = new Map<string, AIModel>(
      availableModels.map((m) => [m.modelId, m])
    );
    return selectedModelIds
      .map((id) => byId.get(id))
      .filter((m): m is AIModel => m !== undefined);
  }, [availableModels, selectedModelIds]);

  const onSetSelectedModels: React.Dispatch<React.SetStateAction<AIModel[]>> = (
    value
  ) => {
    const next = typeof value === "function" ? value(selectedModels) : value;
    setSelectedModelIds(next.map((m) => m.modelId));
  };

  // --- MỚI THÊM: Hàm xử lý xóa model ---
  const handleRemoveModel = (modelId: string) => {
    setSelectedModelIds(selectedModelIds.filter((id) => id !== modelId));
  };

  // auto scroll
  useEffect(() => {
    listEndRef.current?.scrollIntoView({behavior: "smooth"});
  }, [messages, isLoading]);

  // load models 1 lần
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/models");
        if (!res.ok) throw new Error("Failed to fetch models");
        const data: AIModel[] = await res.json();
        setAvailableModels(data);
      } catch {
        setError("Bạn chưa đăng nhập, hãy đăng nhập trước nhé!.");
      }
    })();
  }, []);

  // dọn selectedModelIds nếu model bị xoá
  useEffect(() => {
    if (!availableModels.length || !selectedModelIds.length) return;
    const valid = new Set(availableModels.map((m) => m.modelId));
    const filtered = selectedModelIds.filter((id) => valid.has(id));

    if (
      filtered.length !== selectedModelIds.length ||
      filtered.some((id, i) => id !== selectedModelIds[i])
    ) {
      setSelectedModelIds(filtered);
    }
  }, [availableModels, selectedModelIds, setSelectedModelIds]);

  const handleSubmit = async () => {
    if (!selectedModelIds.length) {
      setError("Vui lòng chọn ít nhất một AI model để hỏi.");
      return;
    }

    const q = question.trim();
    if (!q) {
      setError("Vui lòng nhập câu hỏi.");
      return;
    }

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: q,
    };

    // ✅ 1) Append user message dựa trên state mới nhất
    useChatStore.setState((state) => ({
      messages: [...state.messages, userMsg],
    }));

    setQuestion("");
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          question: q,
          modelIds: selectedModelIds, // đúng field backend đọc
          threadId: currentThreadId,
        }),
      });

      if (!res.ok) {
        let ejson: any = {};
        try {
          ejson = await res.json();
        } catch {}
        throw new Error(ejson.message || "Yêu cầu thất bại");
      }

      const result = await res.json();

      if (result?.threadId && result.threadId !== currentThreadId) {
        setCurrentThreadId(result.threadId);
      }

      const assistantMsgs: Message[] = Array.isArray(result?.assistant)
        ? result.assistant.map((a: any) => ({
            id: a?.messageId || crypto.randomUUID(),
            role: "assistant",
            content:
              typeof a?.content === "string" && a.content.trim()
                ? a.content
                : "(không có nội dung)",
            modelId: a?.modelId,
            error: a?.error ?? null,
          }))
        : [];

      // ✅ 2) Append assistant messages dựa trên state mới nhất (không ghi đè)
      useChatStore.setState((state) => ({
        messages: [
          ...state.messages,
          ...(assistantMsgs.length
            ? assistantMsgs
            : [
                {
                  id: crypto.randomUUID(),
                  role: "assistant",
                  content: "Mình chưa nhận được trả lời từ server.",
                } as Message,
              ]),
        ],
      }));
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Đã xảy ra lỗi khi gửi câu hỏi.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <GradientStyles />

      {/* Nền + layout tổng */}
      <main className="min-h-screen flex flex-col bg-[var(--bg)]">
        {/* Navbar trên cùng */}
        <NavbarMenu
          isMenuOpen={isMenuOpen}
          onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
          onClose={() => setIsMenuOpen(false)}
          historyItems={[]}
          onNewChat={handleNewChat}
          modelSelector={
            <ModelSelector
              availableModels={availableModels}
              selectedModels={selectedModels}
              setSelectedModels={onSetSelectedModels}
            />
          }
        />

        {/* Nội dung chính – GIỮ NGUYÊN CLASS VỊ TRÍ */}
        <div className="flex-1 px-4 md:px-6 pb-6 pt-20">
          <div className="w-full flex flex-col gap-4 lg:ml-auto lg:max-w-[calc(100vw-20rem)]">
            <ChatSection
              messages={messages}
              isLoading={isLoading}
              selectedModels={selectedModels}
              error={error}
              question={question}
              onQuestionChange={setQuestion}
              onSubmit={handleSubmit}
              listEndRef={listEndRef}
              onRemoveModel={handleRemoveModel} // ⬅ MỚI THÊM: Truyền hàm xóa xuống
            />
          </div>
        </div>
      </main>
    </>
  );
}
