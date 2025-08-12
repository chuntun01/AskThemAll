"use client";

import { useState } from "react";
import ResponseComponent from "./component/AnswerCard";
import Input from "./component/QuestionForm";
import NavbarMenu from "./component/NavMenu";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Dữ liệu lịch sử giả lập để truyền vào NavbarMenu
  const mockHistoryData = [
    { name: "Sản phẩm A", href: "/san-pham-a" },
    { name: "Tin tức mới nhất", href: "/tin-tuc" },
    { name: "Hướng dẫn sử dụng", href: "/huong-dan" },
    { name: "Bài viết về công nghệ", href: "/bai-viet-cong-nghe" },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      {/* Navbar + Menu */}
      <NavbarMenu
        isMenuOpen={isMenuOpen}
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        onClose={() => setIsMenuOpen(false)}
        // THAY ĐỔI: Truyền prop historyItems vào đây
        historyItems={mockHistoryData}
      />

      {/* Nội dung chính — tránh bị đè bởi menu */}
      <div className="flex-1 mx-auto w-full max-w-4xl flex flex-col gap-8 p-4 pt-8 md:p-8 mt-4">
        <ResponseComponent responses={[]} />
        <Input />
      </div>
    </main>
  );
}