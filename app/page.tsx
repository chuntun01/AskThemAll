"use client";

import { useEffect, useRef, useState } from "react";
import AnswerDisplay from "./components/AnswerDisplay";
import ModelSelector from "./components/ModelSelector";
import NavbarMenu from "./components/NavMenu";

interface AIModel {
  _id: string;
  modelId: string;
  displayName: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  modelId?: string;
}

function normalizeAnswersToMessages(raw: any): Message[] {
  const answers = Array.isArray(raw?.answers) ? raw.answers : [];
  return answers.map((ans: any) => {
    const id = ans?._id || crypto.randomUUID();
    const content =
      typeof ans?.content === "string" && ans.content.trim()
        ? ans.content
        : "(không có nội dung)";

    let modelId: string | undefined;
    const a = ans?.authorModel;
    if (typeof a === "string") modelId = a;
    else if (a && typeof a === "object") {
      if (typeof a._id === "string") modelId = a._id;
      else if (typeof a.id === "string") modelId = a.id;
      else if (typeof a.modelId === "string") modelId = a.modelId;
    }
    return { id, role: "assistant", content, modelId };
  });
}

export default function Home() {
  // UI
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mockHistoryData = [
    { name: "Sản phẩm A", href: "/san-pham-a" },
    { name: "Tin tức mới nhất", href: "/tin-tuc" },
  ];

  // App state
  const [question, setQuestion] = useState("");
  const [availableModels, setAvailableModels] = useState<AIModel[]>([]);
  const [selectedModels, setSelectedModels] = useState<AIModel[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-scroll cuối khung message
  const listEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  // Tải models
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await fetch("/api/models");
        if (!res.ok) throw new Error("Failed to fetch models");
        const data: AIModel[] = await res.json();
        setAvailableModels(data);
      } catch {
        setError("Không thể tải danh sách AI model.");
      }
    };
    fetchModels();
  }, []);

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedModels.length === 0) {
      setError("Vui lòng chọn ít nhất một AI model để hỏi.");
      return;
    }
    const q = question.trim();
    if (!q) {
      setError("Vui lòng nhập câu hỏi.");
      return;
    }

    setMessages(prev => [...prev, { id: crypto.randomUUID(), role: "user", content: q }]);
    setQuestion("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q,
          selectedModelIds: selectedModels.map(m => m.modelId),
        }),
      });
      if (!response.ok) {
        let errorData: any = {};
        try { errorData = await response.json(); } catch {}
        throw new Error(errorData.message || "Yêu cầu thất bại");
      }
      const result = await response.json();
      const assistantMsgs = normalizeAnswersToMessages(result);
      setMessages(prev => [...prev, ...(assistantMsgs.length ? assistantMsgs : [{
        id: crypto.randomUUID(), role: "assistant" as const, content: "Mình chưa nhận được trả lời từ server."
      }])]);
    } catch (err: any) {
      setError(err?.message || "Đã xảy ra lỗi khi gửi câu hỏi.");
    } finally {
      setIsLoading(false);
    }
  };

return (
  // KHÔNG SCROLL BÊN NGOÀI: khóa body bằng h-screen + overflow-hidden
  <main className="h-screen overflow-hidden bg-[#FCF8EC] pt-16">
    {/* Navbar */}
    <NavbarMenu
      isMenuOpen={isMenuOpen}
      onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
      onClose={() => setIsMenuOpen(false)}
      historyItems={mockHistoryData}
    />

    {/* Vùng nội dung căn giữa */}
    <div className="h-full max-w-5xl mx-auto px-4 md:px-6 flex flex-col">
      {/* Selector model */}
      <div className="flex justify-center mb-4 shrink-0">
        <ModelSelector
          availableModels={availableModels}
          selectedModels={selectedModels}
          setSelectedModels={setSelectedModels}
        />
      </div>

      {/* Ô NỘI DUNG CHỨA MESSAGE — CHỈ Ô NÀY CUỘN */}
      <section className="w-full max-w-3xl mx-auto flex-1 flex items-center justify-center">
        <div
          className="
            w-full h-[60vh] min-h-[420px] max-h-[70vh]
            rounded-2xl border border-gray-200 bg-white/90 backdrop-blur shadow-xl
            flex flex-col
          "
        >
          {/* Vùng messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <AnswerDisplay
              messages={messages}
              isLoading={isLoading}
              selectedModels={selectedModels}
              error={error}
            />
            <div ref={listEndRef} />
          </div>
        </div>
      </section>
    </div>

    {/* THANH NHẬP CỐ ĐỊNH — KHÔNG DÍNH Ô MESSAGE, CANH GIỮA MÀN HÌNH */}
    <form
      onSubmit={handleSubmit}
      className="
        fixed left-1/2 -translate-x-1/2 bottom-5
        w-[calc(100%-2rem)] max-w-3xl
        bg-white/80 backdrop-blur rounded-full shadow-2xl border
        px-3 py-2
      "
    >
      <div className="flex items-center gap-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Hỏi bất kỳ điều gì..."
          className="
            flex-1 h-12 px-4 rounded-full border border-gray-300 bg-white
            focus:outline-none focus:ring-2 focus:ring-[#79A3B1] focus:border-transparent
          "
        />
        <button
          type="submit"
          disabled={isLoading}
          className="
            h-12 px-5 rounded-full
            bg-[#79A3B1] text-white font-medium
            hover:bg-[#6b94a2] disabled:opacity-50 disabled:cursor-not-allowed
            shadow-md
          "
        >
          Gửi
        </button>
      </div>
    </form>
  </main>
);
}