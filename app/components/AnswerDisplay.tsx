"use client";

interface AIModel {
  _id: string;
  modelId: string;
  displayName: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  modelId?: string; // assistant dùng để tìm displayName
}

interface AnswerDisplayProps {
  isLoading: boolean;
  messages: Message[];
  selectedModels: AIModel[];
  error: string | null;
}

export default function AnswerDisplay({
  isLoading,
  messages = [],
  selectedModels = [],
  error,
}: AnswerDisplayProps) {
  return (
    <div className="flex flex-col gap-4 items-center w-full max-w-4xl mx-auto px-4 py-4">
      {/* Thông báo lỗi (không che lịch sử) */}
      {error && (
        <div className="w-full">
          <div className="bg-red-50 text-red-700 border border-red-200 rounded-md px-4 py-3">
            {error}
          </div>
        </div>
      )}

      {/* Lịch sử hội thoại: cũ → mới */}
      {messages.map((msg) => {
        const isUser = msg.role === "user";
        const modelName =
          !isUser && msg.modelId
            ? selectedModels.find((m) => m._id === msg.modelId)?.displayName ??
              "AI"
            : undefined;

        return (
          <div
            key={msg.id}
            className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-md ${
                isUser
                  ? "bg-[#DCF8C6] text-gray-900 rounded-tr-sm"
                  : "bg-white text-gray-900 border rounded-tl-sm"
              }`}
            >
              {!isUser && (
                <div className="text-xs text-gray-500 mb-1">
                  {modelName || "AI"}
                </div>
              )}
              <div className="whitespace-pre-wrap break-words">{msg.content}</div>
            </div>
          </div>
        );
      })}

      {/* Trạng thái đang xử lý (không che lịch sử) */}
      {isLoading && (
        <div className="w-full flex justify-start">
          <div className="max-w-[85%] bg-white border rounded-2xl px-4 py-3 shadow-sm">
            Đang xử lý câu trả lời...
          </div>
        </div>
      )}
    </div>
  );
}
