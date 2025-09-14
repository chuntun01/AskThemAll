"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import NavbarMenu from "../components/NavMenu"; // SỬA: Thêm import

interface UserProfile {
  _id: string;
  clerkId: string;
  username: string;
  email: string;
  role: "member" | "admin";
  avatarUrl: string;
  createdAt: string;
}

interface HistoryItem {
  // Giả định type cho historyItems (thay bằng type thực tế của bạn)
  id: string;
  title: string;
  timestamp: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // SỬA: Thêm state cho menu
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]); // SỬA: Thêm state cho history

  const { isLoaded, isSignedIn, user } = useUser(); // Lấy user để check role

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      async function fetchUsers() {
        try {
          const response = await fetch("/api/users");
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData.error || "Không thể tải danh sách người dùng."
            );
          }
          const data = await response.json();
          setUsers(data.users || []);
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("Đã xảy ra lỗi không xác định.");
          }
        } finally {
          setIsLoading(false);
        }
      }
      fetchUsers();
    } else if (isLoaded && !isSignedIn) {
      setIsLoading(false);
      setUsers([]);
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded || isLoading) {
    return <div style={{ padding: "2rem" }}>Đang tải...</div>;
  }

  if (error) {
    return <div style={{ padding: "2rem", color: "red" }}>Lỗi: {error}</div>;
  }

  if (!isSignedIn) {
    return (
      <div style={{ padding: "2rem" }}>
        Vui lòng đăng nhập để xem thông tin.
      </div>
    );
  }

  // SỬA: Dùng role từ user hiện tại (từ DB hoặc Clerk metadata)
  const isAdmin =
    user?.publicMetadata?.role === "admin" ||
    (users[0]?.role === "admin" && users.length > 0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const displayRole = isAdmin ? "admin" : "member";

  return (
    <>
      <NavbarMenu
        isMenuOpen={isMenuOpen}
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        onClose={() => setIsMenuOpen(false)}
        historyItems={[]}
      />
      <div
        style={{
          fontFamily: "sans-serif",
          maxWidth: "800px",
          margin: "2rem auto",
          padding: "0 1rem",
        }}
      >
        <h1 style={{ marginTop: "200" }}>
          {isAdmin ? "Quản lý người dùng (Admin)" : "Thông tin cá nhân"}
        </h1>

        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {users.map((user) => (
            <div
              key={user.clerkId}
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "1rem",
                background: "#fff",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <img
                  src={user.avatarUrl || "/default-avatar.png"}
                  alt={user.username}
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
                <div>
                  <p
                    style={{
                      color: "#000000",
                      margin: 0,
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    }}
                  >
                    {user.username}
                  </p>
                  <p style={{ margin: 0, color: "#000000" }}>{user.email}</p>
                  <p style={{ margin: 0, fontSize: "0.9rem" }}>
                    <strong style={{ color: "#000000" }}>Role:</strong>{" "}
                    <span style={{ color: "#000000" }}>{user.role}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
