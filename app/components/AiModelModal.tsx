"use client";

import React, { useEffect, useState } from "react";
import type { AIModelFormValues, AIModel } from "@/lib/actions/model.action";

interface AiModelModalProps {
  open: boolean;
  mode: "create" | "edit";
  initialData?: AIModel | null;
  onClose: () => void;
  onSubmit: (values: AIModelFormValues) => Promise<void> | void;
}

export default function AiModelModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: AiModelModalProps) {
  const [form, setForm] = useState<AIModelFormValues>({
    modelId: "",
    displayName: "",
    provider: "",
    isFree: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Đổ dữ liệu khi mở popup
  useEffect(() => {
    if (open) {
      if (mode === "edit" && initialData) {
        setForm({
          modelId: initialData.modelId,
          displayName: initialData.displayName,
          provider: initialData.provider,
          isFree: initialData.isFree,
        });
      } else {
        setForm({
          modelId: "",
          displayName: "",
          provider: "",
          isFree: false,
        });
      }
      setError(null);
      setSubmitting(false);
    }
  }, [open, mode, initialData]);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    if (!form.modelId.trim() || !form.displayName.trim()) {
      setError("Model ID và tên hiển thị là bắt buộc.");
      setSubmitting(false);
      return;
    }

    try {
      await onSubmit(form);
      onClose();
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "#ffffff",
          borderRadius: "12px",
          padding: "1.5rem",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          color: "#000000", // toàn bộ text bên trong mặc định màu đen
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: "1rem",
            color: "#000000",
          }}
        >
          {mode === "create" ? "Thêm AI Model" : "Chỉnh sửa AI Model"}
        </h3>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.9rem",
                marginBottom: 4,
                color: "#000000",
              }}
            >
              Model ID
            </label>
            <input
              name="modelId"
              value={form.modelId}
              onChange={handleChange}
              placeholder="vd: mistralai/mistral-7b-instruct"
              style={{
                color: "#000000",
                width: "100%",
                padding: "0.5rem 0.6rem",
                borderRadius: "6px",
                border: "1px solid #d4d4d8",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.9rem",
                marginBottom: 4,
                color: "#000000",
              }}
            >
              Tên hiển thị
            </label>
            <input
              name="displayName"
              value={form.displayName}
              onChange={handleChange}
              placeholder="vd: Mistral 7B"
              style={{
                color: "#000000",
                width: "100%",
                padding: "0.5rem 0.6rem",
                borderRadius: "6px",
                border: "1px solid #d4d4d8",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.9rem",
                marginBottom: 4,
                color: "#000000",
              }}
            >
              Provider
            </label>
            <input
              name="provider"
              value={form.provider}
              onChange={handleChange}
              placeholder="vd: Mistral AI, Google, DeepsSeek, ..."
              style={{
                color: "#000000",
                width: "100%",
                padding: "0.5rem 0.6rem",
                borderRadius: "6px",
                border: "1px solid #d4d4d8",
              }}
            />
          </div>

          <label
            style={{
              fontSize: "0.9rem",
              color: "#000000",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              name="isFree"
              checked={form.isFree}
              onChange={handleChange}
              style={{ marginRight: 8 }}
            />
            Model miễn phí?
          </label>

          {error && (
            <p style={{ color: "red", fontSize: "0.85rem", marginTop: 4 }}>
              {error}
            </p>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.5rem",
              marginTop: "0.5rem",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              style={{
                padding: "0.45rem 0.9rem",
                borderRadius: "6px",
                border: "1px solid #d4d4d8",
                background: "#f9fafb",
                cursor: "pointer",
                color: "#000000",
              }}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: "0.45rem 0.9rem",
                borderRadius: "6px",
                border: "none",
                background: "#2563eb",
                color: "#ffffff",
                cursor: "pointer",
              }}
            >
              {submitting
                ? "Đang lưu..."
                : mode === "create"
                ? "Thêm"
                : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
