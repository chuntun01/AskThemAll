"use client";

import React, {useEffect, useState} from "react";
import type {UserFormValues, UserProfile} from "@/lib/actions/user.action";

interface UserModalProps {
  open: boolean;
  mode: "create" | "edit";
  initialData?: UserProfile | null;
  onClose: () => void;
  onSubmit: (values: UserFormValues) => Promise<void> | void;
}

export default function UserModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: UserModalProps) {
  const [form, setForm] = useState<UserFormValues>({
    clerkId: "",
    username: "",
    avatarUrl: "",
    email: "",
    isAdmin: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Đổ dữ liệu khi mở popup
  useEffect(() => {
    if (open) {
      if (mode === "edit" && initialData) {
        setForm({
          clerkId: initialData.clerkId,
          username: initialData.username,
          avatarUrl: initialData.avatarUrl,
          email: initialData.email,
          isAdmin: initialData.isAdmin,
        });
      } else {
        setForm({
          clerkId: "",
          username: "",
          avatarUrl: "",
          email: "",
          isAdmin: false,
        });
      }
      setError(null);
      setSubmitting(false);
    }
  }, [open, mode, initialData]);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value, type, checked} = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    if (!form.username.trim()) {
      setError("Tên hiển thị là bắt buộc.");
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
          {mode === "create" ? "Thêm người dùng" : "Chỉnh sửa người dùng"}
        </h3>

        <form
          onSubmit={handleSubmit}
          style={{display: "flex", flexDirection: "column", gap: "0.75rem"}}
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
              Clerk Id
            </label>
            <input
              name="clerkId"
              value={form.clerkId}
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
              name="username"
              value={form.username}
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
              name="isAdmin"
              checked={form.isAdmin}
              onChange={handleChange}
              style={{marginRight: 8}}
            />
            quyền admin?
          </label>

          {error && (
            <p style={{color: "red", fontSize: "0.85rem", marginTop: 4}}>
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
