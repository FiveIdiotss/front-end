import type { Metadata } from 'next';
import { Inter, Noto_Sans_KR, Jua, Montserrat } from 'next/font/google';
import './globals.css';
import AuthSession from './_component/AuthSession';
import RQProviders from './_component/RQProvider';
import { Toaster } from 'react-hot-toast';

// const inter = Noto_Sans_KR({ subsets: ['latin'] });
const inter = Montserrat({ subsets: ['latin'] });
export const metadata: Metadata = {
    icons: {
        icon: '/favicon.png', // 파비콘 경로ㄴ
        shortcut: '/favicon.png', // 바로가기 아이콘 경로
        apple: '/favicon.png', // 애플 터치 아이콘 경로
    },
    title: '멘티토 - 멘토링을 위한 플랫폼',
    description:
        '지식을 나누는 새로운 세상. 온라인 멘토링 매칭을 통해 지식을 나누세요! 우리대학 선배, 후배도 찾아보세요!',
    keywords: '멘토링, 멘토링 플랫폼, 멘티토, 멘토, 멘토링 매칭, 온라인 멘토링',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthSession>
                    <RQProviders>
                        <Toaster />
                        {children}
                    </RQProviders>
                </AuthSession>
                <div id="modal-root" />
            </body>
        </html>
    );
}
