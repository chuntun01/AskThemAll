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
  isFree?: boolean; // 👈 thêm thuộc tính này
}

// Định nghĩa props cho component
interface ModelSelectorProps {
  availableModels: AIModel[];
  selectedModels: AIModel[];
  setSelectedModels: React.Dispatch<React.SetStateAction<AIModel[]>>;
}

const ComboBoxWrapper = styled("div")`
  position: fixed;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 100%;
  max-width: 800px;

  .MuiAutocomplete-root {
    font-size: 0.85rem;
  }
  .MuiOutlinedInput-root {
    flex-wrap: wrap;
    background: #79a3b1;
    color: #f5efe7;
    min-height: 32px;
    font-size: 0.85rem;
    border-radius: 6px;
    padding: 6px;
  }
`;

export default function ModelSelector({
  availableModels = [],
  selectedModels = [],
  setSelectedModels,
}: ModelSelectorProps) {
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
        getOptionLabel={(option) =>
          option.isFree === false
            ? `${option.displayName} (không khả dụng)`
            : option.displayName
        }
        isOptionEqualToValue={(option, value) => option._id === value._id}
        value={safeSelectedModels}
        onChange={(event, newValue) => {
          if (newValue.length <= 5) setSelectedModels(newValue);
        }}
        size="small"
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            const { key, ...tagProps } = getTagProps({ index });
            return (
              <Chip
                key={key}
                label={
                  option.isFree === false
                    ? `${option.displayName} (không khả dụng)`
                    : option.displayName
                }
                {...tagProps}
              />
            );
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
