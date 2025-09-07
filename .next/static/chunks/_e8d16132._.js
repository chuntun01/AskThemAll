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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>"); // 👈 import icon copy từ lucide-react
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function AnswerDisplay(param) {
    let { isLoading, messages = [], selectedModels = [], error } = param;
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
                    lineNumber: 47,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/AnswerDisplay.tsx",
                lineNumber: 46,
                columnNumber: 9
            }, this),
            messages.map((msg)=>{
                var _selectedModels_find;
                const isUser = msg.role === "user";
                var _selectedModels_find_displayName;
                const modelName = !isUser && msg.modelId ? (_selectedModels_find_displayName = (_selectedModels_find = selectedModels.find((m)=>m._id === msg.modelId)) === null || _selectedModels_find === void 0 ? void 0 : _selectedModels_find.displayName) !== null && _selectedModels_find_displayName !== void 0 ? _selectedModels_find_displayName : "AI" : undefined;
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
                                lineNumber: 77,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "whitespace-pre-wrap break-words",
                                children: msg.content
                            }, void 0, false, {
                                fileName: "[project]/app/components/AnswerDisplay.tsx",
                                lineNumber: 80,
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
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                size: 16,
                                                strokeWidth: 2
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/AnswerDisplay.tsx",
                                                lineNumber: 99,
                                                columnNumber: 21
                                            }, this),
                                            " "
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/AnswerDisplay.tsx",
                                        lineNumber: 85,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "\n                      pointer-events-none absolute -top-7 right-2\n                      text-xs px-2 py-1 rounded-md bg-black/75 text-white shadow transition\n                      ".concat(copiedId === msg.id ? "opacity-100" : "opacity-0", "\n                    "),
                                        children: "Đã copy"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/AnswerDisplay.tsx",
                                        lineNumber: 103,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/AnswerDisplay.tsx",
                        lineNumber: 66,
                        columnNumber: 13
                    }, this)
                }, msg.id, false, {
                    fileName: "[project]/app/components/AnswerDisplay.tsx",
                    lineNumber: 62,
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
                                        lineNumber: 126,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-2 h-2 bg-gray-900 rounded-full animate-bounce [animation-delay:-0.15s]"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/AnswerDisplay.tsx",
                                        lineNumber: 127,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-2 h-2 bg-gray-900 rounded-full animate-bounce"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/AnswerDisplay.tsx",
                                        lineNumber: 128,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/AnswerDisplay.tsx",
                                lineNumber: 125,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/AnswerDisplay.tsx",
                        lineNumber: 123,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/AnswerDisplay.tsx",
                    lineNumber: 122,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/AnswerDisplay.tsx",
                lineNumber: 121,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/AnswerDisplay.tsx",
        lineNumber: 43,
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
"[project]/app/components/NavMenu.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@clerk/clerk-react/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$3664V5SS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/clerk-react/dist/chunk-3664V5SS.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const NavbarMenu = (param)=>{
    let { isMenuOpen, onMenuClick, onClose, historyItems } = param;
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const onStatistics = pathname === null || pathname === void 0 ? void 0 : pathname.startsWith("/statistics");
    // ESC để đóng
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NavbarMenu.useEffect": ()=>{
            const onEsc = {
                "NavbarMenu.useEffect.onEsc": (e)=>{
                    if (e.key === "Escape" && isMenuOpen) onClose();
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "bg-[#BBDCE5] text-white shadow-lg fixed top-0 left-0 right-0 z-[100] h-16",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-4 h-full max-w-8xl mx-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 w-60",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onMenuClick,
                                className: "p-2 rounded-md text-xl transition-colors duration-150 ".concat(isMenuOpen ? "opacity-0 pointer-events-none" : "hover:bg-[#D0E8F2]"),
                                "aria-label": "Mở menu",
                                "aria-expanded": isMenuOpen,
                                "aria-controls": "side-menu",
                                children: "☰"
                            }, void 0, false, {
                                fileName: "[project]/app/components/NavMenu.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            onStatistics && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "px-3 py-2 rounded-md bg-white/20 hover:bg-white/40 transition text-sm md:text-base",
                                "aria-label": "Về trang chủ",
                                children: "← Trang chủ"
                            }, void 0, false, {
                                fileName: "[project]/app/components/NavMenu.tsx",
                                lineNumber: 59,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/NavMenu.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-lg font-bold whitespace-nowrap",
                        children: "Ask Them All"
                    }, void 0, false, {
                        fileName: "[project]/app/components/NavMenu.tsx",
                        lineNumber: 70,
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
                                            lineNumber: 76,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SignUpButton"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "bg-[#456268] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer",
                                                children: "Sign Up"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/NavMenu.tsx",
                                                lineNumber: 78,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/NavMenu.tsx",
                                            lineNumber: 77,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/NavMenu.tsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SignedIn"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$3664V5SS$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserButton"], {}, void 0, false, {
                                        fileName: "[project]/app/components/NavMenu.tsx",
                                        lineNumber: 84,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/app/components/NavMenu.tsx",
                                    lineNumber: 83,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/NavMenu.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/app/components/NavMenu.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/NavMenu.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: onClose,
                "aria-hidden": "true",
                className: [
                    "fixed inset-0 z-[90] transition-opacity duration-200 ease-out",
                    isMenuOpen ? "opacity-100 pointer-events-auto bg-black/40" : "opacity-0 pointer-events-none bg-black/40"
                ].join(" ")
            }, void 0, false, {
                fileName: "[project]/app/components/NavMenu.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                id: "side-menu",
                role: "dialog",
                "aria-modal": "true",
                "aria-label": "Menu điều hướng",
                className: [
                    "fixed top-0 left-0 z-[95] h-full w-72 max-w-[90vw] bg-[#BBDCE5] p-4 shadow-xl",
                    "transform-gpu [will-change:transform] transition-transform duration-400 ease-out",
                    isMenuOpen ? "translate-x-0" : "-translate-x-full"
                ].join(" "),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end mb-4 mt-16",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "p-2 bg-[#456268] rounded hover:bg-[#D0E8F2] transition-colors duration-700",
                            children: "Đóng"
                        }, void 0, false, {
                            fileName: "[project]/app/components/NavMenu.tsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/app/components/NavMenu.tsx",
                        lineNumber: 114,
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
                                lineNumber: 125,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-4 text-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "/statistics",
                                            onClick: onClose,
                                            className: "block hover:underline focus:outline-none focus:ring-2 focus:ring-white/10 rounded-sm transition",
                                            children: "Thống kê"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/NavMenu.tsx",
                                            lineNumber: 128,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/NavMenu.tsx",
                                        lineNumber: 127,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    onStatistics && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "/",
                                            onClick: onClose,
                                            className: "block hover:underline focus:outline-none focus:ring-2 focus:ring-white/10 rounded-sm transition",
                                            children: "← Trang chủ"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/NavMenu.tsx",
                                            lineNumber: 138,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/NavMenu.tsx",
                                        lineNumber: 137,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/NavMenu.tsx",
                                lineNumber: 126,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/NavMenu.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold mb-4",
                                children: "Lịch sử"
                            }, void 0, false, {
                                fileName: "[project]/app/components/NavMenu.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-4 text-xl",
                                children: historyItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: item.href,
                                            onClick: onClose,
                                            className: "block hover:underline focus:outline-none focus:ring-2 focus:ring-white/10 rounded-sm transition",
                                            children: item.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/NavMenu.tsx",
                                            lineNumber: 156,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, index, false, {
                                        fileName: "[project]/app/components/NavMenu.tsx",
                                        lineNumber: 155,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/app/components/NavMenu.tsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/NavMenu.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/NavMenu.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/NavMenu.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(NavbarMenu, "V/ldUoOTYUs0Cb2F6bbxKSn7KxI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = NavbarMenu;
const __TURBOPACK__default__export__ = NavbarMenu;
var _c;
__turbopack_context__.k.register(_c, "NavbarMenu");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/store/chat.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useChatStore": ()=>useChatStore
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
"use client";
;
;
const useChatStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set)=>({
        messages: [],
        selectedModelIds: [],
        setMessages: (arr)=>set({
                messages: arr
            }),
        addMessage: (m)=>set((s)=>({
                    messages: [
                        ...s.messages,
                        m
                    ]
                })),
        clearMessages: ()=>set({
                messages: []
            }),
        setSelectedModelIds: (ids)=>set({
                selectedModelIds: Array.from(new Set(ids))
            })
    }), {
    name: "chat-store-v1",
    partialize: (s)=>({
            messages: s.messages,
            selectedModelIds: s.selectedModelIds
        })
}));
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2f$chat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store/chat.js [app-client] (ecmascript)"); // 👈 dùng store chung
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
        let modelId;
        const a = ans === null || ans === void 0 ? void 0 : ans.authorModel;
        if (typeof a === "string") modelId = a;
        else if (a && typeof a === "object") {
            if (typeof a._id === "string") modelId = a._id;
            else if (typeof a.id === "string") modelId = a.id;
            else if (typeof a.modelId === "string") modelId = a.modelId;
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
    // 👇 lấy & set từ store (persist vào localStorage)
    const { messages, setMessages, addMessage, selectedModelIds, setSelectedModelIds } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2f$chat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"])();
    // Khi ModelSelector cần AIModel[], mình map từ id sang object
    const selectedModels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[selectedModels]": ()=>{
            if (!(availableModels === null || availableModels === void 0 ? void 0 : availableModels.length)) return [];
            const byId = new Map(availableModels.map({
                "Home.useMemo[selectedModels]": (m)=>[
                        m.modelId,
                        m
                    ]
            }["Home.useMemo[selectedModels]"]));
            return selectedModelIds.map({
                "Home.useMemo[selectedModels]": (id)=>byId.get(id)
            }["Home.useMemo[selectedModels]"]).filter(Boolean);
        }
    }["Home.useMemo[selectedModels]"], [
        availableModels,
        selectedModelIds
    ]);
    // Khi ModelSelector trả về AIModel[], convert sang mảng id để lưu store
    const handleSetSelectedModels = (models)=>{
        setSelectedModelIds(models.map((m)=>m.modelId));
    };
    // Auto scroll
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
    // Tải models
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const fetchModels = {
                "Home.useEffect.fetchModels": async ()=>{
                    try {
                        const res = await fetch("/api/models");
                        if (!res.ok) throw new Error("Failed to fetch models");
                        const data = await res.json();
                        setAvailableModels(data);
                    } catch (e) {
                        setError("Không thể tải danh sách AI model.");
                    }
                }
            }["Home.useEffect.fetchModels"];
            fetchModels();
        }
    }["Home.useEffect"], []);
    // Nếu store đã lưu id nhưng model list thay đổi, loại id không còn tồn tại
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if (!availableModels.length || !selectedModelIds.length) return;
            const validIds = new Set(availableModels.map({
                "Home.useEffect": (m)=>m.modelId
            }["Home.useEffect"]));
            const filtered = selectedModelIds.filter({
                "Home.useEffect.filtered": (id)=>validIds.has(id)
            }["Home.useEffect.filtered"]);
            if (filtered.length !== selectedModelIds.length) {
                setSelectedModelIds(filtered);
            }
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
        addMessage({
            id: crypto.randomUUID(),
            role: "user",
            content: q
        });
        setQuestion("");
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/questions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    question: q,
                    selectedModelIds
                })
            });
            if (!response.ok) {
                let errorData = {};
                try {
                    errorData = await response.json();
                } catch (e) {}
                throw new Error(errorData.message || "Yêu cầu thất bại");
            }
            const result = await response.json();
            const assistantMsgs = normalizeAnswersToMessages(result);
            setMessages([
                ...messages,
                {
                    id: crypto.randomUUID(),
                    role: "user",
                    content: q
                },
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
                id: "e7fa81c8639de450",
                children: "@keyframes gradientShift{0%{background-position:0%}50%{background-position:100%}to{background-position:0%}}.gradient-bg.jsx-e7fa81c8639de450{background:linear-gradient(45deg,#8dbcc7,#a4ccd9,#ebffd8,#38f9d7) 0 0/400% 400%;animation:15s infinite gradientShift}.glassmorphism.jsx-e7fa81c8639de450{-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);background:rgba(255,255,255,.25);border:1px solid rgba(255,255,255,.18)}.scroll-clip.jsx-e7fa81c8639de450{border-radius:inherit;overflow:hidden}.chat-body{scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.28) transparent;scrollbar-gutter:stable both-edges}.chat-body::-webkit-scrollbar{width:8px}.chat-body::-webkit-scrollbar-track{background:0 0;border-radius:9999px;margin:12px 0}.chat-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.28) padding-box padding-box;border:2px solid transparent;border-radius:9999px}.chat-body:hover::-webkit-scrollbar-thumb{background:rgba(0,0,0,.42)}.textarea-auto{scrollbar-width:thin}.textarea-auto::-webkit-scrollbar{width:6px}.textarea-auto::-webkit-scrollbar-track{background:0 0}.textarea-auto::-webkit-scrollbar-thumb{background:rgba(0,0,0,.28);border-radius:9999px}"
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "jsx-e7fa81c8639de450" + " " + "gradient-bg fixed inset-0 overflow-hidden pt-17",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$NavMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        isMenuOpen: isMenuOpen,
                        onMenuClick: ()=>setIsMenuOpen(!isMenuOpen),
                        onClose: ()=>setIsMenuOpen(false),
                        historyItems: []
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-e7fa81c8639de450" + " " + "h-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col relative z-30",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-e7fa81c8639de450" + " " + "flex justify-center mb-4 shrink-0 w-full",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ModelSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                availableModels: availableModels,
                                selectedModels: selectedModels,
                                setSelectedModels: handleSetSelectedModels
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 189,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 188,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "jsx-e7fa81c8639de450" + " " + "fixed left-1/2 -translate-x-1/2 top-[7.5rem] z-30 w-full max-w-7xl px-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-e7fa81c8639de450" + " " + "w-full h-[calc(100vh-7.5rem-1.5rem)] min-h-[600px] max-h-[calc(100vh-7.5rem-1.5rem)] glassmorphism rounded-3xl flex flex-col",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-e7fa81c8639de450" + " " + "scroll-clip rounded-3xl flex-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-e7fa81c8639de450" + " " + "chat-body h-full overflow-y-auto px-6 pr-3 sm:pr-4 py-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$AnswerDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                messages: messages,
                                                isLoading: isLoading,
                                                selectedModels: selectedModels,
                                                error: error
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 201,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                ref: listEndRef,
                                                className: "jsx-e7fa81c8639de450"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 207,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 200,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 199,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    onSubmit: handleSubmit,
                                    className: "jsx-e7fa81c8639de450" + " " + "border-t border-white/40 glassmorphism px-4 py-4 rounded-b-3xl",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-e7fa81c8639de450" + " " + "flex items-center gap-2",
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
                                                className: "jsx-e7fa81c8639de450" + " " + "textarea-auto flex-1 max-h-[200px] px-4 py-3 rounded-3xl bg-white/80 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#79A3B1] focus:border-transparent shadow-md resize-none overflow-y-auto transition-all"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 213,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                disabled: isLoading,
                                                className: "jsx-e7fa81c8639de450" + " " + "h-12 px-5 rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
                                                children: "Gửi"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 230,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 212,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 211,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 198,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(Home, "7bRdW6cW7+S9aX2NJYcUFY6yBho=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2f$chat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"]
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

//# sourceMappingURL=_e8d16132._.js.map