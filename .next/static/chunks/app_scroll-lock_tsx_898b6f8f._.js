(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/app/scroll-lock.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>ScrollLock
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function ScrollLock() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScrollLock.useEffect": ()=>{
            const lock = pathname === "/"; // <-- chỉ khóa ở trang chủ
            const html = document.documentElement;
            const body = document.body;
            if (lock) {
                html.style.overflow = "hidden";
                body.style.overflow = "hidden";
                body.style.height = "100dvh";
            } else {
                html.style.overflow = ""; // về mặc định
                body.style.overflowY = "auto"; // cho phép cuộn
                body.style.height = ""; // bỏ ép chiều cao
            }
            // dọn dẹp khi rời layout
            return ({
                "ScrollLock.useEffect": ()=>{
                    html.style.overflow = "";
                    body.style.overflow = "";
                    body.style.height = "";
                }
            })["ScrollLock.useEffect"];
        }
    }["ScrollLock.useEffect"], [
        pathname
    ]);
    return null;
}
_s(ScrollLock, "V/ldUoOTYUs0Cb2F6bbxKSn7KxI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = ScrollLock;
var _c;
__turbopack_context__.k.register(_c, "ScrollLock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_scroll-lock_tsx_898b6f8f._.js.map