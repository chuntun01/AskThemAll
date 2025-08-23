"use client";

import React from "react";
// BƯỚC 1: Import các component cần thiết từ Clerk
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

// Interface của bạn giữ nguyên
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
  historyItems,
}) => {
  return (
    <nav className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white shadow-md fixed top-0 left-0 right-0 z-20 h-16">
      {/* Navbar header */}
      <div className="flex items-center justify-between px-4 h-full max-w-8xl mx-auto">
        {/* Hộp bên trái (chứa nút menu) */}
        <div className="flex justify-start w-60">
          {" "}
          {/* Đặt chiều rộng cố định */}
          <button
            onClick={onMenuClick}
            className={`p-2 rounded-md text-xl ${
              isMenuOpen ? "invisible" : "hover:bg-blue-400"
            }`}
          >
            ☰
          </button>
        </div>

        {/* Tiêu đề ở giữa */}
        <h1 className="text-lg font-bold whitespace-nowrap">Ask Them All</h1>

        {/* Hộp bên phải (chứa các nút Clerk) */}
        <div className="flex justify-end w-60">
          {" "}
          {/* Đặt chiều rộng BẰNG với hộp bên trái */}
          <div className="flex items-center gap-2">
            <SignedOut>
              <SignInButton />

              <SignUpButton>
                <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>

      {/* Dropdown menu (giữ nguyên) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-500 to-cyan-500 p-4 transform transition-transform duration-300 ease-in-out z-40 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end mb-4 mt-16">
          <button
            onClick={onClose}
            className="p-2 bg-red-500 rounded hover:bg-red-400"
          >
            Đóng
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Lịch sử</h2>
          <ul className="space-y-4 text-xl">
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
