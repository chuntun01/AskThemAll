"use client";

import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import Chip from "@mui/material/Chip";

// Định nghĩa lại interface AIModel ở đây để component độc lập
interface AIModel {
  _id: string;
  modelId: string;
  displayName: string;
}

// Định nghĩa props cho component
interface ModelSelectorProps {
  availableModels: AIModel[];
  selectedModels: AIModel[];
  setSelectedModels: React.Dispatch<React.SetStateAction<AIModel[]>>;
}

const ComboBoxWrapper = styled("div")`
  /* Sửa ở đây: Tăng chiều rộng để có không gian */
  position: fixed;
  
  
   box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
  z-index: 1000; // Đảm bảo nó luôn nổi lên trên
  width: 90%; // Chiếm 90% chiều rộng màn hình
  width: 100%;
  max-width: 800px; /* Đặt chiều rộng tối đa */

  .MuiAutocomplete-root {
    font-size: 0.85rem;
  }
  .MuiOutlinedInput-root {
    /* Thêm flex-wrap để đảm bảo các tag xuống dòng khi cần */
    flex-wrap: wrap;
    background: #79A3B1;
    color: #F5EFE7;
    min-height: 32px;
    font-size: 0.85rem;
    border-radius: 6px;
    padding: 6px; /* Tăng padding để chứa tag  */
  }
`;

export default function ModelSelector({
  availableModels = [],
  selectedModels = [],
  setSelectedModels,
}: ModelSelectorProps) {
  // Đảm bảo luôn là mảng
  const safeAvailableModels = Array.isArray(availableModels)
    ? availableModels
    : [];
  const safeSelectedModels = Array.isArray(selectedModels)
    ? selectedModels
    : [];

  return (
    <ComboBoxWrapper>
      <Autocomplete
        multiple
        options={safeAvailableModels}
        getOptionLabel={(option) => option.displayName}
        isOptionEqualToValue={(option, value) => option._id === value._id}
        value={safeSelectedModels}
        onChange={(event, newValue) => {
          if (newValue.length <= 5) setSelectedModels(newValue);
        }}
        size="small"
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            // Tách `key` ra khỏi các props còn lại
            const { key, ...tagProps } = getTagProps({ index });
            // Áp dụng key trực tiếp và spread phần còn lại
            return <Chip key={key} label={option.displayName} {...tagProps} />;
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="AI Model"
            placeholder="Tìm kiếm model..."
            size="small"
            InputLabelProps={{
              style: { color: "#000000" },
            }}
          />
        )}
      />
    </ComboBoxWrapper>
  );
}


