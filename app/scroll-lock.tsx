"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollLock() {
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const isHome = pathname === "/";
    html.style.overflow = isHome ? "hidden" : "visible";
    body.style.overflow = isHome ? "hidden" : "visible";
    body.style.height = isHome ? "100dvh" : "auto";

    return () => {
      html.style.overflow = "visible";
      body.style.overflow = "visible";
      body.style.height = "auto";
    };
  }, [pathname]);

  return null;
}
