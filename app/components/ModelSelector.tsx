"use client";

import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import type { AIModel } from "@/types/AIModel";

interface ModelSelectorProps {
  availableModels: AIModel[];
  selectedModels: AIModel[];
  setSelectedModels: React.Dispatch<React.SetStateAction<AIModel[]>>;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  availableModels = [],
  selectedModels = [],
  setSelectedModels,
}) => {
  const safeAvailable = Array.isArray(availableModels) ? availableModels : [];
  const safeSelected = Array.isArray(selectedModels) ? selectedModels : [];

  // --- THÊM LOGIC LỌC Ở ĐÂY ---
  // Giả sử model có trường 'isFree' là true/false. 
  // Nếu logic của bạn khác (ví dụ: price === 0), hãy sửa lại điều kiện trong .filter()
  const freeModels = safeAvailable.filter((model) => model.isFree === true);

  return (
    <Autocomplete
      multiple
      // Thay vì truyền safeAvailable, ta truyền danh sách đã lọc (freeModels)
      options={freeModels}
      value={safeSelected}
      getOptionLabel={(option) => option.displayName}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      disableCloseOnSelect
      onChange={(_, newValue) => {
        if (newValue.length <= 5) setSelectedModels(newValue);
      }}
      // Ẩn chip trong ô input – model sẽ show bên panel phải
      renderTags={() => null}
      size="small"
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={
            safeSelected.length
              ? `${safeSelected.length} model được chọn`
              : "Chọn model..."
          }
        />
      )}
      sx={{
        minWidth: 220,
        "& .MuiOutlinedInput-root": {
          borderRadius: 9999,
          backgroundColor: "rgba(255,255,255,0.95)",
          fontSize: 13,
          height: 36,
          paddingInline: 1,
        },
      }}
    />
  );
};

export default ModelSelector;