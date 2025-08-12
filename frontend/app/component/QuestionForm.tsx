"use client";

import React, { useState } from "react";
import styled from "styled-components";

const Input: React.FC = () => {
  const [text, setText] = useState("");

  const handleSearch = () => {
    alert("Bạn đã tìm: " + text);
  };

  return (
    <StyledWrapper>
      <div className="container">
        <input
          className="input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Hỏi bất kỳ điều gì..."
        />
        <button className="search-btn" onClick={handleSearch}>
          <svg viewBox="0 0 24 24" className="search__icon">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
            </g>
          </svg>
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    position: fixed;
    bottom: 20px; /* cách đáy 20px */
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    width: 80%;
    max-width: 600px;
    padding: 5px 10px;
    border-radius: 50px;
    background: white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    z-index: 1000; /* đảm bảo nổi lên trên */
  }

  .input {
    flex: 1;
    padding: 12px 15px;
    border: none;
    border-radius: 50px;
    font-size: 16px;
    outline: none;
    background: transparent;
  }

  .search-btn {
    background: linear-gradient(135deg, #7492abff 0%, #a2d9dcff 100%);
    border: none;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s;
  }

  .search-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(79, 172, 254, 0.5);
  }

  .search__icon {
    width: 22px;
    height: 22px;
  }

  .search__icon path {
    fill: white;
  }
`;

export default Input;
