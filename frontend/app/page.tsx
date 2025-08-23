"use client";

import { useState } from "react";
import ResponseComponent from "./component/AnswerCard";
import Input from "./component/QuestionForm";
import NavbarMenu from "./component/NavMenu";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Dữ liệu lịch sử giả lập
  const mockHistoryData = [
    { name: "Sản phẩm A", href: "/san-pham-a" },
    { name: "Tin tức mới nhất", href: "/tin-tuc" },
    { name: "Hướng dẫn sử dụng", href: "/huong-dan" },
    { name: "Bài viết về công nghệ", href: "/bai-viet-cong-nghe" },
  ];

  return (
    // Thêm màu nền để dễ nhìn hơn
    <main className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <NavbarMenu
        isMenuOpen={isMenuOpen}
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        onClose={() => setIsMenuOpen(false)}
        historyItems={mockHistoryData}
      />

      {/* Lớp phủ để đóng menu khi click ra ngoài */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 z-30"
        ></div>
      )}

      {/* Nội dung chính */}
      <div
        className={`flex-1 mx-auto w-full max-w-7xl flex flex-col gap-8 p-4 pt-20 md:p-8 md:pt-24 transition-all duration-300 ease-in-out `}
      >
        <ResponseComponent responses={[]} />
        <Input />
      </div>
    </main>
  );
}
