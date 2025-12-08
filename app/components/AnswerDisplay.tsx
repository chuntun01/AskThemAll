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
  role: "user" | "assistant";
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
        // --- LOGIC QUAN TRỌNG: XÁC ĐỊNH USER HAY AI ---
        const isUser = msg.role === "user"; // Nếu role là 'user' thì đúng là User
        const modelName = !isUser ? resolveModelName(msg) : undefined;
        const displayContent = isUser ? msg.content : preprocessContent(msg.content);
        
        // Kiểm tra xem có đang stream không (cho tin nhắn cuối cùng của AI)
        const isStreaming = !isUser && isLoading && index === messages.length - 1;

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
                // NẾU LÀ USER: Màu xanh (Green), căn phải, bo góc khác
                isUser
                  ? "bg-[#DCF8C6] text-gray-900 rounded-tr-sm ml-auto"
                  // NẾU LÀ AI: Màu trắng (White), căn trái, có viền
                  : "bg-white text-gray-900 border border-gray-200 rounded-tl-sm mr-auto",
              ].join(" ")}
            >
              {/* --- TÊN AI (Chỉ hiện nếu KHÔNG PHẢI là User) --- */}
              {!isUser && (
                <div className="text-xs font-semibold text-gray-500 mb-2 select-none flex items-center justify-between">
                  <span>{modelName || "AI"}</span>
                  {isStreaming && (
                    <span className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  )}
                </div>
              )}

              {/* --- NỘI DUNG TIN NHẮN --- */}
              <div className={`markdown-content break-words overflow-hidden ${isStreaming ? "result-streaming" : ""}`}>
                {isUser ? (
                  // User: Text thường
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                ) : (
                  // AI: Render Markdown + Math
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                      code: ({ node, className, children, ...props }: any) => {
                        const match = /language-(\w+)/.exec(className || "");
                        const isInline = !match && !String(children).includes("\n");
                        if (isInline) {
                          return (
                            <code className="px-1.5 py-0.5 rounded bg-gray-100 text-red-500 font-mono text-sm border border-gray-200 mx-0.5" {...props}>
                              {children}
                            </code>
                          );
                        }
                        return (
                          <div className="my-3 rounded-lg border border-gray-200 bg-gray-900 overflow-hidden">
                            <div className="px-3 py-1 bg-gray-800 text-xs text-gray-400 border-b border-gray-700 flex justify-between items-center">
                              <span>{match?.[1] || "code"}</span>
                            </div>
                            <div className="overflow-x-auto p-3">
                              <code className="font-mono text-sm text-gray-50 block" {...props}>
                                {children}
                              </code>
                            </div>
                          </div>
                        );
                      },
                      p: ({ node, ...props }) => <p className="mb-2 last:mb-0 leading-7" {...props} />,
                      table: ({ node, ...props }) => (
                        <div className="overflow-x-auto my-3 rounded-lg border border-gray-200">
                          <table className="w-full border-collapse bg-gray-50 text-left text-sm" {...props} />
                        </div>
                      ),
                      thead: ({ node, ...props }) => (
                        <thead className="bg-gray-100 border-b border-gray-200 font-semibold text-gray-700" {...props} />
                      ),
                      tbody: ({ node, ...props }) => (
                        <tbody className="divide-y divide-gray-200 bg-white" {...props} />
                      ),
                      tr: ({ node, ...props }) => (
                        <tr className="hover:bg-gray-50 transition-colors" {...props} />
                      ),
                      th: ({ node, ...props }) => (
                        <th className="px-4 py-2 whitespace-nowrap" {...props} />
                      ),
                      td: ({ node, ...props }) => (
                        <td className="px-4 py-2 align-top" {...props} />
                      ),
                      a: ({ node, ...props }) => (
                        <a className="text-blue-600 hover:underline break-all" target="_blank" rel="noopener noreferrer" {...props} />
                      ),
                    }}
                  >
                    {displayContent}
                  </ReactMarkdown>
                )}
              </div>

              {/* --- NÚT COPY (Chỉ hiện nếu KHÔNG PHẢI là User) --- */}
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
                  <div className={`pointer-events-none absolute -top-8 right-0 text-[10px] px-2 py-1 rounded bg-black/80 text-white shadow transition-opacity duration-200 ${copiedId === msg.id ? "opacity-100" : "opacity-0"}`}>
                    Đã copy!
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}

      {/* Loading khi chưa có phản hồi nào */}
      {isLoading && messages.length > 0 && messages[messages.length - 1].role === "user" && (
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