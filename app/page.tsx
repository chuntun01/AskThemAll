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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [availableModels, setAvailableModels] = useState<AIModel[]>([]);
  const [selectedModels, setSelectedModels] = useState<AIModel[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

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

    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", content: q }]);
    setQuestion("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q,
          selectedModelIds: selectedModels.map((m) => m.modelId),
        }),
      });
      if (!response.ok) {
        let errorData: any = {};
        try {
          errorData = await response.json();
        } catch {}
        throw new Error(errorData.message || "Yêu cầu thất bại");
      }
      const result = await response.json();
      const assistantMsgs = normalizeAnswersToMessages(result);
      setMessages((prev) => [
        ...prev,
        ...(assistantMsgs.length
          ? assistantMsgs
          : [
              {
                id: crypto.randomUUID(),
                role: "assistant" as const,
                content: "Mình chưa nhận được trả lời từ server.",
              },
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
              setSelectedModels={setSelectedModels}
            />
          </div>
        </div>

        <section className="fixed left-1/2 -translate-x-1/2 top-[7.5rem] z-30 w-full max-w-7xl px-6">
          <div className="w-full h-[calc(100vh-7.5rem-1.5rem)] min-h-[600px] max-h-[calc(100vh-7.5rem-1.5rem)] rounded-3xl glassmorphism flex flex-col">
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <AnswerDisplay
                messages={messages}
                isLoading={isLoading}
                selectedModels={selectedModels}
                error={error}
              />
              <div ref={listEndRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-white/40 glassmorphism px-4 py-4 rounded-b-3xl"
            >
              <div className="flex items-center gap-2">
               <textarea
  rows={1}
  value={question}
  onChange={(e) => {
    setQuestion(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  }}
  onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // ngăn xuống dòng
      handleSubmit(e);    // gọi hàm gửi
    }
  }}
  placeholder="Hỏi bất kỳ điều gì..."
  className="flex-1 max-h-[200px] px-4 py-3 rounded-3xl bg-white/80 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#79A3B1] focus:border-transparent shadow-md resize-none overflow-y-auto transition-all"
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
