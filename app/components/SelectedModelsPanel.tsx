"use client";

import React from "react";
import type { AIModel } from "@/types/AIModel";
import { Cpu, X } from "lucide-react"; // Thêm icon X

type SelectedModelsPanelProps = {
  models: AIModel[];
  onRemoveModel: (modelId: string) => void; // ⬅ Thêm prop này để xử lý xóa
};

const SelectedModelsPanel: React.FC<SelectedModelsPanelProps> = ({
  models,
  onRemoveModel,
}) => {
  // Không hiện panel trên mobile + khi chưa có model
  if (!models || models.length === 0) {
    return (
      <aside className="hidden lg:flex flex-col gap-3">
        <div className="rounded-2xl border border-slate-200 bg-white/70 shadow px-3 py-3 text-xs text-slate-400 text-center">
          Chưa chọn model nào
        </div>
      </aside>
    );
  }

  return (
    <aside className="hidden lg:flex flex-col gap-4">
      {models.map((model) => (
        <article
          key={model.modelId}
          className="group relative rounded-2xl border border-slate-200 bg-white/80 shadow-sm px-3 py-3 flex flex-col gap-1 transition-all hover:shadow-md hover:border-slate-300"
        >
          <div className="flex items-start justify-between gap-2">
            {/* Left: Icon + Name */}
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                <Cpu className="h-4 w-4 text-slate-500" />
              </div>
              <p className="text-sm font-semibold text-slate-700 truncate" title={model.displayName}>
                {model.displayName}
              </p>
            </div>

            {/* Right: Badge + Close Button */}
            <div className="flex items-center gap-1 shrink-0">
              {/* Badge Trả phí */}
              {model.isFree === false && (
                <span className="rounded-full bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5">
                  Paid
                </span>
              )}

              {/* Nút Xóa Model */}
              <button
                onClick={() => onRemoveModel(model.modelId)}
                className="p-1 rounded-full text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                title="Bỏ chọn model này"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {model.provider && (
            <p className="text-[11px] text-slate-400 pl-9">
              {model.provider}
            </p>
          )}
        </article>
      ))}
    </aside>
  );
};

export default SelectedModelsPanel;