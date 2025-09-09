module.exports = {

"[project]/.next-internal/server/app/api/models/route/actions.js [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}}),
"[externals]/mongoose [external] (mongoose, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("mongoose", () => require("mongoose"));

module.exports = mod;
}}),
"[project]/lib/db/index.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// lib/db/index.js
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
// Note: Lấy chuỗi kết nối từ file .env. Đây là cách an toàn để quản lý các biến bí mật.
const MONGODB_URI = process.env.MONGODB_URI;
// Note: Kiểm tra xem MONGODB_URI có tồn tại không. Nếu không, dừng ứng dụng ngay lập tức
// để tránh các lỗi không mong muốn về sau. Đây là một "fail-fast check".
if (!MONGODB_URI) {
    throw new Error("Vui lòng định nghĩa biến MONGODB_URI trong file .env của bạn");
}
/**
 * Note: Trong môi trường serverless, code có thể chạy lại nhiều lần.
 * Chúng ta cần một nơi để lưu trữ kết nối database giữa các lần chạy đó.
 * `global` là một đối tượng đặc biệt trong Node.js không bị ảnh hưởng bởi
 * "hot-reloading", do đó nó là nơi lý tưởng để lưu cache kết nối.
 */ let cached = ("TURBOPACK ident replacement", globalThis).mongoose;
if (!cached) {
    cached = ("TURBOPACK ident replacement", globalThis).mongoose = {
        conn: null,
        promise: null
    };
}
async function connectDB() {
    // --- BƯỚC 1: KIỂM TRA KẾT NỐI CÓ SẴN TRONG CACHE ---
    // Note: Nếu đã có kết nối được thiết lập trước đó, hãy sử dụng lại nó ngay lập tức.
    // Đây là phần quan trọng nhất giúp tối ưu hiệu suất và tránh tạo quá nhiều kết nối tới DB.
    if (cached.conn) {
        console.log("🚀 Using cached database connection");
        return cached.conn;
    }
    // --- BƯỚC 2: NẾU CHƯA CÓ KẾT NỐI, TẠO MỘT KẾT NỐI MỚI ---
    // Note: Chúng ta cache lại "lời hứa" (promise) của việc kết nối.
    // Điều này ngăn chặn việc nhiều yêu cầu API cùng lúc cố gắng tạo kết nối mới (race condition).
    // Yêu cầu đầu tiên sẽ tạo promise, các yêu cầu sau sẽ chờ promise đó hoàn thành.
    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        };
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connect(MONGODB_URI, opts).then((mongooseInstance)=>{
            console.log("✅ New database connection established");
            return mongooseInstance;
        });
    }
    // --- BƯỚC 3: CHỜ KẾT NỐI HOÀN TẤT VÀ XỬ LÝ LỖI ---
    // Note: Chờ cho "lời hứa" kết nối ở trên hoàn tất và gán kết quả vào cache.conn.
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        // Note: Nếu kết nối thất bại (sai mật khẩu, lỗi IP,...), hãy xóa promise đã cache
        // để yêu cầu tiếp theo có thể thử kết nối lại.
        cached.promise = null;
        throw e;
    }
    // Note: Trả về kết nối đã hoàn tất.
    return cached.conn;
}
const __TURBOPACK__default__export__ = connectDB;
}),
"[project]/lib/models/AIModel.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// File: lib/models/AIModel.js
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
// Ghi chú: Chúng ta sử dụng cú pháp import ES Module nhất quán
const AIModelSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    modelId: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        default: "Unknown"
    },
    isFree: {
        type: Boolean,
        default: true
    }
});
// Ghi chú: Sử dụng `models` được import trực tiếp và cú pháp `export default`
const AIModel = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"].AIModel || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["model"])("AIModel", AIModelSchema);
const __TURBOPACK__default__export__ = AIModel;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/app/api/models/route.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "GET": ()=>GET
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$AIModel$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/models/AIModel.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
;
;
async function GET() {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        // Thay đổi ở đây: Thêm .find({})
        const models = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$AIModel$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({});
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(models, {
            status: 200
        });
    } catch (error) {
        console.error("Error fetching AI models:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Lỗi từ máy chủ."
        }, {
            status: 500
        });
    }
}
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__e676dda1._.js.map