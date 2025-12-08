"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface AIModel {
  _id: string;
  modelId: string;
  displayName: string;
}

interface Message {
  id: string;
  isAdmin: boolean;
  content: string;
  modelId?: string;
  modelName?: string;
}

interface AnswerDisplayProps {
  isLoading: boolean;
  messages: Message[];
  selectedModels: AIModel[];
  error: string | null;
  availableModels?: AIModel[];
}

// --- HÀM XỬ LÝ CHUẨN HÓA LATEX ---
const preprocessContent = (content: string) => {
  if (!content) return "";
  let cleaned = content.replace(/\\\[/g, "$$").replace(/\\\]/g, "$$");
  cleaned = cleaned.replace(/\\\(/g, "$").replace(/\\\)/g, "$");
  return cleaned;
};

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
        return (
          hitSel.displayName ||
          hitSel.modelId.split("/").pop() ||
          hitSel.modelId
        );
      }
      return msg.modelId.split("/").pop() || msg.modelId;
    }
    return "AI";
  };

  return (
    <div className="flex flex-col gap-5 w-full px-2 sm:px-4 py-4">
      {/* --- CSS CHO CON TRỎ NHẤP NHÁY --- */}
      <style jsx global>{`
        .result-streaming > *:last-child::after {
          content: "▋";
          display: inline-block;
          vertical-align: baseline;
          margin-left: 4px;
          color: #000;
          animation: blink 1s step-start infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .result-streaming > pre:last-child::after,
        .result-streaming > div:last-child::after {
          content: "" !important;
          display: none !important;
        }
      `}</style>

      {error && (
        <div className="w-full">
          <div className="bg-red-50 text-red-700 border border-red-200 rounded-md px-4 py-3 text-sm">
            {error}
          </div>
        </div>
      )}

     {messages.map((msg, index) => {
  // Xác định AI hay User dựa trên modelId
  const isAi = !!msg.modelId;      // có modelId => tin nhắn AI
  const isUser = !isAi;            // không có modelId => câu hỏi của user

  const modelName = isAi ? resolveModelName(msg) : undefined;
  const displayContent = isAi
    ? preprocessContent(msg.content)
    : msg.content;

  // Tin nhắn cuối cùng của AI đang stream
  const isStreaming = isAi && isLoading && index === messages.length - 1;

  return (
    <div
      key={msg.id}
      className={`w-full flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={[
          "relative group",
          "w-fit max-w-[98%] sm:max-w-[90%] lg:max-w-[85%]",
          "px-5 py-3 rounded-2xl shadow-sm leading-relaxed text-[15px]",
          isUser
            ? "bg-[#DCF8C6] text-gray-900 rounded-tr-sm ml-auto"
            : "bg-white text-gray-900 border border-gray-200 rounded-tl-sm mr-auto",
        ].join(" ")}
      >
        {/* Tên model cho AI */}
        {!isUser && (
          <div className="text-xs font-semibold text-gray-500 mb-2 select-none flex items-center justify-between">
            <span>{modelName || "AI"}</span>
            {isStreaming && (
              <span className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            )}
          </div>
        )}

        {/* Nội dung */}
        <div
          className={`markdown-content break-words overflow-hidden ${
            isStreaming ? "result-streaming" : ""
          }`}
        >
          {isUser ? (
            <div className="whitespace-pre-wrap">{msg.content}</div>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {displayContent}
            </ReactMarkdown>
          )}
        </div>

        {/* Nút copy chỉ cho AI */}
        {!isUser && !isStreaming && (
          <>
            <button
              type="button"
              onClick={() => handleCopy(msg.id, msg.content)}
              title={copiedId === msg.id ? "Đã copy" : "Sao chép"}
              className="absolute top-2 right-2 p-1.5 rounded-md bg-white/80 hover:bg-white shadow-sm border border-gray-200 text-gray-500 hover:text-gray-900 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200"
            >
              <Copy size={14} strokeWidth={2} />
            </button>
            <div
              className={`pointer-events-none absolute -top-8 right-0 text-[10px] px-2 py-1 rounded bg-black/80 text-white shadow transition-opacity duration-200 ${
                copiedId === msg.id ? "opacity-100" : "opacity-0"
              }`}
            >
              Đã copy!
            </div>
          </>
        )}
      </div>
    </div>
  );
})}


      {/* Loading khi chưa có phản hồi nào */}
      {isLoading && messages.length > 0 && !messages[messages.length - 1].isAdmin && (
        <div className="w-full flex justify-start">
          <div className="w-fit bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
            <span className="text-gray-500 text-sm font-medium flex items-center gap-2">
              Đang suy nghĩ...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}