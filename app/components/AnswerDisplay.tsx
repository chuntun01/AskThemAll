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
  modelId?: string;
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
    // KHÔNG giới hạn max-width ở đây nữa -> để card quyết định
    <div className="flex flex-col gap-4 w-full px-2 sm:px-4 py-4">
      {/* Lỗi */}
      {error && (
        <div className="w-full">
          <div className="bg-red-50 text-red-700 border border-red-200 rounded-md px-4 py-3">
            {error}
          </div>
        </div>
      )}

      {/* Lịch sử */}
      {messages.map((msg) => {
        const isUser = msg.role === "user";
        const modelName =
          !isUser && msg.modelId
            ? selectedModels.find((m) => m._id === msg.modelId)?.displayName ?? "AI"
            : undefined;

        return (
          <div
            key={msg.id}
            className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={[
                // >>>> NỚI RỘNG BONG BÓNG
                "w-fit max-w-[98%] sm:max-w-[96%] lg:max-w-[98%]",
                "px-4 py-3 rounded-2xl shadow-md",
                isUser
                  ? "bg-[#DCF8C6] text-gray-900 rounded-tr-sm ml-auto"
                  : "bg-white text-gray-900 border rounded-tl-sm mr-auto",
              ].join(" ")}
            >
              {!isUser && (
                <div className="text-xs text-gray-500 mb-1">{modelName || "AI"}</div>
              )}
              <div className="whitespace-pre-wrap break-words">{msg.content}</div>
            </div>
          </div>
        );
      })}

      {/* Loading đẹp hơn (chữ đen + chấm nhảy) */}
      {isLoading && (
        <div className="w-full flex justify-start">
          <div className="w-fit max-w-[98%] bg-gray-100 border rounded-2xl px-4 py-3 shadow-sm">
            <span className="text-gray-900 font-medium flex items-center gap-2">
              Đang xử lý
              <span className="flex gap-1">
                <span className="w-2 h-2 bg-gray-900 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 bg-gray-900 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 bg-gray-900 rounded-full animate-bounce" />
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
