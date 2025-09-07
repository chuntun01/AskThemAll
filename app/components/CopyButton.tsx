"use client";

import { useState } from "react";

interface CopyButtonProps {
  text: string;
  className?: string;
  label?: string; // text hiển thị trong tooltip/title
}

export default function CopyButton({ text, className = "", label = "Sao chép" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // noop
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      title={copied ? "Đã sao chép!" : label}
      aria-label={label}
      className={
        "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs " +
        "bg-white/70 hover:bg-white active:scale-[.98] transition shadow " +
        "border border-black/10 " +
        className
      }
    >
      {/* icon copy */}
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z"
          fill="currentColor"
        />
      </svg>
      {copied ? "Đã copy" : "Copy"}
    </button>
  );
}
