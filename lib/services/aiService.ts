// // lib/services/openRouterService.js

// // Hàm này sẽ là "trái tim" của việc gọi AI
// // Nó nhận vào nội dung câu hỏi và ID của model cần dùng
// export async function askOpenRouter(questionContent, modelId) {
//   // Lấy API Key từ file .env
//   const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
//   if (!OPENROUTER_API_KEY) {
//     throw new Error("OPENROUTER_API_KEY chưa được thiết lập trong file .env");
//   }

//   console.log(`Đang gửi câu hỏi tới model: ${modelId}...`);

//   try {
//     const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         // "cấu trúc chung" 
//         "model": modelId, 
//         "messages": [
//           { "role": "user", "content": questionContent}
//         ]
//       })
//     });

//     if (!response.ok) {
//       // Nếu API trả về lỗi, ném ra lỗi để catch block xử lý
//       const errorData = await response.json();
//       throw new Error(`Lỗi từ OpenRouter API: ${response.statusText} - ${JSON.stringify(errorData)}`);
//     }

//     const data = await response.json();
    
//     // Trả về nội dung câu trả lời của AI
//     return data.choices[0].message.content;

//   } catch (error) {
//     console.error(`Lỗi khi gọi model ${modelId}:`, error);
//     // Ném lỗi ra ngoài để hàm gọi nó có thể xử lý
//     throw error;
//   }
// }

// type ORMessage = { role: "system" | "user" | "assistant"; content: string };

// export async function askOpenRouterWithMessages(messages: ORMessage[], modelId: string) {
//   const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
//   if (!OPENROUTER_API_KEY) throw new Error("OPENROUTER_API_KEY chưa được thiết lập");

//   const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${OPENROUTER_API_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ model: modelId, messages }),
//   });

//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({}));
//     throw new Error(`OpenRouter API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
//   }

//   const data = await response.json();
//   return data?.choices?.[0]?.message?.content ?? "";
// }

//-------------------------------=


// type ORMessage = { role: "system" | "user" | "assistant"; content: string };

// export async function askOpenRouter( modelId: string, params: {
//   modelId: string;
//   messages: ORMessage[];
//   temperature?: number;
// }) {
//   const { modelId, messages, temperature = 0.7 } = params;

//   const apiKey = process.env.OPENROUTER_API_KEY;
//   if (!apiKey) throw new Error("OPENROUTER_API_KEY chưa được thiết lập");

//   const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${apiKey}`,
//       "Content-Type": "application/json",
//       // Optional nhưng khuyến nghị khi dùng OpenRouter:
//       "HTTP-Referer": process.env.OPENROUTER_SITE_URL ?? "http://localhost:3000",
//       "X-Title": process.env.OPENROUTER_APP_NAME ?? "ask-them-all",
//     },
//     body: JSON.stringify({
//       model: modelId,
//       messages,
//       temperature,
//     }),
//   });

//   if (!res.ok) {
//     const errorData = await res.json().catch(() => ({}));
//     throw new Error(`OpenRouter error: ${res.status} ${res.statusText} ${JSON.stringify(errorData)}`);
//   }

//   const data = await res.json();
//   return data?.choices?.[0]?.message?.content ?? "";
// }



type ORMessage = { role: "system" | "user" | "assistant"; content: string };

export async function askOpenRouterChat(messages: ORMessage[], modelId: string) {
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
  if (!OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY chưa được thiết lập trong file .env");
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      // Optional nhưng nên có với OpenRouter:
      "HTTP-Referer": process.env.OPENROUTER_SITE_URL ?? "http://localhost:3000",
      "X-Title": process.env.OPENROUTER_APP_NAME ?? "AskThemAll",
    },
    body: JSON.stringify({
      model: modelId,
      messages,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `Lỗi từ OpenRouter API: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
    );
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content ?? "";
}

// Backward-compatible wrapper: vẫn nhận prompt string như cũ
export async function askOpenRouter(questionContent: string, modelId: string) {
  return askOpenRouterChat([{ role: "user", content: questionContent }], modelId);
}
