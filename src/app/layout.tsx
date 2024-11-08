import type { Metadata } from 'next';
import { Inter, Noto_Sans_KR, Jua, Montserrat } from 'next/font/google';
import './globals.css';
import AuthSession from './_component/AuthSession';
import RQProviders from './_component/RQProvider';
import { Toaster } from 'react-hot-toast';

// const inter = Noto_Sans_KR({ subsets: ['latin'] });
const inter = Montserrat({ subsets: ['latin'] });
export const metadata: Metadata = {
    manifest: '/manifest.json',
    icons: [
        {
            rel: 'icon',
            url: '/favicon.ico',
        },
        { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
    ],
    title: {
        template: '%s - 멘티토 | 멘토링을 위한 플랫폼',
        default: '멘티토 - 멘토링을 위한 플랫폼',
        //absolute: "", // 절대적인 타이틀
    },
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
