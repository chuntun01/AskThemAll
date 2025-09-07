"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const onStatistics = pathname?.startsWith("/statistics");

  // ESC để đóng
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [isMenuOpen, onClose]);

  return (
    <nav className="bg-[#BBDCE5] text-white shadow-lg fixed top-0 left-0 right-0 z-[100] h-16">
      <div className="flex items-center justify-between px-4 h-full max-w-8xl mx-auto">
        {/* Trái */}
        <div className="flex items-center gap-2 w-60">
          {/* Nút Menu luôn hiển thị */}
          <button
            onClick={onMenuClick}
            className={`p-2 rounded-md text-xl transition-colors duration-150 ${
              isMenuOpen ? "opacity-0 pointer-events-none" : "hover:bg-[#D0E8F2]"
            }`}
            aria-label="Mở menu"
            aria-expanded={isMenuOpen}
            aria-controls="side-menu"
          >
            ☰
          </button>

          {/* Nút về Trang chủ khi ở /statistics */}
          {onStatistics && (
            <Link
              href="/"
              className="px-3 py-2 rounded-md bg-white/20 hover:bg-white/40 transition text-sm md:text-base"
              aria-label="Về trang chủ"
            >
              ← Trang chủ
            </Link>
          )}
        </div>

        {/* Tiêu đề */}
        <h1 className="text-lg font-bold whitespace-nowrap">Ask Them All</h1>

        {/* Phải: auth */}
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

      {/* Overlay */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={[
          "fixed inset-0 z-[90] transition-opacity duration-200 ease-out",
          isMenuOpen
            ? "opacity-100 pointer-events-auto bg-black/40"
            : "opacity-0 pointer-events-none bg-black/40",
        ].join(" ")}
      />

      {/* Side menu */}
      <aside
        id="side-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu điều hướng"
        className={[
          "fixed top-0 left-0 z-[95] h-full w-72 max-w-[90vw] bg-[#BBDCE5] p-4 shadow-xl",
          "transform-gpu [will-change:transform] transition-transform duration-400 ease-out",
          isMenuOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex justify-end mb-4 mt-16">
          <button
            onClick={onClose}
            className="p-2 bg-[#456268] rounded hover:bg-[#D0E8F2] transition-colors duration-700"
          >
            Đóng
          </button>
        </div>

        {/* Chức năng: chỉ ở trong menu */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Chức năng</h2>
          <ul className="space-y-4 text-xl">
            <li>
              <a
                href="/statistics"
                onClick={onClose}
                className="block hover:underline focus:outline-none focus:ring-2 focus:ring-white/10 rounded-sm transition"
              >
                Thống kê
              </a>
            </li>
            {onStatistics && (
              <li>
                <a
                  href="/"
                  onClick={onClose}
                  className="block hover:underline focus:outline-none focus:ring-2 focus:ring-white/10 rounded-sm transition"
                >
                  ← Trang chủ
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* Lịch sử */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Lịch sử</h2>
          <ul className="space-y-4 text-xl">
            {historyItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  onClick={onClose}
                  className="block hover:underline focus:outline-none focus:ring-2 focus:ring-white/10 rounded-sm transition"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </nav>
  );
};

export default NavbarMenu;
