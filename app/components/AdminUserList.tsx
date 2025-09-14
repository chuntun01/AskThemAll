// components/AdminUserList.tsx
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

interface UserProfile {
  _id: string;
  clerkId: string;
  username: string;
  email: string;
}

export default function AdminUserList() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Không thể tải danh sách người dùng.");
        }
        const data = await response.json();
        if (data.success) {
          setUsers(data.users);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (isLoading) return <div>Đang tải danh sách người dùng...</div>;
  if (error) return <div style={{ color: "red" }}>Lỗi: {error}</div>;

  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        maxHeight: "60vh",
        overflowY: "auto",
      }}
    >
      {users.length > 0 ? (
        users.map((user) => (
          <li key={user.clerkId}>
            <Link
              href={`/admin/users/${user.clerkId}`} // Đường dẫn đến trang chi tiết user
              style={{
                display: "block",
                padding: "8px 12px",
                borderRadius: "6px",
                textDecoration: "none",
                color: "inherit",
                marginBottom: "4px",
              }}
              className="hover:bg-white/30 transition-colors"
            >
              <p style={{ margin: 0, fontWeight: "500" }}>{user.username}</p>
              <p style={{ margin: 0, fontSize: "0.8rem", color: "#555" }}>
                {user.email}
              </p>
            </Link>
          </li>
        ))
      ) : (
        <li style={{ color: "#777", fontSize: "0.9rem" }}>
          Không tìm thấy người dùng nào.
        </li>
      )}
    </ul>
  );
}
