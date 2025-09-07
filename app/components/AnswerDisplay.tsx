"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

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
  modelName?: string; // 👈 thêm nếu server có trả displayName trực tiếp
}
interface AnswerDisplayProps {
  isLoading: boolean;
  messages: Message[];
  selectedModels: AIModel[];
  error: string | null;
  availableModels?: AIModel[]; // 👈 optional để fallback khi tìm tên
}

export default function AnswerDisplay({
  isLoading,
  messages = [],
  selectedModels = [],
  error,
  availableModels = [],
}: AnswerDisplayProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId((x) => (x === id ? null : x)), 1200);
    } catch {
      // ignore
    }
  };

  // 👇 Hàm lấy tên hiển thị gọn gàng
  const resolveModelName = (msg: Message): string => {
    if (msg.modelName && msg.modelName.trim()) return msg.modelName;

    if (msg.modelId) {
      const hitSel =
        selectedModels.find(
          (m) => m.modelId === msg.modelId || m._id === msg.modelId
        ) ||
        availableModels.find(
          (m) => m.modelId === msg.modelId || m._id === msg.modelId
        );

      if (hitSel) {
        return hitSel.displayName || hitSel.modelId.split("/").pop() || hitSel.modelId;
      }

      return msg.modelId.split("/").pop() || msg.modelId;
    }
    return "AI";
  };

  return (
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
        const modelName = !isUser ? resolveModelName(msg) : undefined;

        return (
          <div
            key={msg.id}
            className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={[
                "relative group",
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

              {/* Nút Copy */}
              {!isUser && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCopy(msg.id, msg.content)}
                    title={copiedId === msg.id ? "Đã copy" : "Sao chép"}
                    aria-label="Sao chép"
                    className="
                      absolute top-2 right-2
                      p-1 rounded-md
                      bg-white/70 hover:bg-white shadow border border-black/10
                      text-gray-600 hover:text-gray-900
                      opacity-0 group-hover:opacity-100 focus:opacity-100
                      transition
                    "
                  >
                    <Copy size={16} strokeWidth={2} />
                  </button>

                  <div
                    className={`
                      pointer-events-none absolute -top-7 right-2
                      text-xs px-2 py-1 rounded-md bg-black/75 text-white shadow transition
                      ${copiedId === msg.id ? "opacity-100" : "opacity-0"}
                    `}
                  >
                    Đã copy
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}

      {/* Loading */}
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
