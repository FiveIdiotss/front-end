import { useRouter } from 'next/navigation';
import React from 'react';
import { pageHistoryStore } from '../_store/postsStore';
import BackButton from '@/app/(beforeLogin)/_component/BackButton';
import { usePathname } from 'next/navigation';
type ModalWrapperProps = {
    children: React.ReactNode;
    className?: string;
    title: string;
    subTitle?: string;

    onClose?: () => void;
    closeUrl?: string;
};

function ModalWrapper({ children, className, title, subTitle, onClose, closeUrl }: ModalWrapperProps) {
    const router = useRouter();
    const pathName = usePathname();

    const backHandler = () => {
        if (onClose) {
            onClose();
        } else if (closeUrl) {
            router.push(closeUrl);
        } else {
            const handlePopState = () => {
                router.replace('/posts/mentor');
                window.removeEventListener('popstate', handlePopState);
            };

            window.addEventListener('popstate', handlePopState);
            window.history.back();
        }
    };
    return (
        <div
            className="fixed bottom-0 left-0 right-0 top-0 z-[2000] flex h-full  w-screen items-center justify-center bg-modal"
            onClick={backHandler}
        >
            <div
                className={`animate-slide-up  fixed bottom-0 left-0 h-full  max-h-[850px] w-full sm:relative sm:max-h-[750px] sm:max-w-[540px] `}
                onClick={(e) => e.stopPropagation()}
            >
                <section className="flex h-full w-full flex-col rounded-xl  bg-white  p-7 shadow-xl">
                    {/* 헤더 */}
                    <header className="flex h-10 w-full flex-shrink-0 flex-row items-center  ">
                        <div className="flex flex-row items-center">
                            <span className="text-lg  font-semibold tracking-wide ">{title}</span>
                            {subTitle && (
                                <span className="ml-2 text-sm font-semibold text-neutral-400">{subTitle}</span>
                            )}
                        </div>
                        <div className="flex flex-grow flex-row justify-end">
                            <BackButton onClose={backHandler} />
                        </div>
                    </header>
                    {children}
                </section>
            </div>
        </div>
    );
}

export default ModalWrapper;
