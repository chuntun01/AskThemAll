"use client";

import { useState, useEffect } from "react";
// Giữ nguyên tên component của bạn
import AnswerDisplay from "./components/AnswerDisplay"; // Đổi tên từ ResponseComponent để rõ nghĩa hơn
import QuestionForm from "./components/QuestionForm"; // Đổi tên từ Input để rõ nghĩa hơn
import ModelSelector from "./components/ModelSelector";
import NavbarMenu from "./components/NavMenu";

// Định nghĩa các kiểu dữ liệu (interfaces) để code an toàn và dễ quản lý
interface AIModel {
  _id: string;
  modelId: string;
  displayName: string;
}

interface Answer {
  _id: string;
  content: string;
  authorModel: {
    displayName: string;
    _id: string;
  };
}

export default function Home() {
  // === STATE CỦA GIAO DIỆN (UI) ===
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mockHistoryData = [
    { name: "Sản phẩm A", href: "/san-pham-a" },
    { name: "Tin tức mới nhất", href: "/tin-tuc" },
  ];

  // === STATE CỦA ỨNG DỤNG (APP LOGIC) ===
  const [question, setQuestion] = useState<string>("");
  const [availableModels, setAvailableModels] = useState<AIModel[]>([]);
  const [selectedModels, setSelectedModels] = useState<AIModel[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Lấy danh sách các AI model khi component được tải
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("/api/models");
        if (!response.ok) throw new Error("Failed to fetch models");
        const data = await response.json();
        setAvailableModels(data);
      } catch (err) {
        setError("Không thể tải danh sách AI model.");
      }
    };
    fetchModels();
  }, []);
  const [submittedQuestion, setSubmittedQuestion] = useState<string>(""); // <-- THÊM STATE MỚI

  // Hàm xử lý khi người dùng gửi câu hỏi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedModels.length === 0) {
      setError("Vui lòng chọn ít nhất một AI model để hỏi.");
      return;
    }
    if (!question.trim()) {
      setError("Vui lòng nhập câu hỏi.");
      return;
    }
    

    setIsLoading(true);
    setAnswers([]);
    setError(null);

    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: question,
          selectedModelIds: selectedModels.map((m) => m.modelId),
        }),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = {};
        }
        throw new Error(errorData.message || "Yêu cầu thất bại");
      }

      const result = await response.json();
      setAnswers(result.answers);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Đã xảy ra lỗi khi gửi câu hỏi.");
      } else {
        setError("Đã xảy ra lỗi khi gửi câu hỏi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // app/page.tsx

  return (
    <main className="flex flex-col min-h-screen bg-[#FCF8EC]">
      <NavbarMenu
        isMenuOpen={isMenuOpen}
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        onClose={() => setIsMenuOpen(false)}
        historyItems={mockHistoryData}
      />

      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 z-30"
        ></div>
      )}

      {/* Bố cục chính của trang */}
      <div className="flex flex-col flex-1 w-full max-w-7xl mx-auto p-4 md:p-6">
        {/* KHU VỰC 1: Chọn Model (Đã di chuyển lên trên) */}
        <div className="flex justify-center mb-6">
          <ModelSelector
            availableModels={availableModels}
            selectedModels={selectedModels}
            setSelectedModels={setSelectedModels}
          />
        </div>

        {/* KHU VỰC 2: Hiển thị câu trả lời (Tự co giãn) */}
        <div className="flex-grow overflow-auto">
          <AnswerDisplay
            isLoading={isLoading}
            answers={answers}
            selectedModels={selectedModels}
            error={error}
          />
        </div>

        {/* KHU VỰC 3: Nhập câu hỏi (Luôn ở dưới cùng) */}
        <div className="mt-6">
          <QuestionForm
            question={question}
            setQuestion={setQuestion}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </main>
  );
}
