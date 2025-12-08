// lib/actions/user.action.ts

export interface UserProfile {
  avatarUrl: string;
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  clerkId?: string;
}

export interface UserFormValues {
  avatarUrl?: string;
  clerkId: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

// KHÔNG import mongoose hay model ở đây, chỉ dùng fetch

export async function fetchUsers(): Promise<UserProfile[]> {
  const res = await fetch("/api/users", { cache: "no-store" });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Không thể tải danh sách users.");
  }

  const data = await res.json();
  return data.users || [];
}

export async function createUser(payload: UserFormValues): Promise<UserProfile> {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Không thể tạo user.");
  }

  return res.json();
}

export async function updateUser(
  id: string,
  payload: Partial<UserFormValues>
): Promise<UserProfile> {
  const res = await fetch(`/api/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Không thể cập nhật user.");
  }

  return res.json();
}

export async function deleteUser(id: string): Promise<void> {
  const res = await fetch(`/api/users/${id}`, { method: "DELETE" });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Không thể xoá user.");
  }
}
