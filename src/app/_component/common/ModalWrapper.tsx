import React, { useEffect, useState } from 'react';
import BackButton from '@/app/(header)/account/_component/BackButton';
import ReactDOM from 'react-dom';

type ModalWrapperProps = {
    children: React.ReactNode;
    className?: string;
    title: string;
    subTitle?: string;

    onClose?: () => void;
    closeUrl?: string;
};

function ModalWrapper({ children, className, title, subTitle, onClose, closeUrl }: ModalWrapperProps) {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);
    useEffect(() => {
        // 모달이 열릴 때 body의 overflow를 hidden으로 설정
        document.body.style.overflow = 'hidden';

        // cleanup 함수를 통해 모달이 닫히거나 컴포넌트가 언마운트될 때 overflow를 복원
        return () => {
            document.body.style.overflow = '';
        };
    }, []); // 빈 배열을 의존성 배열로 제공하여 컴포넌트 마운트 시 한 번만 실행되도록 함

    if (!open || !isBrowser) return null;

    return ReactDOM.createPortal(
        <div
            className="fixed bottom-0 left-0 right-0 top-0 z-[2000] flex h-full  w-screen items-center justify-center bg-modal"
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
                        <div className="flex flex-grow flex-row justify-end">
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
