const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const Answer = require("../models/Answer");
const axios = require("axios");
const AIModel = require("../models/AIModel"); // <-- Thêm dòng này

// --- API MỚI: LẤY DANH SÁCH CÁC MODEL AI ---
// GET /api/models
router.get("/models", async (req, res) => {
  try {
    const models = await AIModel.find({});
    res.status(200).json(models);
  } catch (error) {
    console.error("Error fetching AI models:", error);
    res.status(500).json({ message: "Lỗi từ máy chủ." });
  }
});
// API Endpoint: POST /api/ask
router.post("/ask", async (req, res) => {
  // Nhận cả câu hỏi và danh sách model từ người dùng
  const { questionText, selectedModels } = req.body;

  if (!questionText) {
    return res.status(400).json({ message: "Vui lòng nhập câu hỏi." });
  }
  // Kiểm tra xem người dùng có chọn model hay không
  if (
    !selectedModels ||
    !Array.isArray(selectedModels) ||
    selectedModels.length === 0
  ) {
    return res
      .status(400)
      .json({ message: "Vui lòng chọn ít nhất một model AI." });
  }

  try {
    const newQuestion = new Question({ text: questionText });
    await newQuestion.save();

    const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions";
    const openRouterKey = process.env.OPENROUTER_API_KEY;

    // Sử dụng danh sách model do người dùng chọn (selectedModels)
    const apiCallPromises = selectedModels.map((modelId) =>
      axios.post(
        openRouterUrl,
        { model: modelId, messages: [{ role: "user", content: questionText }] },
        { headers: { Authorization: `Bearer ${openRouterKey}` } }
      )
    );

    const responses = await Promise.allSettled(apiCallPromises);

    const savedAnswers = [];
    for (let i = 0; i < responses.length; i++) {
      const result = responses[i];
      const modelSource = selectedModels[i]; // Lấy tên model từ danh sách người dùng chọn

      if (result.status === "fulfilled") {
        const answerText = result.value.data.choices[0].message.content;
        const newAnswer = new Answer({
          text: answerText,
          modelSource: modelSource,
          question: newQuestion._id,
        });
        savedAnswers.push(newAnswer.save());
      } else {
        console.error(
          `Error calling model ${modelSource}:`,
          result.reason.message
        );
      }
    }

    const finalAnswers = await Promise.all(savedAnswers);
    res.status(201).json({ question: newQuestion, answers: finalAnswers });
  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({ message: "Lỗi từ máy chủ." });
  }
});

module.exports = router;
