import React, { useEffect, useState } from 'react';
import BackButton from '@/app/(beforeLogin)/_component/BackButton';
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
