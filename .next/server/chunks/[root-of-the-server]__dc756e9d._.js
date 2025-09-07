module.exports = {

"[project]/.next-internal/server/app/api/questions/route/actions.js [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {

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
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

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
"[project]/lib/models/Question.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// lib/models/Question.js
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const QuestionSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    userId: {
        type: String,
        default: null
    },
    // Nội dung câu hỏi (giữ nguyên tên field bạn đang dùng)
    question: {
        type: String,
        required: true
    },
    // Nếu bạn đang dùng Answer collection riêng thì có thể không cần mảng này.
    // Mình giữ lại để không phá vỡ code cũ.
    answers: {
        type: Array,
        default: []
    },
    // --- NEW: nhóm nhiều Q&A vào cùng 1 “đoạn chat” ---
    threadId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"].Types.ObjectId,
        index: true,
        default: null
    },
    // Các model đã chọn khi hỏi (giữ nguyên)
    selectedModels: [
        {
            type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"].Types.ObjectId,
            ref: "AIModel"
        }
    ],
    createDate: {
        type: Date,
        default: Date.now,
        index: true
    },
    updateDate: {
        type: Date,
        default: Date.now
    }
}, {
    collection: "questions",
    timestamps: false
});
// Cập nhật updateDate tự động khi save/update
QuestionSchema.pre("save", function(next) {
    this.updateDate = new Date();
    next();
});
// Index gợi ý cho hiệu năng (Atlas chạy tốt hơn)
QuestionSchema.index({
    threadId: 1,
    createDate: -1
});
QuestionSchema.index({
    createDate: -1
});
const Question = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"].Question || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["model"])("Question", QuestionSchema);
const __TURBOPACK__default__export__ = Question;
}),
"[project]/lib/models/Answer.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// lib/models/Answer.js
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const AnswerSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    content: {
        type: String,
        required: true
    },
    // Tham chiếu đến câu hỏi mà nó trả lời
    question: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"].Types.ObjectId,
        ref: "Question",
        required: true,
        index: true
    },
    // Tham chiếu đến AI model đã tạo ra câu trả lời này
    authorModel: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"].Types.ObjectId,
        ref: "AIModel",
        required: true
    },
    // --- NEW: gom nhóm đoạn chat ---
    threadId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"].Types.ObjectId,
        index: true,
        default: null
    },
    createDate: {
        type: Date,
        default: Date.now,
        index: true
    }
}, {
    collection: "answers"
});
// Index gợi ý thêm cho hiệu năng khi lấy dữ liệu
AnswerSchema.index({
    threadId: 1,
    createDate: 1
});
const Answer = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"].Answer || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["model"])("Answer", AnswerSchema);
const __TURBOPACK__default__export__ = Answer;
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
"[project]/lib/services/aiService.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// lib/services/openRouterService.js
// Hàm này sẽ là "trái tim" của việc gọi AI
// Nó nhận vào nội dung câu hỏi và ID của model cần dùng
__turbopack_context__.s({
    "askOpenRouter": ()=>askOpenRouter
});
async function askOpenRouter(questionContent, modelId) {
    // Lấy API Key từ file .env
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    if (!OPENROUTER_API_KEY) {
        throw new Error("OPENROUTER_API_KEY chưa được thiết lập trong file .env");
    }
    console.log(`Đang gửi câu hỏi tới model: ${modelId}...`);
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // Đây chính là "cấu trúc chung" mà bạn muốn.
                // Mọi AI model trên OpenRouter đều dùng chung cấu trúc này.
                "model": modelId,
                "messages": [
                    {
                        "role": "user",
                        "content": questionContent
                    }
                ]
            })
        });
        if (!response.ok) {
            // Nếu API trả về lỗi, ném ra lỗi để catch block xử lý
            const errorData = await response.json();
            throw new Error(`Lỗi từ OpenRouter API: ${response.statusText} - ${JSON.stringify(errorData)}`);
        }
        const data = await response.json();
        // Trả về nội dung câu trả lời của AI
        return data.choices[0].message.content;
    } catch (error) {
        console.error(`Lỗi khi gọi model ${modelId}:`, error);
        // Ném lỗi ra ngoài để hàm gọi nó có thể xử lý
        throw error;
    }
}
}),
"[project]/app/api/questions/route.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// app/api/questions/route.js
__turbopack_context__.s({
    "POST": ()=>POST
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Question$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/models/Question.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Answer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/models/Answer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$AIModel$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/models/AIModel.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$aiService$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/aiService.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
async function POST(request) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const body = await request.json();
        const { question, userId, selectedModelIds, threadId } = body || {};
        // Validate input
        if (!question || !Array.isArray(selectedModelIds) || selectedModelIds.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "Dữ liệu không hợp lệ."
            }, {
                status: 400
            });
        }
        // Xác định threadId cuối cùng (nếu FE gửi thì dùng, không có thì tạo mới)
        const finalThreadId = threadId && __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Types.ObjectId.isValid(threadId) ? new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Types.ObjectId(threadId) : new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Types.ObjectId();
        // Lấy ra các model theo mảng modelId (string) FE gửi lên
        const foundModels = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$AIModel$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({
            modelId: {
                $in: selectedModelIds
            }
        }).lean();
        if (foundModels.length !== selectedModelIds.length) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "Một hoặc nhiều AI model không hợp lệ."
            }, {
                status: 404
            });
        }
        // Lưu Question (gắn threadId)
        const modelObjectIds = foundModels.map((m)=>m._id);
        const newQuestion = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Question$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create({
            question: String(question),
            userId: userId ?? null,
            selectedModels: modelObjectIds,
            threadId: finalThreadId,
            createDate: new Date(),
            updateDate: new Date()
        });
        // Gọi các model sinh câu trả lời (song song)
        // FE gửi selectedModelIds là danh sách *modelId* (string). Dùng đúng thứ tự để map.
        const aiPromises = foundModels.map((m)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$aiService$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["askOpenRouter"])(String(question), m.modelId));
        const aiResponses = await Promise.all(aiPromises); // array<string>
        // Chuẩn bị dữ liệu Answer để lưu (gắn threadId)
        const newAnswersData = aiResponses.map((responseText, idx)=>({
                content: responseText || "",
                question: newQuestion._id,
                authorModel: foundModels[idx]._id,
                threadId: finalThreadId,
                createDate: new Date()
            }));
        // Lưu tất cả Answer
        const savedAnswers = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Answer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].insertMany(newAnswersData);
        // Populate authorModel để FE hiển thị được tên/modelId
        const populatedAnswers = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Answer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({
            _id: {
                $in: savedAnswers.map((a)=>a._id)
            }
        }).populate({
            path: "authorModel",
            select: "modelId displayName"
        }).lean();
        // Trả về cho FE:
        // - threadId để lưu vào store và gửi kèm cho lần hỏi sau
        // - questionId cho tiện debug / liên kết
        // - answers đã populate (FE đang normalize linh hoạt)
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            threadId: String(finalThreadId),
            questionId: String(newQuestion._id),
            question: {
                _id: String(newQuestion._id),
                question: newQuestion.question,
                userId: newQuestion.userId,
                selectedModels: newQuestion.selectedModels,
                threadId: String(finalThreadId),
                createDate: newQuestion.createDate,
                updateDate: newQuestion.updateDate
            },
            answers: populatedAnswers.map((a)=>({
                    _id: String(a._id),
                    content: a.content,
                    authorModel: a.authorModel ? {
                        _id: String(a.authorModel._id),
                        modelId: a.authorModel.modelId,
                        displayName: a.authorModel.displayName
                    } : null,
                    question: String(a.question),
                    threadId: a.threadId ? String(a.threadId) : null,
                    createDate: a.createDate
                }))
        }, {
            status: 201
        });
    } catch (error) {
        console.error("Lỗi trong quá trình tạo và xử lý câu hỏi:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Lỗi server"
        }, {
            status: 500
        });
    }
}
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__dc756e9d._.js.map