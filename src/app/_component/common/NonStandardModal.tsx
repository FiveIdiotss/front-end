'use client';
import BackButton from '@/app/(header)/account/_component/BackButton';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
    onClose?: () => void;
    children: React.ReactNode;
    width?: string;
    height?: string;
    className?: string;
    modalBackground?: string; //모달 배경색 변경
    title?: string;
    titleClassName?: string;
    backButtonTheme?: 'white' | 'black';
    isHeader?: boolean;
};
function NonStandardModal({
    onClose,
    children,
    className,
    modalBackground,
    title,
    backButtonTheme,
    titleClassName,
    isHeader = true,
}: ModalProps) {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);
    useEffect(() => {
        if (!open) return;
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
        <>
            <div
                className={`fixed  left-0  top-0   z-[2000] flex h-dvh w-dvw items-center justify-center  ${modalBackground ? modalBackground : 'bg-black bg-opacity-85'}`}
                onClick={onClose}
            >
                <div
                    className={` animate-slide-up bottom-1/2 top-1/2   flex  flex-col  ${className} `}
                    //mobile반응형 필수, 넓이는 꼭 className으로 받아서 조절해야함
                    onClick={(e) => e.stopPropagation()}
                >
                    {isHeader && (
                        <header className="flex w-full flex-shrink-0 flex-row items-center  ">
                            <div className={`flex flex-row items-center ${titleClassName ? titleClassName : ''}`}>
                                {title}
                            </div>
                            <div className="flex flex-grow flex-row justify-end">
                                <BackButton
                                    onClose={onClose}
                                    className={`p-[2px] ${backButtonTheme ? 'text-neutral-800' : 'text-white'} hover:text-red-600`}
                                />
                            </div>
                        </header>
                    )}
                    {children}
                </div>
            </div>
        </>,
        document.getElementById('modal-root') as HTMLElement,
    );
}

export default NonStandardModal;
