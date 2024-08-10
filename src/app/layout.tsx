import type { Metadata } from 'next';
import { Inter, Noto_Sans_KR, Jua, Montserrat } from 'next/font/google';
import './globals.css';
import AuthSession from './_component/AuthSession';
import RQProviders from './(afterLogin)/_component/RQProvider';
import { Toaster } from 'react-hot-toast';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import FallbackUI from './_component/FallbackUI';

// const inter = Noto_Sans_KR({ subsets: ['latin'] });
const inter = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {/* QueryErrorResetBoundary 컴포넌트를 사용하여 쿼리 에러를 재설정합니다. */}
                <QueryErrorResetBoundary>
                    {({ reset }) => (
                        /* ErrorBoundary 컴포넌트를 사용하여 에러가 발생했을 때 에러를 처리합니다. */
                        /* onReset prop에 reset 함수를 전달하여 에러가 발생했을 때 reset 함수를 실행합니다. */
                        /* FallbackComponent prop에 FallbackUI 컴포넌트를 전달하여 에러가 발생했을 때 보여줄 UI를 설정합니다. */
                        <ErrorBoundary onReset={reset} FallbackComponent={FallbackUI}>
                            <AuthSession>
                                <RQProviders>
                                    <Toaster />
                                    {children}
                                </RQProviders>
                            </AuthSession>

                            <div id="modal-root" />
                        </ErrorBoundary>
                    )}
                </QueryErrorResetBoundary>
            </body>
        </html>
    );
}
