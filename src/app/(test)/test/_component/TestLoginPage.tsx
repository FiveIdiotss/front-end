'use client';
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Router from 'next/router';

function TestLoginPage() {
    const searchParams = useSearchParams();
    const codeParam = searchParams.get('code');
    const router = useRouter();
    useEffect(() => {
        console.log('서버전송');
        // if (codeParam) {
        //     router.push('/home');
        // }
    }, [codeParam]);
    return (
        <div>
            <div>소셜로그인 페이지</div>
            <div>code: {codeParam}</div>
        </div>
    );
}

export default TestLoginPage;
