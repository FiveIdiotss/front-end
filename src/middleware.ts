import { NextResponse } from 'next/server';
import { auth } from './auth';

const baseUrl = process.env.HOST_URL;

export async function middleware() {
    //     const session = await auth();
    //     if (!session) {
    //         return NextResponse.redirect('http://localhost:3000/user/login');
    //     }

    const session = await auth();
    if (!session) {
        return NextResponse.redirect(`${baseUrl}/account/login?loginRequired=true`);
    }
}
export const config = {
    matcher: [
        '/user', //유저 정보 페이지
        '/user/mentoring-request', //멘토링 신청 내역
        '/user/mentoring-request-received', //멘토링 신청 받은 내역
        '/chat', //채팅
        '/post/new/mentor', //멘토링 글 작성
        '/post/new/request', //멘토링 요청 글 작성
        '/post/new/quest', //질문 글 작성
    ],
};

// export function middleware() {}
