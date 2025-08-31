// component/AnswerDisplay.tsx
import AnswerCard from "./AnswerCard";

interface AIModel {
  _id: string;
  modelId: string;
  displayName: string;
}

interface Answer {
  _id: string;
  content: string;
  // Sửa lại kiểu dữ liệu của authorModel để khớp với dữ liệu thực tế
  authorModel: string; // Đây là một chuỗi ID
}

interface AnswerDisplayProps {
  isLoading: boolean;
  answers: Answer[];
  selectedModels: AIModel[];
  error: string | null;
  submittedQuestion: string;
}

export default function AnswerDisplay({
  isLoading,
  answers = [],
  selectedModels = [],
  error,
}: AnswerDisplayProps) {
  // Phần logic và các câu lệnh if... ở trên không thay đổi

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[120px]">
        <div className="animate-pulse text-blue-400 text-lg">
          Đang xử lý câu trả lời...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[120px]">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  if (!Array.isArray(selectedModels) || selectedModels.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[280px]">
        <div className="text-gray-800 text-center">
          Chào mừng bạn đến với Ask Them All!
          <br />
          Vui lòng chọn một AI model để bắt đầu.
        </div>
      </div>
    );
  }

  const safeAnswers = Array.isArray(answers) ? answers : [];

  const getAnswerForModel = (model: AIModel) => {
    return safeAnswers.find((ans) => ans.authorModel === model._id);
  };
  return (
    // BƯỚC 2: Thay đổi className để sử dụng Flexbox theo chiều dọc
    <div className="flex flex-col gap-4 items-center w-full max-w-8xl mx-auto">
      {selectedModels.map((model) => {
        const answer = getAnswerForModel(model);
        return (
          // Thêm w-full để mỗi card chiếm toàn bộ chiều rộng của container
          <div key={model._id} className="w-full">
            <AnswerCard
              heading={
                answer
                  ? `Phương án từ ${model.displayName}`
                  : `Sẵn sàng nhận câu trả lời từ ${model.displayName}`
              }
              content={answer ? answer.content : "Hỏi tôi bất cứ điều gì!"}
            />
          </div>
        );
      })}
    </div>
  );
}
