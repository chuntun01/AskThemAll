// app/api/questions/route.js

import connectDB from "@/lib/db";
import Question from "@/lib/models/Question";
import AIModel from "@/lib/models/AIModel";
import Answer from "@/lib/models/Answer"; // <-- 1. Import model Answer
import { NextResponse } from "next/server";
import { askOpenRouter } from "@/lib/services/aiService";

// ... (Hàm GET giữ nguyên) ...

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { question, userId, selectedModelIds } = body;

    if (
      !question ||
      !Array.isArray(selectedModelIds) ||
      selectedModelIds.length === 0
    ) {
      return NextResponse.json(
        { message: "Dữ liệu không hợp lệ." },
        { status: 400 }
      );
    }

    const foundModels = await AIModel.find({
      modelId: { $in: selectedModelIds },
    });
    if (foundModels.length !== selectedModelIds.length) {
      return NextResponse.json(
        { message: "Một hoặc nhiều AI model không hợp lệ." },
        { status: 404 }
      );
    }
    const modelObjectIds = foundModels.map((model) => model._id);

    const newQuestion = await Question.create({
      question,
      userId,
      selectedModels: modelObjectIds,
    });

    const populatedQuestion = await Question.findById(newQuestion._id).populate(
      "selectedModels"
    );

    const aiPromises = populatedQuestion.selectedModels.map((model) =>
      askOpenRouter(populatedQuestion.question, model.modelId)
    );
    const aiResponses = await Promise.all(aiPromises);

    // --- 2. LOGIC LƯU CÂU TRẢ LỜI ---
    // Tạo một mảng các document câu trả lời mới
    const newAnswersData = aiResponses.map((responseText, index) => ({
      content: responseText,
      question: newQuestion._id, // Liên kết với câu hỏi vừa tạo
      authorModel: populatedQuestion.selectedModels[index]._id, // Liên kết với model AI tương ứng
    }));

    // Lưu tất cả các câu trả lời mới vào collection 'answers'
    const savedAnswers = await Answer.insertMany(newAnswersData);
    const savedAnswerIds = savedAnswers.map((ans) => ans._id);

    // Tìm lại các câu trả lời bằng ID và populate thông tin của authorModel
    const populatedAnswers = await Answer.find({
      _id: { $in: savedAnswerIds },
    }).populate({
      path: "authorModel",
      select: "displayName", // Chỉ lấy trường displayName cho gọn
    });

    console.log("Đã lưu thành công các câu trả lời:", savedAnswers);
    // ------------------------------------

    return NextResponse.json(
      {
        question: populatedQuestion,
        answers: savedAnswers, // 3. Trả về các câu trả lời đã được lưu
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lỗi trong quá trình tạo và xử lý câu hỏi:", error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
