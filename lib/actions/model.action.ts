// lib/models.action.ts

export interface AIModel {
  id: string;
  modelId: string;
  displayName: string;
  provider: string;
  isFree: boolean;
}

export interface AIModelFormValues {
  modelId: string;
  displayName: string;
  provider: string;
  isFree: boolean;
}

// Lấy danh sách AI models
export async function fetchAIModels(): Promise<AIModel[]> {
  const res = await fetch("/api/aimodels", { cache: "no-store" });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || err.message || "Không thể tải danh sách models.");
  }

  const data = await res.json();
  return data.aimodels || [];
}

// Tạo model mới
export async function createAIModel(payload: AIModelFormValues): Promise<AIModel> {
  const res = await fetch("/api/aimodels", {   // <-- chú ý: aimodels (không có gạch ngang)
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Không thể thêm model.");
  }

  return res.json();
}


// Cập nhật model
export async function updateAIModel(
  id: string,
  payload: Partial<AIModelFormValues>
): Promise<AIModel> {
  const res = await fetch(`/api/aimodels/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Không thể cập nhật model.");
  }

  return res.json();
}

// Xoá model
export async function deleteAIModel(id: string): Promise<void> {
  const res = await fetch(`/api/aimodels/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Không thể xoá model.");
  }
}
