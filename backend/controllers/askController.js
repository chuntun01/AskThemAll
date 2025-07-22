// Backend - sửa lại route /api/ask
app.post("/api/ask", async (req, res) => {
  try {
    const { question, userId } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Câu hỏi không được để trống" });
    }

    // Giả lập phản hồi từ các AI
    const answers = [
      {
        ai_name: "ChatGPT",
        answer_text: `ChatGPT trả lời: ${question}`,
        response_time_ms: Math.floor(Math.random() * 1000) + 500,
      },
      {
        ai_name: "Claude",
        answer_text: `Claude trả lời: ${question}`,
        response_time_ms: Math.floor(Math.random() * 1000) + 500,
      },
      {
        ai_name: "Gemini",
        answer_text: `Gemini phản hồi: ${question}`,
        response_time_ms: Math.floor(Math.random() * 1000) + 500,
      },
    ];

    // Lưu vào database
    const newQuestion = new Question({
      userId: userId || null,
      question: question,
      answers: answers,
    });

    await newQuestion.save();

    res.json({
      success: true,
      answers: answers, // Trả về answers trực tiếp
      question: newQuestion,
    });
  } catch (err) {
    console.error("Lỗi khi xử lý câu hỏi:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
});
