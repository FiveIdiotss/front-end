import ArrowLeftBackIcon from '@/app/_icons/common/ArrowLeftBackIcon';
import CloseIcon from '@/app/_icons/common/CloseIcon';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type ModalWrapperProps = {
    children: React.ReactNode;
    title?: string;
    onClose?: () => void;
};

function SideBarContainer({ children, title, onClose }: ModalWrapperProps) {
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
            onClick={onClose}
            className="fixed bottom-0 left-0 right-0 top-0 z-[2000] flex h-dvh w-screen justify-end bg-gray-800 bg-modal bg-opacity-40"
        >
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className={`animate-slide-left flex  w-full max-w-80 flex-col scroll-smooth border-x border-t bg-white`}
            >
                <header className="flex w-full flex-row justify-between p-4 ">
                    <div className="ml-7 flex flex-grow justify-center font-medium">
                        <span className="text-lg font-semibold ">{title}</span>
                    </div>
                    <button onClick={onClose}>
                        <ArrowLeftBackIcon className="h-6 w-6 rotate-180 text-gray-500" />
                    </button>
                </header>
                <div className="h-full w-full overflow-y-auto">{children}</div>
            </div>
        </div>,
        document.getElementById('modal-root') as HTMLElement,
    );
}

export default SideBarContainer;
