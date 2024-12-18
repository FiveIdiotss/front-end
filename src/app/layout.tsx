import type { Metadata } from 'next';
import { Inter, Noto_Sans_KR, Quicksand, Nanum_Gothic, Poiret_One } from 'next/font/google';

import './globals.css';
// import 'swiper/css/autoplay'; // autoplay 기능을 사용하는 경우
// import 'swiper/css';
// import 'swiper/css/pagination'; // Pagination 스타일
import AuthSession from './_component/AuthSession';
import RQProviders from './_component/RQProvider';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import Script from 'next/script';

const quicksand = Quicksand({ subsets: ['latin'] });

export const metadata: Metadata = {
    metadataBase: new URL(process.env.HOST_URL || 'http://localhost:3000'),
    manifest: '/manifest.json',
    icons: [
        {
            rel: 'icon',
            url: '/favicon.ico',
        },
        { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
    ],

    openGraph: {
        title: {
            template: '%s - 멘티토 | 멘토링을 위한 플랫폼',
            default: '멘티토 - 멘토링을 위한 플랫폼',
        },
        description:
            '지식을 나누는 새로운 세상. 온라인 멘토링 매칭을 통해 지식을 나누세요! 우리대학 선배, 후배도 찾아보세요! ',
        url: process.env.HOST_URL,
        type: 'website',
        locale: 'ko_KR',
        siteName: '멘티토',
        images: [
            {
                url: `${process.env.HOST_URL}/logo/og-image.png`,
                width: 800,
                height: 600,
                alt: '멘티토 - 멘토링을 위한 플랫폼',
            },
        ],
    },

    title: {
        template: '%s - 멘티토 | 멘토링을 위한 플랫폼',
        default: '멘티토 - 멘토링을 위한 플랫폼',
        //absolute: "", // 절대적인 타이틀
    },
    description:
        '지식을 나누는 새로운 세상. 온라인 멘토링 매칭을 통해 지식을 나누세요! 우리대학 선배, 후배도 찾아보세요!',
    keywords: '멘토링, 멘토링 플랫폼, 멘티토, 멘토, 멘토링 매칭, 온라인 멘토링',
    verification: {
        google: 'M9cbMdaFe5M1rYTo3h82zlVaG9RJlaebPt3OVbQi-Go', //구글 검색엔진 등록
    },
    other: {
        'naver-site-verification': '10b0a140d1a3624d6b2b82a899be418dfaedc8ed',
    }, //네이버 검색엔진 등록
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
            </head>
            <body className={quicksand.className}>
                <AuthSession>
                    <RQProviders>
                        <Toaster />
                        {children}
                    </RQProviders>
                </AuthSession>
                <div id="modal-root" />
                <Script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" />
            </body>
        </html>
    );
}
