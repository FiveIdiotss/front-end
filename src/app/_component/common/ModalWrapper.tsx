import React, { useEffect, useState } from 'react';
import BackButton from '@/app/(header)/account/_component/BackButton';
import ReactDOM from 'react-dom';
import ShareIcon from '@/app/_icons/common/ShareIcon';
import ShareBoxIcon from '@/app/_icons/common/ShareBoxIcon';

type ModalWrapperProps = {
    children: React.ReactNode;
    className?: string;
    title: string;
    subTitle?: string;

    onClose?: () => void;
    closeUrl?: string;
    shareUrl?: string;
};

function ModalWrapper({ children, className, shareUrl, title, subTitle, onClose, closeUrl }: ModalWrapperProps) {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    useEffect(() => {
        // 모달이 열릴 때 body 스크롤을 막음
        const scrollY = window.scrollY;
        document.body.style.overflow = 'hidden'; // 스크롤 차단
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';

        // 모달이 닫힐 때 스크롤 복원
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo(0, scrollY); // 스크롤 위치 복원
        };
    }, []); // 모달이 열릴 때만 실행

    if (!open || !isBrowser) return null;

    return ReactDOM.createPortal(
        <div
            className="fixed bottom-0 left-0  right-0 top-0 z-[2000] flex h-dvh  w-dvw items-center justify-center bg-modal"
            onClick={onClose}
        >
            <div
                className={`animate-slide-up  fixed bottom-0 left-0 h-full  max-h-[850px] w-full mobile:relative mobile:max-h-[750px] mobile:max-w-[540px] `}
                onClick={(e) => e.stopPropagation()}
            >
                <section className="flex h-full w-full flex-col bg-white  p-5  shadow-xl  mobile:rounded-xl mobile:p-7">
                    {/* 헤더 */}
                    <header className="flex h-10 w-full flex-shrink-0 flex-row items-center  ">
                        <div className="flex flex-row items-center">
                            <span className="text-lg  font-semibold tracking-wide ">{title}</span>
                            {subTitle && (
                                <span className="ml-2 text-sm font-semibold text-neutral-400">{subTitle}</span>
                            )}
                        </div>
                        <div className="flex flex-grow flex-row items-center justify-end gap-3">
                            {/* {Boolean(shareUrl) && (
                                <button className="flex items-center justify-center gap-1 rounded-md p-1 text-gray-600 underline">
                                    공유하기
                                </button>
                            )} */}
                            <BackButton onClose={onClose} />
                        </div>
                    </header>
                    {children}
                </section>
            </div>
        </div>,
        document.getElementById('modal-root') as HTMLElement,
    );
}

export default ModalWrapper;
