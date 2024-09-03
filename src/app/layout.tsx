import type { Metadata } from 'next';
import { Inter, Noto_Sans_KR, Jua, Montserrat } from 'next/font/google';
import './globals.css';
import AuthSession from './_component/AuthSession';
import RQProviders from './(afterLogin)/_component/RQProvider';
import { Toaster } from 'react-hot-toast';

// const inter = Noto_Sans_KR({ subsets: ['latin'] });
const inter = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: '멘티토',
    description: '멘토링을 위한 플랫폼',
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
