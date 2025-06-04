'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TestPage() {
    const [testCount, setTestCount] = useState(0);
    console.log(testCount);
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold mb-8">테스트 페이지</h1>
            <div className="bg-gray-100 p-8 rounded-lg shadow-md">
                <p className="text-xl mb-4">현재 테스트 카운트: {testCount}</p>
                <button
                    onClick={() => setTestCount(prev => prev + 1)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors mr-4"
                >
                    카운트 증가
                </button>
                <button
                    onClick={() => setTestCount(0)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                    리셋
                </button>
            </div>

            <Link
                href="/"
                className="mt-8 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
                메인 페이지로 돌아가기
            </Link>
        </main>
    );
} 