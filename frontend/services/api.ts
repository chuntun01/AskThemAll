const API_BASE = 'http://localhost:3001/api';

export const askQuestion = async (question: string) => {
  const res = await fetch(`${API_BASE}/ask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ question })
  });

  return res.json();
};
