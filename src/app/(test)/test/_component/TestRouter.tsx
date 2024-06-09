'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

function TestRouter() {
    const router = useRouter();
    const handleButtonClick = () => {
        console.log('버튼 클릭');
        router.push(
            `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=XoCaaL5SJMdVa4oJxBcD&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2FtestLogin&state=9e7830g6oeu2qp6p2lau1c139s`,
        );
    };

    return (
        <button className="rounded-md bg-blue-500 px-4 py-2 text-white" onClick={handleButtonClick}>
            버튼
        </button>
    );
}

export default TestRouter;
