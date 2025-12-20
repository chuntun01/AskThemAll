// "use client";

// import React, { useEffect, useRef } from "react";
// import AnswerDisplay from "./AnswerDisplay";
// import type { Message } from "@/lib/store/chat";
// import type { AIModel } from "@/types/AIModel";
// import SelectedModelsPanel from "./SelectedModelsPanel";

// type ChatSectionProps = {
//   messages: Message[];
//   isLoading: boolean;
//   selectedModels: AIModel[];
//   onRemoveModel: (modelId: string) => void; 
//   error: string | null;
//   question: string;
//   onQuestionChange: (value: string) => void;
//   onSubmit: () => void;
//   listEndRef: React.RefObject<HTMLDivElement>;
// };

// const ChatSection: React.FC<ChatSectionProps> = ({
//   messages,
//   isLoading,
//   selectedModels,
//   onRemoveModel, // ⬅ Nhận prop từ Page
//   error,
//   question,
//   onQuestionChange,
//   onSubmit,
//   listEndRef,
// }) => {
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   // --- FIX LỖI UPDATE LOOP & AUTO HEIGHT ---
//   // Sử dụng useEffect để chỉnh độ cao sau khi state 'question' thay đổi
//   // Điều này tránh xung đột render gây ra lỗi "Maximum update depth exceeded"
//   useEffect(() => {
//     const textarea = textareaRef.current;
//     if (textarea) {
//       textarea.style.height = "auto";
//       textarea.style.height = `${textarea.scrollHeight}px`;
//     }
//   }, [question]);

//   return (
//     <section className="w-full flex-1">
//       {/* CSS ẩn thanh cuộn nhưng vẫn scroll được */}
//       <style jsx global>{`
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>

//       <div className="w-full px-0 grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_260px] gap-6">
//         {/* Cột trái: Chat */}
//         <div className="flex flex-col gap-3 md:gap-4 flex-1">
//           <div className="flex flex-col h-[calc(100vh-100px)] rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_20px_55px_rgba(15,23,42,0.25)] border border-white/70 overflow-hidden relative">
            
//             {/* Vùng hiển thị tin nhắn */}
//             <div className="flex-1 overflow-y-auto min-h-0 px-4 sm:px-6 py-4 sm:py-5 scroll-smooth no-scrollbar">
//               <AnswerDisplay
//                 messages={messages as any}
//                 isLoading={isLoading}
//                 selectedModels={selectedModels}
//                 error={error}
//               />
//               <div ref={listEndRef} className="h-1" />
//             </div>

//             {/* Vùng nhập liệu */}
//             <div className="shrink-0 z-10 border-t border-slate-200/70 bg-white/90 backdrop-blur-md">
//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   onSubmit();
//                 }}
//                 className="px-3 sm:px-4 py-3 sm:py-4"
//               >
//                 <div className="flex items-end gap-2 sm:gap-3">
//                   <textarea
//                     ref={textareaRef}
//                     rows={1}
//                     value={question}
//                     // Chỉ cập nhật state, việc resize do useEffect lo
//                     onChange={(e) => onQuestionChange(e.target.value)}
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter" && !e.shiftKey) {
//                         e.preventDefault();
//                         onSubmit();
//                       }
//                     }}
//                     placeholder="Hỏi bất kỳ điều gì..."
//                     className="textarea-auto flex-1 max-h-[160px] px-4 py-3 rounded-2xl bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400/70 focus:border-transparent shadow-inner resize-none overflow-y-auto text-sm sm:text-base no-scrollbar"
//                   />
//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="h-11 sm:h-12 px-4 sm:px-5 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-sm sm:text-base"
//                   >
//                     Gửi
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>

//         {/* Cột phải: Panel Model */}
//         {/* Truyền hàm xóa vào đây */}
//         <SelectedModelsPanel 
//             models={selectedModels} 
//             onRemoveModel={onRemoveModel} 
//         />
//       </div>
//     </section>
//   );
// };

// export default ChatSection;

"use client";

import React, { useEffect, useRef } from "react";
import AnswerDisplay from "./AnswerDisplay";
import type { Message } from "@/lib/store/chat";
import type { AIModel } from "@/types/AIModel";
import SelectedModelsPanel from "./SelectedModelsPanel";

type ChatSectionProps = {
  messages: Message[];
  isLoading: boolean;
  selectedModels: AIModel[];
  onRemoveModel: (modelId: string) => void;
  error: string | null;
  question: string;
  onQuestionChange: (value: string) => void;

  // ✅ đổi signature để nhận question
  onSubmit: (question: string) => void | Promise<void>;

  listEndRef: React.RefObject<HTMLDivElement>;
};

const ChatSection: React.FC<ChatSectionProps> = ({
  messages,
  isLoading,
  selectedModels,
  onRemoveModel,
  error,
  question,
  onQuestionChange,
  onSubmit,
  listEndRef,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [question]);

  const handleSubmit = async () => {
    const q = question.trim();
    if (!q) return;          // ✅ không gửi câu rỗng
    if (isLoading) return;   // ✅ chặn gửi chồng request

    await onSubmit(q);
  };

  return (
    <section className="w-full flex-1">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="w-full px-0 grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_260px] gap-6">
        <div className="flex flex-col gap-3 md:gap-4 flex-1">
          <div className="flex flex-col h-[calc(100vh-100px)] rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_20px_55px_rgba(15,23,42,0.25)] border border-white/70 overflow-hidden relative">
            <div className="flex-1 overflow-y-auto min-h-0 px-4 sm:px-6 py-4 sm:py-5 scroll-smooth no-scrollbar">
              <AnswerDisplay
                messages={messages as any}
                isLoading={isLoading}
                selectedModels={selectedModels}
                error={error}
              />
              <div ref={listEndRef} className="h-1" />
            </div>

            <div className="shrink-0 z-10 border-t border-slate-200/70 bg-white/90 backdrop-blur-md">
              <form
                ref={formRef}
                onSubmit={(e) => {
                  e.preventDefault();
                  void handleSubmit();
                }}
                className="px-3 sm:px-4 py-3 sm:py-4"
              >
                <div className="flex items-end gap-2 sm:gap-3">
                  <textarea
                    ref={textareaRef}
                    rows={1}
                    value={question}
                    onChange={(e) => onQuestionChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        // ✅ chỉ kích hoạt submit của form (1 đường duy nhất)
                        formRef.current?.requestSubmit();
                      }
                    }}
                    placeholder="Hỏi bất kỳ điều gì."
                    className="textarea-auto flex-1 max-h-[160px] px-4 py-3 rounded-2xl bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400/70 focus:border-transparent shadow-inner resize-none overflow-y-auto text-sm sm:text-base no-scrollbar"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !question.trim()}
                    className="h-11 sm:h-12 px-4 sm:px-5 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-sm sm:text-base"
                  >
                    Gửi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <SelectedModelsPanel models={selectedModels} onRemoveModel={onRemoveModel} />
      </div>
    </section>
  );
};

export default ChatSection;
