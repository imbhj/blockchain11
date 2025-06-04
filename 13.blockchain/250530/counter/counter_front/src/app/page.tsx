'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchCount();
  }, []);

  const fetchCount = async () => {
    try {
      const response = await axios.get('http://localhost:3001/counter');
      setCount(response.data.value);
    } catch (error) {
      console.error('카운터 값을 가져오는데 실패했습니다:', error);
    }
  };

  const handleIncrement = async () => {
    try {
      const response = await axios.post('http://localhost:3001/counter/increment');
      setCount(response.data.value);
    } catch (error) {
      console.error('증가 요청 실패:', error);
    }
  };

  const handleDecrement = async () => {
    try {
      const response = await axios.post('http://localhost:3001/counter/decrement');
      setCount(response.data.value);
    } catch (error) {
      console.error('감소 요청 실패:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-4xl font-bold mb-8">{count}</div>
      <div className="flex gap-4 mb-8">
        <button
          onClick={handleDecrement}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          -
        </button>
        <button
          onClick={handleIncrement}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          +
        </button>
      </div>

      <Link
        href="/test"
        className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        테스트 페이지로 이동
      </Link>
    </main>
  );
}
