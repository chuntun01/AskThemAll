// components/AnswerHistory.tsx
"use client";
import React, { useState, useEffect } from "react";
// Import các component con như Backdrop, ModalCard nếu bạn tách chúng ra file riêng

// (Bạn có thể giữ các định nghĩa component Backdrop, ModalCard, và hàm formatTime ở đây
// hoặc chuyển chúng ra một file utils riêng để tái sử dụng)

interface HistoryItem {
  id: string;
  name: string;
  href: string;
  updatedAt?: number;
}
// ... Các interface và component con khác ...

export default function AnswerHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  // ... các state khác như loadingHistory, histErr, openMenuId, etc. ...

  useEffect(() => {
    // Logic fetch '/api/chat-history' của bạn
  }, []);

  // ... Tất cả các hàm handlers (handleOpenChat, handleNewChat, etc.) của bạn ...

  return (
    <>
      {/* Phần JSX hiển thị danh sách lịch sử của bạn */}
      {/* ...loadingHistory, histErr, history.map(...) */}
      {/* Phần JSX cho các Modals (confirmDel, renameItem) */}
    </>
  );
}
