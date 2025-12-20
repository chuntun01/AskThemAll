/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import NavbarMenu from "../components/NavMenu";
import AiModelModal from "../components/AiModelModal";

import {
  fetchAIModels,
  createAIModel,
  updateAIModel,
  deleteAIModel,
  type AIModel,
  type AIModelFormValues,
} from "@/lib/actions/model.action";

export default function AimodelsPage() {
  const [aimodels, setAIModels] = useState<AIModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // popup
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [modalInitial, setModalInitial] = useState<AIModel | null>(null);

  const { isLoaded, isSignedIn } = useUser();

  // Lấy dữ liệu
  const loadModels = async () => {
    try {
      setIsLoading(true);
      const data = await fetchAIModels();
      setAIModels(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Không thể tải danh sách models.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      loadModels();
    } else if (isLoaded && !isSignedIn) {
      setIsLoading(false);
      setAIModels([]);
    }
  }, [isLoaded, isSignedIn]);

  // mở popup thêm mới
  const handleOpenCreate = () => {
    setModalMode("create");
    setModalInitial(null);
    setModalOpen(true);
  };

  // mở popup sửa cho 1 model cụ thể
  const handleOpenEditFor = (model: AIModel) => {
    setSelectedId(model.id);
    setModalMode("edit");
    setModalInitial(model);
    setModalOpen(true);
  };

  // submit popup
  const handleSubmitModal = async (values: AIModelFormValues) => {
    if (modalMode === "create") {
      await createAIModel(values);
    } else if (modalMode === "edit" && modalInitial) {
      await updateAIModel(modalInitial.id, values);
    }
    await loadModels();
  };

  // xoá 1 model cụ thể
  const handleDeleteFor = async (id: string) => {
    if (!window.confirm("Bạn chắc chắn muốn xoá model này?")) return;
    try {
      await deleteAIModel(id);
      if (selectedId === id) setSelectedId(null);
      await loadModels();
    } catch (err: any) {
      setError(err.message || "Không thể xoá model.");
    }
  };

  if (!isLoaded || isLoading) {
    return <div style={{ padding: "2rem" }}>Đang tải...</div>;
  }

  if (!isSignedIn) {
    return (
      <div style={{ padding: "2rem" }}>
        Vui lòng đăng nhập để xem thông tin.
      </div>
    );
  }

  const selectedModel = selectedId
    ? aimodels.find((m) => m.id === selectedId) || null
    : null;

  return (
    <>
      <NavbarMenu
        isMenuOpen={isMenuOpen}
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        onClose={() => setIsMenuOpen(false)}
        historyItems={[]} onNewChat={function (): void {
          throw new Error("Function not implemented.");
        } }      />

      <div
        style={{
          fontFamily: "sans-serif",
          maxWidth: "1200px",
          margin: "6rem auto 2rem",
          padding: "0 2rem 2rem",
        }}
      >
        {/* THANH THÔNG TIN + NÚT BÊN PHẢI */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <div>
            <h2 style={{ margin: 0 }}>Danh sách AI Models</h2>
            {selectedModel && (
              <p
                style={{
                  margin: "0.25rem 0",
                  fontSize: "0.9rem",
                  color: "#444",
                }}
              >
                Đang chọn: {selectedModel.displayName}
              </p>
            )}
            {error && (
              <p
                style={{
                  margin: "0.25rem 0",
                  fontSize: "0.85rem",
                  color: "red",
                }}
              >
                {error}
              </p>
            )}
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={handleOpenCreate}
              style={{
                padding: "0.4rem 0.8rem",
                borderRadius: "6px",
                border: "none",
                background: "#16a34a",
                color: "#fff",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              + Thêm model
            </button>
            <button
              onClick={loadModels}
              style={{
                padding: "0.4rem 0.8rem",
                borderRadius: "6px",
                border: "none",
                background: "#0284c7",
                color: "#fff",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              🔄 Đồng bộ
            </button>
          </div>
        </div>

        {/* DANH SÁCH MODEL – mỗi card có nút SỬA / XOÁ bên phải */}
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {aimodels.map((model) => (
            <div
              key={model.id}
              onClick={() => setSelectedId(model.id)}
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                padding: "1rem 1.25rem",
                background: selectedId === model.id ? "#f0f9ff" : "#fff",
                cursor: "pointer",
                boxShadow:
                  selectedId === model.id
                    ? "0 0 0 2px rgba(59,130,246,0.3)"
                    : "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  justifyContent: "space-between",
                }}
              >
                {/* BÊN TRÁI: avatar + info */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      background: "#f5f5f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.8rem",
                      color: "#555",
                      fontWeight: 600,
                    }}
                  >
                    {model.provider || "AI"}
                  </div>
                  <div>
                    <p
                      style={{
                        color: "#000000",
                        margin: 0,
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                      }}
                    >
                      {model.displayName}
                    </p>
                    <p style={{ margin: 0, fontSize: "0.9rem" }}>
                      <strong style={{ color: "#000000" }}>Model ID:</strong>{" "}
                      {model.modelId}
                    </p>
                    <p style={{ margin: 0, fontSize: "0.9rem" }}>
                      <strong style={{ color: "#000000" }}>Miễn phí?:</strong>{" "}
                      <span style={{ color: "#000000" }}>
                        {model.isFree ? "Có" : "Không"}
                      </span>
                    </p>
                  </div>
                </div>

                {/* BÊN PHẢI: nút SỬA / XOÁ (ô đỏ) */}
                <div
                  style={{
                    display: "flex",
                    gap: "0.4rem",
                    flexShrink: 0,
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // không trigger chọn card
                      handleOpenEditFor(model);
                    }}
                    style={{
                      padding: "0.35rem 0.7rem",
                      borderRadius: "6px",
                      border: "none",
                      background: "#f59e0b",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                    }}
                  >
                    ✏️ Sửa
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteFor(model.id);
                    }}
                    style={{
                      padding: "0.35rem 0.7rem",
                      borderRadius: "6px",
                      border: "none",
                      background: "#dc2626",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                    }}
                  >
                    🗑 Xoá
                  </button>
                </div>
              </div>
            </div>
          ))}

          {aimodels.length === 0 && (
            <p style={{ color: "#555" }}>Chưa có AI model nào.</p>
          )}
        </div>
      </div>

      {/* Popup thêm / sửa */}
      <AiModelModal
        open={modalOpen}
        mode={modalMode}
        initialData={modalInitial}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitModal}
      />
    </>
  );
}
