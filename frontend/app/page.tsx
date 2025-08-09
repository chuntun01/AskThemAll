'use client';

import { useState } from 'react';
import { askQuestion } from '@/services/api';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState<any[]>([]);
  

  const handleAsk = async () => {
    if (!question.trim()) return;
    const data = await askQuestion(question);
    setAnswers(data.answers);
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AskThemAll</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border border-gray-300 p-2 rounded w-full"
          type="text"
          placeholder="Nhập câu hỏi..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          onClick={handleAsk}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Hỏi
        </button>
      </div>

      {answers.length > 0 && (
        <ul className="space-y-3">
          {answers.map((ans, i) => (
            <li key={i} className="border p-4 rounded shadow">
              <strong>{ans.ai_name}</strong>: {ans.answer_text}{' '}
              <span className="text-sm text-gray-500">({ans.response_time_ms} ms)</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
