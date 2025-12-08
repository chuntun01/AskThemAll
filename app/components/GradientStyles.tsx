"use client";

import React from "react";

const GradientStyles = () => {
  return (
    <style jsx>{`
      /* Không cần keyframes nữa, nhưng để đây cũng không sao nếu sau này muốn dùng lại */

      /* Nền phẳng, sáng kiểu ChatGPT */
      .gradient-bg {
        background-color: #f3f4f6; /* xám rất nhạt, gần như trắng */
      }

      /* Card chat kiểu panel trắng nhẹ */
      .glassmorphism {
        background: #ffffff;
        backdrop-filter: blur(0); /* bỏ blur luôn cho đơn giản, muốn giữ thì set 12px */
        border: 1px solid #e5e7eb;
      }

      .scroll-clip {
        overflow: hidden;
        border-radius: inherit;
      }

      /* Scrollbar khu chat */
      :global(.chat-body) {
        scrollbar-width: thin;
        scrollbar-color: rgba(148, 163, 184, 0.6) transparent;
        scrollbar-gutter: stable both-edges;
      }

      :global(.chat-body::-webkit-scrollbar) {
        width: 8px;
      }
      :global(.chat-body::-webkit-scrollbar-track) {
        background: transparent;
        border-radius: 9999px;
        margin: 12px 0;
      }
      :global(.chat-body::-webkit-scrollbar-thumb) {
        background: rgba(148, 163, 184, 0.55);
        border-radius: 9999px;
        border: 2px solid transparent;
        background-clip: padding-box;
      }
      :global(.chat-body:hover::-webkit-scrollbar-thumb) {
        background: rgba(100, 116, 139, 0.85);
      }

      /* Scrollbar textarea */
      :global(.textarea-auto) {
        scrollbar-width: thin;
      }
      :global(.textarea-auto::-webkit-scrollbar) {
        width: 6px;
      }
      :global(.textarea-auto::-webkit-scrollbar-track) {
        background: transparent;
      }
      :global(.textarea-auto::-webkit-scrollbar-thumb) {
        background: rgba(148, 163, 184, 0.7);
        border-radius: 9999px;
      }
    `}</style>
  );
};

export default GradientStyles;
