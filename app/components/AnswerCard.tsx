// component/AnswerCard.tsx

interface AnswerCardProps {
  heading: string;
  content: string;
}

export default function AnswerCard({ heading, content }: AnswerCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {heading}
      </h3>
      {/* Dùng <p> và class `whitespace-pre-wrap` 
        để giữ nguyên các định dạng xuống dòng từ AI
      */}
      <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
        {content}
      </p>
    </div>
  );
}