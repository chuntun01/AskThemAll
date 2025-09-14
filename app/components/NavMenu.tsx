/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useChatStore } from "@/lib/store/chat";
import { Users } from "lucide-react";

interface NavbarMenuProps {
  isMenuOpen: boolean;
  onMenuClick: () => void;
  onClose: () => void;
  historyItems: Array<{ name: string; href: string }>;
}

type HistoryItem = {
  id: string;
  name: string;
  href: string;
  updatedAt?: number;
};
type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  modelId?: string;
};

const formatTime = (ms?: number) => {
  if (!ms) return "";
  const d = new Date(ms);
  const now = new Date();
  const sameDay =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();
  return sameDay
    ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : d.toLocaleDateString();
};

function Backdrop({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/40 z-[999]"
      onClick={onClose}
      aria-hidden="true"
    />
  );
}

function ModalCard({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1000] grid place-items-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-black/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-black/10">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="px-5 py-4">{children}</div>
        <div className="h-3" />
      </div>
    </div>
  );
}

const NavbarMenu: React.FC<NavbarMenuProps> = ({
  isMenuOpen,
  onMenuClick,
  onClose,
  historyItems: _ignored,
}) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [roleError, setRoleError] = useState<string | null>(null);
  const { isLoaded, isSignedIn, user } = useUser();
  const [fetchTrigger, setFetchTrigger] = useState(0);

  // SỬA: Fetch role trực tiếp từ DB (đơn giản, không cần metadata)
  useEffect(() => {
    console.log(
      "NavMenu: isLoaded=",
      isLoaded,
      "isSignedIn=",
      isSignedIn,
      "userId=",
      user?.id
    );
    if (isLoaded && isSignedIn) {
      const fetchRole = async () => {
        try {
          setRoleError(null);
          const res = await fetch("/api/user-role", {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          });
          console.log("NavMenu: Fetch status:", res.status);
          if (res.status >= 400) {
            throw new Error(`HTTP ${res.status}`);
          }
          const data = await res.json();
          console.log("NavMenu: DB response:", data);
          setUserRole(data.role || "member");
        } catch (error: unknown) {
          console.error("NavMenu: Error:", error);
          const message =
            error instanceof Error
              ? error.message
              : typeof error === "string"
              ? error
              : "Unknown error";
          setRoleError(message);
          setUserRole("member");
        }
      };
      fetchRole();
    } else if (isLoaded && !isSignedIn) {
      setUserRole(null);
    }
  }, [isLoaded, isSignedIn, fetchTrigger]);

  const isAdmin = userRole === "admin";
  console.log("NavMenu: userRole=", userRole, "isAdmin=", isAdmin);

  const router = useRouter();
  const handleRefetch = () => setFetchTrigger((prev) => prev + 1);

  const pathname = usePathname();
  const onStatistics = pathname?.startsWith("/statistics");
  const onUsers = pathname?.startsWith("/users");

  const { setMessages, setCurrentThreadId, clearMessages } = useChatStore();

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [histErr, setHistErr] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const [confirmDel, setConfirmDel] = useState<HistoryItem | null>(null);
  const [renameItem, setRenameItem] = useState<HistoryItem | null>(null);
  const [renameText, setRenameText] = useState("");

  // THEME + SCROLLBAR
  const ThemeAndScrollbar = () => (
    <style jsx global>{`
      :root {
        --bg: #cfe7ed;
        --panel: #b9d9e2;
        --nav-bg: #b9d9e2;
        --fg: #0b1720;
        --muted: #4b5a63;
        --accent: #456268;
      }
      .history-list {
        scrollbar-width: thin;
        scrollbar-color: transparent transparent;
        scrollbar-gutter: stable both-edges;
      }
      .history-list:hover {
        scrollbar-color: rgba(0, 0, 0, 0.28) transparent;
      }
      .history-list::-webkit-scrollbar {
        width: 6px;
      }
      .history-list::-webkit-scrollbar-track {
        background: transparent;
      }
      .history-list::-webkit-scrollbar-thumb {
        background: transparent;
        border-radius: 9999px;
        border: 2px solid transparent;
        background-clip: padding-box;
      }
      .history-list:hover::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.28);
      }
      .history-list:hover::-webkit-scrollbar-thumb:active {
        background: rgba(0, 0, 0, 0.38);
      }
    `}</style>
  );

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isMenuOpen) onClose();
        setOpenMenuId(null);
        setConfirmDel(null);
        setRenameItem(null);
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [isMenuOpen, onClose]);

  useEffect(() => {
    if (!isMenuOpen) return;
    let cancelled = false;
    (async () => {
      setLoadingHistory(true);
      setHistErr(null);
      try {
        const res = await fetch("/api/chat-history", { cache: "no-store" });
        if (!res.ok) throw new Error(await res.text());
        const data: HistoryItem[] = await res.json();
        if (!cancelled) setHistory(data);
      } catch (e: unknown) {
        if (!cancelled)
          setHistErr(e instanceof Error ? e.message : "Không tải được lịch sử");
      } finally {
        if (!cancelled) setLoadingHistory(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isMenuOpen]);

  const handleOpenChat = async (threadId: string) => {
    try {
      const res = await fetch(`/api/chat-history/${threadId}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(await res.text());
      const data: { id: string; messages: ChatMessage[] } = await res.json();

      setMessages(Array.isArray(data.messages) ? data.messages : []);
      setCurrentThreadId(data.id);
      onClose();
      if (pathname !== "/") router.push("/");
    } catch (e: unknown) {
      if (e instanceof Error) {
        setHistErr(e.message);
      } else {
        setHistErr("Không mở được đoạn chat này.");
      }
    }
  };

  const handleNewChat = () => {
    clearMessages();
    onClose();
    if (pathname !== "/") router.push("/");
  };

  const openRename = (item: HistoryItem) => {
    setOpenMenuId(null);
    setRenameItem(item);
    setRenameText(item.name);
  };
  const openDelete = (item: HistoryItem) => {
    setOpenMenuId(null);
    setConfirmDel(item);
  };
  const submitRename = async () => {
    const name = renameText.trim();
    if (!renameItem || !name || name === renameItem.name) {
      setRenameItem(null);
      return;
    }
    setHistory((h) =>
      h.map((x) => (x.id === renameItem.id ? { ...x, name } : x))
    );
    setRenameItem(null);
  };
  const submitDelete = async () => {
    if (!confirmDel) return;
    setHistory((h) => h.filter((x) => x.id !== confirmDel.id));
    setConfirmDel(null);
  };

  return (
    <nav className="bg-[var(--nav-bg)] text-[var(--fg)] shadow-lg fixed top-0 left-0 right-0 z-[100] h-16">
      <ThemeAndScrollbar />

      {roleError && (
        <div className="fixed top-4 right-4 bg-red-100 p-2 rounded text-sm z-[101]">
          {roleError}
          <button
            onClick={handleRefetch}
            className="ml-2 text-blue-600 underline"
          >
            Thử lại
          </button>
        </div>
      )}

      <div className="flex items-center justify-between px-4 h-full max-w-8xl mx-auto">
        {/* Left */}
        <div className="flex items-center gap-2 w-60">
          <button
            onClick={onMenuClick}
            className={`p-2 rounded-md text-xl transition-colors duration-150 ${
              isMenuOpen ? "opacity-0 pointer-events-none" : "hover:bg-white/30"
            }`}
            aria-label="Mở menu"
            aria-expanded={isMenuOpen}
            aria-controls="side-menu"
          >
            ☰
          </button>

          {(onStatistics || onUsers) && (
            <Link
              href="/"
              className="px-3 py-2 rounded-md bg-white/30 hover:bg-white/50 transition text-sm md:text-base"
              aria-label="Về trang chủ"
            >
              ← Trang chủ
            </Link>
          )}
        </div>

        {/* Title */}
        <h1 className="text-lg font-bold whitespace-nowrap">Ask Them All</h1>

        {/* Right: auth */}
        <div className="flex justify-end w-60">
          <div className="flex items-center gap-2">
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[var(--accent)] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer hover:brightness-110 transition">
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
          "fixed inset-0 z-[90] transition-opacity ease-out duration-200",
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
          "fixed top-0 left-0 z-[95] h-full w-80 max-w-[92vw]",
          "bg-[var(--panel)] p-4 shadow-xl",
          "transition-transform duration-300 ease-out",
          isMenuOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex justify-end mb-4 mt-16">
          <button
            onClick={onClose}
            className="p-2 bg-[var(--accent)] text-white rounded hover:brightness-110 transition-colors duration-300"
          >
            Đóng
          </button>
        </div>

        {/* Actions */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">
            Chức năng
            <span style={{ color: "#0070f3", fontSize: "1rem" }}>
              ({userRole || "loading..."})
            </span>
          </h2>
          <ul className="space-y-4 text-xl">
            {isAdmin && (
              <>
                <li>
                  <Link
                    href="/statistics"
                    onClick={onClose}
                    className="block no-underline hover:underline transition focus:outline-none focus:ring-2 focus:ring-black/10 rounded-sm"
                  >
                    Thống kê
                  </Link>
                </li>
                <li>
                  <Link
                    href="/users"
                    onClick={onClose}
                    className="block no-underline font-bold text-black hover:underline transition"
                  >
                    Quản lý người dùng
                  </Link>
                </li>
              </>
            )}

            <li>
              <button
                onClick={handleNewChat}
                className="w-full text-left block hover:underline underline-offset-4 transition"
              >
                Đoạn chat mới
              </button>
            </li>
          </ul>
        </div>

        {/* History */}
        <div>
          <h2 className="text-2xl font-bold mb-2">
            {isAdmin ? "Lịch sử hệ thống" : "Lịch sử chat của bạn"}
          </h2>
          {loadingHistory ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-14 rounded-2xl bg-white/30 backdrop-blur-sm"
                />
              ))}
            </div>
          ) : histErr ? (
            <div className="text-sm text-red-700">
              bạn chưa đăng nhập!<p>{histErr}</p>
            </div>
          ) : history.length === 0 ? (
            <div className="text-sm text-[var(--muted)]">Chưa có lịch sử</div>
          ) : (
            <ul className="history-list space-y-2 max-h-[56vh] overflow-y-auto pr-1">
              {history.map((item) => (
                <li key={item.id}>
                  <div className="relative group">
                    <button
                      onClick={() => handleOpenChat(item.id)}
                      className="
                        w-full text-left h-14
                        rounded-2xl px-4 pr-12
                        flex flex-col justify-center transition
                        bg-transparent border border-transparent shadow-none

                        group-hover:bg-white/30
                        group-hover:backdrop-blur-md
                        group-hover:border-white/20
                        group-hover:shadow-md
                        group-hover:ring-1 group-hover:ring-white/20

                        focus-visible:bg-white/30
                        focus-visible:backdrop-blur-md
                        focus-visible:border-white/30
                        focus-visible:shadow-lg
                        focus-visible:ring-1 focus-visible:ring-white/30
                      "
                    >
                      <p className="text-sm font-medium text-[var(--fg)] truncate">
                        {item.name}
                      </p>
                      <span className="text-xs text-[var(--muted)]">
                        {formatTime(item.updatedAt)}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId((cur) =>
                          cur === item.id ? null : item.id
                        );
                      }}
                      className="
                        absolute right-2 top-1/2 -translate-y-1/2
                        h-8 w-8 flex items-center justify-center
                        rounded-full text-[var(--fg)]/80 transition
                        opacity-0 pointer-events-none

                        group-hover:opacity-100 group-hover:pointer-events-auto
                        focus-visible:opacity-100 focus-visible:pointer-events-auto
                        hover:bg-white/40 hover:backdrop-blur-md
                        border border-transparent hover:border-white/30
                      "
                      aria-haspopup="menu"
                      aria-expanded={openMenuId === item.id}
                      aria-label="Mở menu"
                    >
                      ⋯
                    </button>

                    {openMenuId === item.id && (
                      <div
                        role="menu"
                        className="
                          absolute right-2 top-[calc(50%+20px)]
                          z-[99] w-44 rounded-xl
                          border border-white/30 bg-white/80 backdrop-blur-md
                          shadow-lg overflow-hidden
                        "
                      >
                        <button
                          className="w-full text-left text-sm px-3 py-2 hover:bg-white/60"
                          onClick={() => openRename(item)}
                        >
                          Đổi tên
                        </button>
                        <button
                          className="w-full text-left text-sm px-3 py-2 hover:bg-white/60 text-red-600"
                          onClick={() => openDelete(item)}
                        >
                          Xoá
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>

      {/* Modals */}
      {confirmDel && (
        <>
          <Backdrop onClose={() => setConfirmDel(null)} />
          <ModalCard title="Xoá đoạn chat?" onClose={() => setConfirmDel(null)}>
            <p className="text-sm text-gray-700">
              Hành động này sẽ xoá <b>{confirmDel.name}</b>.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 h-10 rounded-lg border border-black/10 bg-white hover:bg-black/5"
                onClick={() => setConfirmDel(null)}
              >
                Hủy bỏ
              </button>
              <button
                className="px-4 h-10 rounded-lg bg-red-600 text-white hover:bg-red-700"
                onClick={submitDelete}
              >
                Xoá
              </button>
            </div>
          </ModalCard>
        </>
      )}

      {renameItem && (
        <>
          <Backdrop onClose={() => setRenameItem(null)} />
          <ModalCard
            title="Đổi tên đoạn chat"
            onClose={() => setRenameItem(null)}
          >
            <label className="block text-sm text-gray-700 mb-2">Tên mới</label>
            <input
              className="w-full h-10 px-3 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/20"
              value={renameText}
              autoFocus
              onChange={(e) => setRenameText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitRename();
              }}
              placeholder="Nhập tên"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 h-10 rounded-lg border border-black/10 bg-white hover:bg-black/5"
                onClick={() => setRenameItem(null)}
              >
                Hủy
              </button>
              <button
                className="px-4 h-10 rounded-lg bg-[var(--accent)] text-white hover:brightness-110"
                onClick={submitRename}
              >
                Lưu
              </button>
            </div>
          </ModalCard>
        </>
      )}
    </nav>
  );
};

export default NavbarMenu;
