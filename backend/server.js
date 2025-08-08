const express = require("express");
const connectDB = require("./config/db");
const User = require("./models/AIModel");
const Question = require("./models/Question"); // Import Question model
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

const cors = require("cors");

// Kết nối Database
connectDB();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// QUAN TRỌNG: Middleware để parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend đang chạy!" });
});

// Test tạo user
app.get("/test-create-user", async (req, res) => {
  try {
    const user = new User({ username: "demo", password: "123456" });
    await user.save();
    res.json({ message: "Đã tạo user demo!", user });
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi tạo user: " + err.message });
  }
});

// API route chính - nơi frontend gọi
app.post("/api/ask", async (req, res) => {
  try {
    const { question, userId } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Câu hỏi không được để trống" });
    }

    // Tạo câu trả lời giả (sau này sẽ thay bằng AI thật)
    const mockAnswers = [
      {
        ai_name: "ChatGPT",
        answer_text: `Đây là câu trả lời cho: "${question}"`,
        response_time_ms: 1200,
      },
      {
        ai_name: "Claude",
        answer_text: `Tôi hiểu câu hỏi của bạn: "${question}". Đây là phản hồi của tôi.`,
        response_time_ms: 800,
      },
    ];

    // Lưu vào database
    const newQuestion = new Question({
      userId: userId || null,
      question: question,
      answers: mockAnswers,
    });

    await newQuestion.save();

    res.json({
      success: true,
      message: "Câu hỏi đã được xử lý",
      data: newQuestion,
    });
  } catch (err) {
    console.error("Lỗi khi xử lý câu hỏi:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
});

// Lấy lịch sử câu hỏi
app.get("/api/questions", async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 }).limit(10);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi lấy câu hỏi: " + err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
  console.log(`🔗 Test API: http://localhost:${PORT}/api/ask`);
});
