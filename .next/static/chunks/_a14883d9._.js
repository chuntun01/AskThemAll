(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/app/components/AnswerDisplay.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>AnswerDisplay
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function AnswerDisplay(param) {
    let { isLoading, messages = [], selectedModels = [], error, availableModels = [] } = param;
    _s();
    const [copiedId, setCopiedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleCopy = async (id, text)=>{
        try {
            await navigator.clipboard.writeText(text);
            setCopiedId(id);
            setTimeout(()=>setCopiedId((x)=>x === id ? null : x), 1200);
        } catch (e) {
        // ignore
        }
    };
    // 👇 Hàm lấy tên hiển thị gọn gàng
    const resolveModelName = (msg)=>{
        if (msg.modelName && msg.modelName.trim()) return msg.modelName;
        if (msg.modelId) {
            const hitSel = selectedModels.find((m)=>m.modelId === msg.modelId || m._id === msg.modelId) || availableModels.find((m)=>m.modelId === msg.modelId || m._id === msg.modelId);
            if (hitSel) {
                return hitSel.displayName || hitSel.modelId.split("/").pop() || hitSel.modelId;
            }
            return msg.modelId.split("/").pop() || msg.modelId;
        }
        return "AI";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-4 w-full px-2 sm:px-4 py-4",
        children: [
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-red-50 text-red-700 border border-red-200 rounded-md px-4 py-3",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/app/components/AnswerDisplay.tsx",
                    lineNumber: 72,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/AnswerDisplay.tsx",
                lineNumber: 71,
                columnNumber: 9
            }, this),
            messages.map((msg)=>{
                const isUser = msg.role === "user";
                const modelName = !isUser ? resolveModelName(msg) : undefined;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full flex ".concat(isUser ? "justify-end" : "justify-start"),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: [
                            "relative group",
                            "w-fit max-w-[98%] sm:max-w-[96%] lg:max-w-[98%]",
                            "px-4 py-3 rounded-2xl shadow-md",
                            isUser ? "bg-[#DCF8C6] text-gray-900 rounded-tr-sm ml-auto" : "bg-white text-gray-900 border rounded-tl-sm mr-auto"
                        ].join(" "),
                        children: [
                            !isUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-500 mb-1",
                                children: modelName || "AI"
                            }, void 0, false, {
                                fileName: "[project]/app/components/AnswerDisplay.tsx",
                                lineNumber: 99,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "whitespace-pre-wrap break-words",
                                children: msg.content
                            }, void 0, false, {
                                fileName: "[project]/app/components/AnswerDisplay.tsx",
                                lineNumber: 102,
                                columnNumber: 15
                            }, this),
                            !isUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>handleCopy(msg.id, msg.content),
                                        title: copiedId === msg.id ? "Đã copy" : "Sao chép",
                                        "aria-label": "Sao chép",
                                        className: "   absolute top-2 right-2   p-1 rounded-md   bg-white/70 hover:bg-white shadow border border-black/10   text-gray-600 hover:text-gray-900   opacity-0 group-hover:opacity-100 focus:opacity-100   transition   ",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                            size: 16,
                                            strokeWidth: 2
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/AnswerDisplay.tsx",
                                            lineNumber: 121,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/AnswerDisplay.tsx",
                                        lineNumber: 107,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "\n                      pointer-events-none absolute -top-7 right-2\n                      text-xs px-2 py-1 rounded-md bg-black/75 text-white shadow transition\n                      ".concat(copiedId === msg.id ? "opacity-100" : "opacity-0", "\n                    "),
                                        children: "Đã copy"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/AnswerDisplay.tsx",
                                        lineNumber: 124,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/AnswerDisplay.tsx",
                        lineNumber: 88,
                        columnNumber: 13
                    }, this)
                }, msg.id, false, {
                    fileName: "[project]/app/components/AnswerDisplay.tsx",
                    lineNumber: 84,
                    columnNumber: 11
                }, this);
            }),
            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full flex justify-start",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-fit max-w-[98%] bg-gray-100 border rounded-2xl px-4 py-3 shadow-sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-gray-900 font-medium flex items-center gap-2",
                        children: [
                            "Đang xử lý",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-2 h-2 bg-gray-900 rounded-full animate-bounce [animation-delay:-0.3s]"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/AnswerDisplay.tsx",
                                        lineNumber: 147,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-2 h-2 bg-gray-900 rounded-full animate-bounce [animation-delay:-0.15s]"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/AnswerDisplay.tsx",
                                        lineNumber: 148,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-2 h-2 bg-gray-900 rounded-full animate-bounce"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/AnswerDisplay.tsx",
                                        lineNumber: 149,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/AnswerDisplay.tsx",
                                lineNumber: 146,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/AnswerDisplay.tsx",
                        lineNumber: 144,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/AnswerDisplay.tsx",
                    lineNumber: 143,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/AnswerDisplay.tsx",
                lineNumber: 142,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/AnswerDisplay.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
_s(AnswerDisplay, "CRg2u1n5hA3yKxdjOouDlqFGZY4=");
_c = AnswerDisplay;
var _c;
__turbopack_context__.k.register(_c, "AnswerDisplay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/components/ModelSelector.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>ModelSelector
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Autocomplete$2f$Autocomplete$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Autocomplete/Autocomplete.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TextField/TextField.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$styled$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__styled$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/system/esm/styled/styled.js [app-client] (ecmascript) <export default as styled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Chip/Chip.js [app-client] (ecmascript)");
"use client";
;
function _templateObject() {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_tagged_template_literal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
        "\n  /* Sửa ở đây: Tăng chiều rộng để có không gian */\n  position: fixed;\n  \n  \n   box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);\n  z-index: 1000; // Đảm bảo nó luôn nổi lên trên\n  width: 90%; // Chiếm 90% chiều rộng màn hình\n  width: 100%;\n  max-width: 800px; /* Đặt chiều rộng tối đa */\n\n  .MuiAutocomplete-root {\n    font-size: 0.85rem;\n  }\n  .MuiOutlinedInput-root {\n    /* Thêm flex-wrap để đảm bảo các tag xuống dòng khi cần */\n    flex-wrap: wrap;\n    background: #79A3B1;\n    color: #F5EFE7;\n    min-height: 32px;\n    font-size: 0.85rem;\n    border-radius: 6px;\n    padding: 6px; /* Tăng padding để chứa tag  */\n  }\n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
;
;
;
;
;
const ComboBoxWrapper = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$styled$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__styled$3e$__["styled"])("div")(_templateObject());
_c = ComboBoxWrapper;
function ModelSelector(param) {
    let { availableModels = [], selectedModels = [], setSelectedModels } = param;
    // Đảm bảo luôn là mảng
    const safeAvailableModels = Array.isArray(availableModels) ? availableModels : [];
    const safeSelectedModels = Array.isArray(selectedModels) ? selectedModels : [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ComboBoxWrapper, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Autocomplete$2f$Autocomplete$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"], {
            multiple: true,
            options: safeAvailableModels,
            getOptionLabel: (option)=>option.displayName,
            isOptionEqualToValue: (option, value)=>option._id === value._id,
            value: safeSelectedModels,
            onChange: (event, newValue)=>{
                if (newValue.length <= 5) setSelectedModels(newValue);
            },
            size: "small",
            renderTags: (value, getTagProps)=>value.map((option, index)=>{
                    // Tách `key` ra khỏi các props còn lại
                    const { key, ...tagProps } = getTagProps({
                        index
                    });
                    // Áp dụng key trực tiếp và spread phần còn lại
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        label: option.displayName,
                        ...tagProps
                    }, key, false, {
                        fileName: "[project]/app/components/ModelSelector.tsx",
                        lineNumber: 79,
                        columnNumber: 20
                    }, void 0);
                }),
            renderInput: (params)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    ...params,
                    label: "AI Model",
                    placeholder: "Tìm kiếm model...",
                    size: "small",
                    InputLabelProps: {
                        style: {
                            color: "#000000"
                        }
                    }
                }, void 0, false, {
                    fileName: "[project]/app/components/ModelSelector.tsx",
                    lineNumber: 83,
                    columnNumber: 11
                }, void 0)
        }, void 0, false, {
            fileName: "[project]/app/components/ModelSelector.tsx",
            lineNumber: 64,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/ModelSelector.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
_c1 = ModelSelector;
var _c, _c1;
__turbopack_context__.k.register(_c, "ComboBoxWrapper");
__turbopack_context__.k.register(_c1, "ModelSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/store/chat.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// src/lib/store/chat.ts
__turbopack_context__.s({
    "useChatStore": ()=>useChatStore
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
;
;
const useChatStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        messages: [],
        selectedModelIds: [],
        currentThreadId: null,
        // Cho phép truyền MẢNG hoặc HÀM updater(prev)=>newArray
        setMessages: (v)=>set((s)=>({
                    messages: typeof v === "function" ? v(s.messages) : v
                })),
        addMessage: (m)=>set((s)=>({
                    messages: [
                        ...s.messages,
                        m
                    ]
                })),
        // Bắt đầu chat mới => xoá msg + reset thread
        clearMessages: ()=>set({
                messages: [],
                currentThreadId: null
            }),
        setSelectedModelIds: (ids)=>set({
                selectedModelIds: Array.from(new Set(ids))
            }),
        setCurrentThreadId: (id)=>set({
                currentThreadId: id
            })
    }), {
    name: "chat-store-v1",
    partialize: (s)=>({
            messages: s.messages,
            selectedModelIds: s.selectedModelIds,
            currentThreadId: s.currentThreadId
        })
}));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/components/NavMenu.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@clerk/clerk-react/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$3664V5SS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/clerk-react/dist/chunk-3664V5SS.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2f$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store/chat.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const formatTime = (ms)=>{
    if (!ms) return "";
    const d = new Date(ms);
    const now = new Date();
    const sameDay = d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
    return sameDay ? d.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    }) : d.toLocaleDateString();
};
function Backdrop(param) {
    let { onClose } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/40 z-[999]",
        onClick: onClose,
        "aria-hidden": "true"
    }, void 0, false, {
        fileName: "[project]/app/components/NavMenu.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_c = Backdrop;
function ModalCard(param) {
    let { title, children, onClose } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "dialog",
        "aria-modal": "true",
        className: "fixed inset-0 z-[1000] grid place-items-center p-4",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-md rounded-2xl bg-white shadow-2xl border border-black/10 overflow-hidden",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-5 py-4 border-b border-black/10",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold text-gray-900",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/app/components/NavMenu.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/NavMenu.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-5 py-4",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/app/components/NavMenu.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-3"
                }, void 0, false, {
                    fileName: "[project]/app/components/NavMenu.tsx",
                    lineNumber: 67,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/NavMenu.tsx",
            lineNumber: 59,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/NavMenu.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c1 = ModalCard;
const NavbarMenu = (param)=>{
    let { isMenuOpen, onMenuClick, onClose, historyItems: _ignored } = param;
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const onStatistics = pathname === null || pathname === void 0 ? void 0 : pathname.startsWith("/statistics");
    const { setMessages, setCurrentThreadId, clearMessages } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2f$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"])();
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingHistory, setLoadingHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [histErr, setHistErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [openMenuId, setOpenMenuId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [confirmDel, setConfirmDel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [renameItem, setRenameItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [renameText, setRenameText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // THEME + SCROLLBAR (an toàn)
    const ThemeAndScrollbar = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            id: "59fdf0169e40e804",
            children: ":root{--bg:#cfe7ed;--panel:#b9d9e2;--nav-bg:#b9d9e2;--fg:#0b1720;--muted:#4b5a63;--accent:#456268}.history-list{scrollbar-width:thin;scrollbar-color:transparent transparent;scrollbar-gutter:stable both-edges}.history-list:hover{scrollbar-color:rgba(0,0,0,.28) transparent}.history-list::-webkit-scrollbar{width:6px}.history-list::-webkit-scrollbar-track{background:0 0}.history-list::-webkit-scrollbar-thumb{background:padding-box padding-box;border:2px solid transparent;border-radius:9999px}.history-list:hover::-webkit-scrollbar-thumb{background:rgba(0,0,0,.28)}.history-list:hover::-webkit-scrollbar-thumb:active{background:rgba(0,0,0,.38)}"
        }, void 0, false, void 0, ("TURBOPACK compile-time value", void 0));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NavbarMenu.useEffect": ()=>{
            const onEsc = {
                "NavbarMenu.useEffect.onEsc": (e)=>{
                    if (e.key === "Escape") {
                        if (isMenuOpen) onClose();
                        setOpenMenuId(null);
                        setConfirmDel(null);
                        setRenameItem(null);
                    }
                }
            }["NavbarMenu.useEffect.onEsc"];
            window.addEventListener("keydown", onEsc);
            return ({
                "NavbarMenu.useEffect": ()=>window.removeEventListener("keydown", onEsc)
            })["NavbarMenu.useEffect"];
        }
    }["NavbarMenu.useEffect"], [
        isMenuOpen,
        onClose
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NavbarMenu.useEffect": ()=>{
            if (!isMenuOpen) return;
            let cancelled = false;
            ({
                "NavbarMenu.useEffect": async ()=>{
                    setLoadingHistory(true);
                    setHistErr(null);
                    try {
                        const res = await fetch("/api/chat-history", {
                            cache: "no-store"
                        });
                        if (!res.ok) throw new Error(await res.text());
                        const data = await res.json();
                        if (!cancelled) setHistory(data);
                    } catch (e) {
                        var _e_message;
                        if (!cancelled) setHistErr((_e_message = e === null || e === void 0 ? void 0 : e.message) !== null && _e_message !== void 0 ? _e_message : "Không tải được lịch sử");
                    } finally{
                        if (!cancelled) setLoadingHistory(false);
                    }
                }
            })["NavbarMenu.useEffect"]();
            return ({
                "NavbarMenu.useEffect": ()=>{
                    cancelled = true;
                }
            })["NavbarMenu.useEffect"];
        }
    }["NavbarMenu.useEffect"], [
        isMenuOpen
    ]);
    const handleOpenChat = async (threadId)=>{
        try {
            const res = await fetch("/api/chat-history/".concat(threadId), {
                cache: "no-store"
            });
            if (!res.ok) throw new Error(await res.text());
            const data = await res.json();
            setMessages(Array.isArray(data.messages) ? data.messages : []);
            setCurrentThreadId(data.id);
            onClose();
            if (pathname !== "/") router.push("/");
        } catch (e) {
            var _e_message;
            setHistErr((_e_message = e === null || e === void 0 ? void 0 : e.message) !== null && _e_message !== void 0 ? _e_message : "Không mở được đoạn chat này.");
        }
    };
    const handleNewChat = ()=>{
        clearMessages();
        onClose();
        if (pathname !== "/") router.push("/");
    };
    const openRename = (item)=>{
        setOpenMenuId(null);
        setRenameItem(item);
        setRenameText(item.name);
    };
    const openDelete = (item)=>{
        setOpenMenuId(null);
        setConfirmDel(item);
    };
    const submitRename = async ()=>{
        const name = renameText.trim();
        if (!renameItem || !name || name === renameItem.name) {
            setRenameItem(null);
            return;
        }
        setHistory((h)=>h.map((x)=>x.id === renameItem.id ? {
                    ...x,
                    name
                } : x));
        setRenameItem(null);
    };
    const submitDelete = async ()=>{
        if (!confirmDel) return;
        setHistory((h)=>h.filter((x)=>x.id !== confirmDel.id));
        setConfirmDel(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "bg-[var(--nav-bg)] text-[var(--fg)] shadow-lg fixed top-0 left-0 right-0 z-[100] h-16",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeAndScrollbar, {}, void 0, false, {
                fileName: "[project]/app/components/NavMenu.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-4 h-full max-w-8xl mx-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 w-60",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onMenuClick,
                                className: "p-2 rounded-md text-xl transition-colors duration-150 ".concat(isMenuOpen ? "opacity-0 pointer-events-none" : "hover:bg-white/30"),
                                "aria-label": "Mở menu",
                                "aria-expanded": isMenuOpen,
                                "aria-controls": "side-menu",
                                children: "☰"
                            }, void 0, false, {
                                fileName: "[project]/app/components/NavMenu.tsx",
                                lineNumber: 221,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            onStatistics && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "px-3 py-2 rounded-md bg-white/30 hover:bg-white/50 transition text-sm md:text-base",
                                "aria-label": "Về trang chủ",
                                children: "← Trang chủ"
                            }, void 0, false, {
                                fileName: "[project]/app/components/NavMenu.tsx",
                                lineNumber: 234,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/NavMenu.tsx",
                        lineNumber: 220,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-lg font-bold whitespace-nowrap",
                        children: "Ask Them All"
                    }, void 0, false, {
                        fileName: "[project]/app/components/NavMenu.tsx",
                        lineNumber: 245,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end w-60",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SignedOut"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SignInButton"], {}, void 0, false, {
                                            fileName: "[project]/app/components/NavMenu.tsx",
                                            lineNumber: 251,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SignUpButton"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "bg-[var(--accent)] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer hover:brightness-110 transition",
                                                children: "Sign Up"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/NavMenu.tsx",
                                                lineNumber: 253,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/NavMenu.tsx",
                                            lineNumber: 252,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/NavMenu.tsx",
                                    lineNumber: 250,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SignedIn"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$3664V5SS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserButton"], {}, void 0, false, {
                                        fileName: "[project]/app/components/NavMenu.tsx",
                                        lineNumber: 259,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/app/components/NavMenu.tsx",
                                    lineNumber: 258,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/NavMenu.tsx",
                            lineNumber: 249,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/app/components/NavMenu.tsx",
                        lineNumber: 248,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/NavMenu.tsx",
                lineNumber: 218,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: onClose,
                "aria-hidden": "true",
                className: [
                    "fixed inset-0 z-[90] transition-opacity ease-out duration-200",
                    isMenuOpen ? "opacity-100 pointer-events-auto bg-black/40" : "opacity-0 pointer-events-none bg-black/40"
                ].join(" ")
            }, void 0, false, {
                fileName: "[project]/app/components/NavMenu.tsx",
                lineNumber: 266,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                id: "side-menu",
                role: "dialog",
                "aria-modal": "true",
                "aria-label": "Menu điều hướng",
                className: [
                    "fixed top-0 left-0 z-[95] h-full w-80 max-w-[92vw]",
                    "bg-[var(--panel)] p-4 shadow-xl",
                    "transition-transform duration-300 ease-out",
                    isMenuOpen ? "translate-x-0" : "-translate-x-full"
                ].join(" "),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end mb-4 mt-16",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "p-2 bg-[var(--accent)] text-white rounded hover:brightness-110 transition-colors duration-300",
                            children: "Đóng"
                        }, void 0, false, {
                            fileName: "[project]/app/components/NavMenu.tsx",
                            lineNumber: 291,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/app/components/NavMenu.tsx",
                        lineNumber: 290,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold mb-4",
                                children: "Chức năng"
                            }, void 0, false, {
                                fileName: "[project]/app/components/NavMenu.tsx",
                                lineNumber: 301,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-4 text-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "/statistics",
                                            onClick: onClose,
                                            className: "block no-underline hover:underline transition focus:outline-none focus:ring-2 focus:ring-black/10 rounded-sm",
                                            children: "Thống kê"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/NavMenu.tsx",
                                            lineNumber: 304,
                                            columnNumber: 14
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/NavMenu.tsx",
                                        lineNumber: 303,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleNewChat,
                                            className: "w-full text-left block hover:underline underline-offset-4 transition",
                                            children: "Đoạn chat mới"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/NavMenu.tsx",
                                            lineNumber: 316,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/NavMenu.tsx",
                                        lineNumber: 315,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/NavMenu.tsx",
                                lineNumber: 302,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/NavMenu.tsx",
                        lineNumber: 300,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold mb-2",
                                children: "Lịch Sử"
                            }, void 0, false, {
                                fileName: "[project]/app/components/NavMenu.tsx",
                                lineNumber: 328,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            loadingHistory ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: Array.from({
                                    length: 5
                                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-14 rounded-2xl bg-white/30 backdrop-blur-sm"
                                    }, i, false, {
                                        fileName: "[project]/app/components/NavMenu.tsx",
                                        lineNumber: 333,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/app/components/NavMenu.tsx",
                                lineNumber: 331,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)) : histErr ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-red-700",
                                children: histErr
                            }, void 0, false, {
                                fileName: "[project]/app/components/NavMenu.tsx",
                                lineNumber: 337,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)) : history.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-[var(--muted)]",
                                children: "Chưa có lịch sử"
                            }, void 0, false, {
                                fileName: "[project]/app/components/NavMenu.tsx",
                                lineNumber: 339,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "history-list space-y-2 max-h-[56vh] overflow-y-auto pr-1",
                                children: history.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleOpenChat(item.id),
                                                    className: "   w-full text-left h-14   rounded-2xl px-4 pr-12   flex flex-col justify-center transition   bg-transparent border border-transparent shadow-none      group-hover:bg-white/30   group-hover:backdrop-blur-md   group-hover:border-white/20   group-hover:shadow-md   group-hover:ring-1 group-hover:ring-white/20      focus-visible:bg-white/30   focus-visible:backdrop-blur-md   focus-visible:border-white/30   focus-visible:shadow-lg   focus-visible:ring-1 focus-visible:ring-white/30   ",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-medium text-[var(--fg)] truncate",
                                                            children: item.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/NavMenu.tsx",
                                                            lineNumber: 366,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-[var(--muted)]",
                                                            children: formatTime(item.updatedAt)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/NavMenu.tsx",
                                                            lineNumber: 369,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/NavMenu.tsx",
                                                    lineNumber: 345,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                        setOpenMenuId((cur)=>cur === item.id ? null : item.id);
                                                    },
                                                    className: "   absolute right-2 top-1/2 -translate-y-1/2   h-8 w-8 flex items-center justify-center   rounded-full text-[var(--fg)]/80 transition   opacity-0 pointer-events-none      group-hover:opacity-100 group-hover:pointer-events-auto   focus-visible:opacity-100 focus-visible:pointer-events-auto   hover:bg-white/40 hover:backdrop-blur-md   border border-transparent hover:border-white/30   ",
                                                    "aria-haspopup": "menu",
                                                    "aria-expanded": openMenuId === item.id,
                                                    "aria-label": "Mở menu",
                                                    children: "⋯"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/NavMenu.tsx",
                                                    lineNumber: 374,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                openMenuId === item.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    role: "menu",
                                                    className: "   absolute right-2 top-[calc(50%+20px)]   z-[99] w-44 rounded-xl   border border-white/30 bg-white/80 backdrop-blur-md   shadow-lg overflow-hidden   ",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "w-full text-left text-sm px-3 py-2 hover:bg-white/60",
                                                            onClick: ()=>openRename(item),
                                                            children: "Đổi tên"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/NavMenu.tsx",
                                                            lineNumber: 408,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "w-full text-left text-sm px-3 py-2 hover:bg-white/60 text-red-600",
                                                            onClick: ()=>openDelete(item),
                                                            children: "Xoá"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/NavMenu.tsx",
                                                            lineNumber: 414,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/NavMenu.tsx",
                                                    lineNumber: 399,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/NavMenu.tsx",
                                            lineNumber: 344,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, item.id, false, {
                                        fileName: "[project]/app/components/NavMenu.tsx",
                                        lineNumber: 343,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/app/components/NavMenu.tsx",
                                lineNumber: 341,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/NavMenu.tsx",
                        lineNumber: 327,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/NavMenu.tsx",
                lineNumber: 278,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            confirmDel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Backdrop, {
                        onClose: ()=>setConfirmDel(null)
                    }, void 0, false, {
                        fileName: "[project]/app/components/NavMenu.tsx",
                        lineNumber: 433,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModalCard, {
                        title: "Xoá đoạn chat?",
                        onClose: ()=>setConfirmDel(null),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-700",
                                children: [
                                    "Hành động này sẽ xoá ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: confirmDel.name
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/NavMenu.tsx",
                                        lineNumber: 436,
                                        columnNumber: 36
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/NavMenu.tsx",
                                lineNumber: 435,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 flex justify-end gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "px-4 h-10 rounded-lg border border-black/10 bg-white hover:bg-black/5",
                                        onClick: ()=>setConfirmDel(null),
                                        children: "Hủy bỏ"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/NavMenu.tsx",
                                        lineNumber: 439,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "px-4 h-10 rounded-lg bg-red-600 text-white hover:bg-red-700",
                                        onClick: submitDelete,
                                        children: "Xoá"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/NavMenu.tsx",
                                        lineNumber: 445,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/NavMenu.tsx",
                                lineNumber: 438,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/NavMenu.tsx",
                        lineNumber: 434,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true),
            renameItem && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Backdrop, {
                        onClose: ()=>setRenameItem(null)
                    }, void 0, false, {
                        fileName: "[project]/app/components/NavMenu.tsx",
                        lineNumber: 458,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModalCard, {
                        title: "Đổi tên đoạn chat",
                        onClose: ()=>setRenameItem(null),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm text-gray-700 mb-2",
                                children: "Tên mới"
                            }, void 0, false, {
                                fileName: "[project]/app/components/NavMenu.tsx",
                                lineNumber: 460,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "w-full h-10 px-3 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/20",
                                value: renameText,
                                autoFocus: true,
                                onChange: (e)=>setRenameText(e.target.value),
                                onKeyDown: (e)=>{
                                    if (e.key === "Enter") submitRename();
                                },
                                placeholder: "Nhập tên"
                            }, void 0, false, {
                                fileName: "[project]/app/components/NavMenu.tsx",
                                lineNumber: 461,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 flex justify-end gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "px-4 h-10 rounded-lg border border-black/10 bg-white hover:bg-black/5",
                                        onClick: ()=>setRenameItem(null),
                                        children: "Hủy"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/NavMenu.tsx",
                                        lineNumber: 472,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "px-4 h-10 rounded-lg bg-[var(--accent)] text-white hover:brightness-110",
                                        onClick: submitRename,
                                        children: "Lưu"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/NavMenu.tsx",
                                        lineNumber: 478,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/NavMenu.tsx",
                                lineNumber: 471,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/NavMenu.tsx",
                        lineNumber: 459,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/NavMenu.tsx",
        lineNumber: 215,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(NavbarMenu, "M4F/cDfRIEFBTiOqSmxe55s1X9k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2f$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"]
    ];
});
_c2 = NavbarMenu;
const __TURBOPACK__default__export__ = NavbarMenu;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Backdrop");
__turbopack_context__.k.register(_c1, "ModalCard");
__turbopack_context__.k.register(_c2, "NavbarMenu");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>Home
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$AnswerDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/AnswerDisplay.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ModelSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ModelSelector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$NavMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/NavMenu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2f$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store/chat.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function normalizeAnswersToMessages(raw) {
    const answers = Array.isArray(raw === null || raw === void 0 ? void 0 : raw.answers) ? raw.answers : [];
    return answers.map((ans)=>{
        const id = (ans === null || ans === void 0 ? void 0 : ans._id) || crypto.randomUUID();
        const content = typeof (ans === null || ans === void 0 ? void 0 : ans.content) === "string" && ans.content.trim() ? ans.content : "(không có nội dung)";
        // authorModel có thể là string id, hoặc object { _id, modelId, displayName }
        let modelId;
        const a = ans === null || ans === void 0 ? void 0 : ans.authorModel;
        if (typeof a === "string") modelId = a;
        else if (a && typeof a === "object") {
            if (typeof a.modelId === "string") modelId = a.modelId;
            else if (typeof a._id === "string") modelId = a._id;
            else if (a._id && typeof a._id === "object" && typeof a._id.toString === "function") {
                modelId = a._id.toString();
            }
        }
        return {
            id,
            role: "assistant",
            content,
            modelId
        };
    });
}
function Home() {
    _s();
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [question, setQuestion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [availableModels, setAvailableModels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { messages, setMessages, addMessage, selectedModelIds, setSelectedModelIds, currentThreadId, setCurrentThreadId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2f$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"])();
    const selectedModels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[selectedModels]": ()=>{
            if (!Array.isArray(availableModels) || availableModels.length === 0) return [];
            const byId = new Map(availableModels.map({
                "Home.useMemo[selectedModels]": (m)=>[
                        m.modelId,
                        m
                    ]
            }["Home.useMemo[selectedModels]"]));
            return selectedModelIds.map({
                "Home.useMemo[selectedModels]": (id)=>byId.get(id)
            }["Home.useMemo[selectedModels]"]).filter({
                "Home.useMemo[selectedModels]": (m)=>m !== undefined
            }["Home.useMemo[selectedModels]"]);
        }
    }["Home.useMemo[selectedModels]"], [
        availableModels,
        selectedModelIds
    ]);
    // Adapter khớp type React.Dispatch<React.SetStateAction<AIModel[]>>
    const onSetSelectedModels = (value)=>{
        const next = typeof value === "function" ? value(selectedModels) : value;
        setSelectedModelIds(next.map((m)=>m.modelId));
    };
    const listEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            var _listEndRef_current;
            (_listEndRef_current = listEndRef.current) === null || _listEndRef_current === void 0 ? void 0 : _listEndRef_current.scrollIntoView({
                behavior: "smooth"
            });
        }
    }["Home.useEffect"], [
        messages,
        isLoading
    ]);
    // Load danh sách model
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            ({
                "Home.useEffect": async ()=>{
                    try {
                        const res = await fetch("/api/models");
                        if (!res.ok) throw new Error("Failed to fetch models");
                        const data = await res.json();
                        setAvailableModels(data);
                    } catch (e) {
                        setError("Không thể tải danh sách AI model.");
                    }
                }
            })["Home.useEffect"]();
        }
    }["Home.useEffect"], []);
    // Nếu model list đổi, loại bỏ các id không còn hợp lệ
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if (!availableModels.length || !selectedModelIds.length) return;
            const valid = new Set(availableModels.map({
                "Home.useEffect": (m)=>m.modelId
            }["Home.useEffect"]));
            const filtered = selectedModelIds.filter({
                "Home.useEffect.filtered": (id)=>valid.has(id)
            }["Home.useEffect.filtered"]);
            if (filtered.length !== selectedModelIds.length) setSelectedModelIds(filtered);
        }
    }["Home.useEffect"], [
        availableModels,
        selectedModelIds,
        setSelectedModelIds
    ]);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!selectedModelIds.length) {
            setError("Vui lòng chọn ít nhất một AI model để hỏi.");
            return;
        }
        const q = question.trim();
        if (!q) {
            setError("Vui lòng nhập câu hỏi.");
            return;
        }
        const userMsg = {
            id: crypto.randomUUID(),
            role: "user",
            content: q
        };
        addMessage(userMsg);
        setQuestion("");
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/questions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                // gửi kèm threadId hiện tại; nếu null, server sẽ tạo mới và trả về
                body: JSON.stringify({
                    question: q,
                    selectedModelIds,
                    threadId: currentThreadId
                })
            });
            if (!res.ok) {
                let ejson = {};
                try {
                    ejson = await res.json();
                } catch (e) {}
                throw new Error(ejson.message || "Yêu cầu thất bại");
            }
            const result = await res.json();
            // nếu server trả threadId mới, lưu lại để các câu sau đi chung đoạn chat
            if ((result === null || result === void 0 ? void 0 : result.threadId) && result.threadId !== currentThreadId) {
                setCurrentThreadId(result.threadId);
            }
            const assistantMsgs = normalizeAnswersToMessages(result);
            // ✅ dùng updater function – chốt literal type cho role để TS không báo
            setMessages((prev)=>[
                    ...prev,
                    ...assistantMsgs.length ? assistantMsgs : [
                        {
                            id: crypto.randomUUID(),
                            role: "assistant",
                            content: "Mình chưa nhận được trả lời từ server."
                        }
                    ]
                ]);
        } catch (err) {
            setError((err === null || err === void 0 ? void 0 : err.message) || "Đã xảy ra lỗi khi gửi câu hỏi.");
        } finally{
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "da88a914a0b70712",
                children: "@keyframes gradientShift{0%{background-position:0%}50%{background-position:100%}to{background-position:0%}}.gradient-bg.jsx-da88a914a0b70712{background:linear-gradient(45deg,#8dbcc7,#a4ccd9,#ebffd8,#38f9d7) 0 0/400% 400%;animation:15s infinite gradientShift}.glassmorphism.jsx-da88a914a0b70712{-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);background:rgba(255,255,255,.25);border:1px solid rgba(255,255,255,.18)}.scroll-clip.jsx-da88a914a0b70712{border-radius:inherit;overflow:hidden}.chat-body{scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.28) transparent;scrollbar-gutter:stable both-edges}.chat-body::-webkit-scrollbar{width:8px}.chat-body::-webkit-scrollbar-track{background:0 0;border-radius:9999px;margin:12px 0}.chat-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.28) padding-box padding-box;border:2px solid transparent;border-radius:9999px}.chat-body:hover::-webkit-scrollbar-thumb{background:rgba(0,0,0,.42)}.textarea-auto{scrollbar-width:thin}.textarea-auto::-webkit-scrollbar{width:6px}.textarea-auto::-webkit-scrollbar-track{background:0 0}.textarea-auto::-webkit-scrollbar-thumb{background:rgba(0,0,0,.28);border-radius:9999px}"
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "jsx-da88a914a0b70712" + " " + "gradient-bg fixed inset-0 overflow-hidden pt-17",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$NavMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        isMenuOpen: isMenuOpen,
                        onMenuClick: ()=>setIsMenuOpen(!isMenuOpen),
                        onClose: ()=>setIsMenuOpen(false),
                        historyItems: []
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-da88a914a0b70712" + " " + "h-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col relative z-30",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-da88a914a0b70712" + " " + "flex justify-center mb-4 shrink-0 w-full",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ModelSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                availableModels: availableModels,
                                selectedModels: selectedModels,
                                setSelectedModels: onSetSelectedModels
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 198,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 197,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 196,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "jsx-da88a914a0b70712" + " " + "fixed left-1/2 -translate-x-1/2 top-[7.5rem] z-30 w-full max-w-7xl px-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-da88a914a0b70712" + " " + "w-full h-[calc(100vh-7.5rem-1.5rem)] min-h-[600px] max-h-[calc(100vh-7.5rem-1.5rem)] glassmorphism rounded-3xl flex flex-col",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-da88a914a0b70712" + " " + "scroll-clip rounded-3xl flex-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-da88a914a0b70712" + " " + "chat-body h-full overflow-y-auto px-6 pr-3 sm:pr-4 py-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$AnswerDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                messages: messages,
                                                isLoading: isLoading,
                                                selectedModels: selectedModels,
                                                error: error
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 210,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                ref: listEndRef,
                                                className: "jsx-da88a914a0b70712"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 216,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 209,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 208,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    onSubmit: handleSubmit,
                                    className: "jsx-da88a914a0b70712" + " " + "border-t border-white/40 glassmorphism px-4 py-4 rounded-b-3xl",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-da88a914a0b70712" + " " + "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                rows: 1,
                                                value: question,
                                                onChange: (e)=>{
                                                    setQuestion(e.target.value);
                                                    e.currentTarget.style.height = "auto";
                                                    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
                                                },
                                                onKeyDown: (e)=>{
                                                    if (e.key === "Enter" && !e.shiftKey) {
                                                        e.preventDefault();
                                                        handleSubmit(e);
                                                    }
                                                },
                                                placeholder: "Hỏi bất kỳ điều gì...",
                                                className: "jsx-da88a914a0b70712" + " " + "textarea-auto flex-1 max-h-[200px] px-4 py-3 rounded-3xl bg-white/80 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#79A3B1] focus:border-transparent shadow-md resize-none overflow-y-auto transition-all"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 222,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                disabled: isLoading,
                                                className: "jsx-da88a914a0b70712" + " " + "h-12 px-5 rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
                                                children: "Gửi"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 239,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 221,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 220,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 207,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 188,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(Home, "U/UdCw7gX40yFJblilcUeMoC564=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2f$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_a14883d9._.js.map