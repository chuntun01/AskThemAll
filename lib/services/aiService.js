// lib/services/openRouterService.js

// Hàm này sẽ là "trái tim" của việc gọi AI
// Nó nhận vào nội dung câu hỏi và ID của model cần dùng
export async function askOpenRouter(questionContent, modelId) {
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
        "model": modelId, // Tên model cụ thể, ví dụ: "google/gemma-7b-it"
        "messages": [
          { "role": "user", "content": questionContent }
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