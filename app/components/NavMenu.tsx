"use client";

import React, { useEffect } from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

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
  // Khóa cuộn body khi menu mở
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

  return (
    <nav className="bg-[#79A3B1] text-white shadow-lg fixed top-0 left-0 right-0 z-20 h-16">
      {/* Navbar header */}
      <div className="flex items-center justify-between px-4 h-full max-w-8xl mx-auto">
        {/* Hộp bên trái (chứa nút menu) */}
        <div className="flex justify-start w-60">
          <button
            onClick={onMenuClick}
            className={`p-2 rounded-md text-xl ${
              isMenuOpen ? "invisible" : "hover:bg-[#D0E8F2]"
            }`}
            aria-label="Mở menu"
          >
            ☰
          </button>
        </div>

        {/* Tiêu đề ở giữa */}
        <h1 className="text-lg font-bold whitespace-nowrap">Ask Them All</h1>

        {/* Hộp bên phải (Clerk buttons) */}
        <div className="flex justify-end w-60">
          <div className="flex items-center gap-2">
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#456268] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
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

      {/* Overlay mờ nền + blur (click để đóng) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Dropdown menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#5c8597] p-4 transform transition-transform duration-300 ease-in-out z-40 shadow-xl ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu điều hướng"
      >
        <div className="flex justify-end mb-4 mt-16">
          <button
            onClick={onClose}
            className="p-2 bg-[#456268] rounded hover:bg-[#D0E8F2]"
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
