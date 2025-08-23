import Image from 'next/image';

// Định nghĩa kiểu cho props
type ResponseProps = {
  responses: string[];
};

const ResponseComponent = ({ responses }: ResponseProps) => {
  // Tạo một mảng các tiêu đề để lặp qua
  const titles = ["Phương án 1", "Phương án 2", "Phương án 3"];

  return (
    <div className="flex items-start gap-4">
      <div className="w-full">
        {/* Thêm flex-wrap để các ô tự động xuống dòng khi không đủ chỗ */}
        <div className="flex w-full flex-wrap gap-4">
          {titles.map((title, index) => (
            // Sử dụng width để mỗi ô chiếm 1/3 không gian và có khoảng cách
            // w-full trên mobile để mỗi ô chiếm trọn 1 dòng
            <div
              key={index}
              className="flex-1 rounded-xl border border-gray-700 bg-gray-800/50 p-4 transition-colors hover:bg-gray-800/80 w-full max-w-8xl md:w-[calc(33.3333%-1rem)]"
            >
              <h4 className="mb-2 font-semibold text-gray-100">{title}</h4>
              <p className="text-sm leading-relaxed text-gray-200 break-words">
                {responses[index] || `Nội dung cho jkadhjkjhdlkjldkjkdjljdlklkakjakjwjpiuiwouoiqjdiegufhskdnƠIHAEFOINK${title}.CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC..`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResponseComponent;