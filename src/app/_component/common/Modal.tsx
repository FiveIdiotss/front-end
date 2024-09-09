'use client';
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
};
function Modal({ open, onClose, children, className, modalBackground }: ModalProps) {
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
        <>
            <div
                className={`fixed bottom-0 left-0 right-0 top-0  z-[2000] flex h-full w-full items-center justify-center  ${modalBackground ? modalBackground : 'bg-modal'}`}
                onClick={onClose}
            >
                <div
                    className={` animate-slide-up bottom-1/2  top-1/2  h-full w-full   ${className} `}
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        </>,
        document.getElementById('modal-root') as HTMLElement,
    );
}

export default Modal;
