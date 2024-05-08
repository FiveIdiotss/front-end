'use client';
import BackButton from '@/app/(beforeLogin)/_component/BackButton';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
    open: boolean;
    onClose?: () => void;
    children: React.ReactNode;
    width?: string;
    height?: string;
    className?: string;
    modalBackground?: string; //모달 배경색 변경
    title?: string;
    backButtonColor?: 'white' | 'black';
};
function NonStandardModal({ open, onClose, children, className, modalBackground, title, backButtonColor }: ModalProps) {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    if (!open || !isBrowser) return null;
    return ReactDOM.createPortal(
        <>
            <div
                className={`fixed  left-0  top-0   z-[2000] flex h-dvh w-dvw items-center justify-center  ${modalBackground ? modalBackground : 'bg-black bg-opacity-85'}`}
                onClick={onClose}
            >
                <div
                    className={` animate-slide-up bottom-1/2 top-1/2    flex flex-col  ${className} `}
                    //mobile반응형 필수, 넓이는 꼭 className으로 받아서 조절해야함
                    onClick={(e) => e.stopPropagation()}
                >
                    <header className="flex w-full flex-shrink-0 flex-row items-center">
                        <div className="flex flex-row items-center">{title}</div>
                        <div className="flex flex-grow flex-row justify-end">
                            <BackButton
                                onClose={onClose}
                                className={`p-[2px] ${backButtonColor ? ' text-neutral-800' : 'text-white'} hover:text-red-600`}
                            />
                        </div>
                    </header>
                    {children}
                </div>
            </div>
        </>,
        document.getElementById('modal-root') as HTMLElement,
    );
}

export default NonStandardModal;
