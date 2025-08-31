"use client";

import React from "react";
import { styled } from "styled-components";

// Định nghĩa props mà component sẽ nhận từ page.tsx
interface QuestionFormProps {
  question: string;
  setQuestion: (value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
  isLoading: boolean;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  setQuestion,
  onSubmit,
  isLoading,
}) => {
  return (
    // Sử dụng thẻ <form> và gắn sự kiện onSubmit
    <StyledForm onSubmit={onSubmit}>
      <div className="container">
        <input
          className="input"
          type="text"
          value={question} // Giá trị được kiểm soát bởi state từ page.tsx
          onChange={(e) => setQuestion(e.target.value)} // Cập nhật state ở page.tsx
          placeholder="Hỏi bất kỳ điều gì..."
          disabled={isLoading} // Vô hiệu hóa khi đang tải
        />
        <button className="search-btn" type="submit" disabled={isLoading}>
          {isLoading ? (
            // Hiển thị icon loading đơn giản
            <div className="loader"></div>
          ) : (
            <svg viewBox="0 0 24 24" className="search__icon">
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
              </g>
            </svg>
          )}
        </button>
      </div>
    </StyledForm>
  );
};

// Sửa lại CSS một chút để hoạt động tốt hơn với layout mới
const StyledForm = styled.form`
  position: fixed;
  bottom: 1.5rem; // Cách đáy màn hình 24px
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000; // Đảm bảo nó luôn nổi lên trên
  width: 90%; // Chiếm 90% chiều rộng màn hình
  max-width: 768px; // Nhưng không rộng quá 768px trên màn hình lớn
  width: 100%; // Chiếm toàn bộ không gian được cấp

  .container {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 5px 10px;
    border-radius: 50px;
    background: #79a3b1; // Đổi màu nền cho hợp với theme tối
    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
  }

  .input {
    flex: 1;
    padding: 12px 15px;
    border: none;
    border-radius: 50px;
    font-size: 16px;
    outline: none;
    background: transparent;
    color: #000000; // Đổi màu chữ
    &::placeholder {
      color: #7f8c9b;
    }
  }

  .search-btn {
    background: linear-gradient(140deg, #7492abff 30%, #a2d9ffff 100%);
    border: none;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s;
    flex-shrink: 0; // Đảm bảo nút không bị co lại
  }

  .search-btn:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .search-btn:not(:disabled):hover {
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(79, 172, 254, 0.5);
  }

  .search__icon {
    width: 22px;
    height: 22px;
    & path {
      fill: white;
    }
  }

  // CSS cho icon loading
  .loader {
    border: 3px solid #f3f3f3;
    border-top: 3px solid #3498db;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default QuestionForm;
