"use client";

import React from "react";

// Cập nhật interface để nhận prop historyItems
interface NavbarMenuProps {
  isMenuOpen: boolean;
  onMenuClick: () => void;
  onClose: () => void;
  historyItems: Array<{ name: string; href: string }>;
}

const NavbarMenu: React.FC<NavbarMenuProps> = ({
  isMenuOpen,
  onMenuClick,
  onClose,
  historyItems, // Lấy prop historyItems từ đây
}) => {
  return (
    <nav className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white shadow-md relative">
      {/* Navbar header */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* Menu open button on the left */}
        <button
          onClick={onMenuClick}
          className="p-2 rounded hover:bg-blue-300 z-50"
        >
          ☰
        </button>

        {/* Title in the center */}
        <h1 className="text-lg font-bold absolute left-1/2 transform -translate-x-1/2">
          Ask Them All
        </h1>
      </div>

      {/* Dropdown menu (appears when open) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-500 to-cyan-500 p-4 transform transition-transform duration-300 ease-in-out z-40 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end mb-4">
          {/* Close menu button */}
          <button
            onClick={onClose}
            className="p-2 bg-red-500 rounded hover:bg-red-400"
          >
            Đóng
          </button>
        </div>
        
        {/* Hiển thị danh sách lịch sử ngay lập tức */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Lịch sử</h2>
          <ul className="space-y-4 text-xl">
            {/* Lặp qua mảng historyItems được truyền vào */}
            {historyItems.map((item, index) => (
              <li key={index}>
                <a href={item.href} className="block hover:underline">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarMenu;