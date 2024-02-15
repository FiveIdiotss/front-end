'use client';
import React from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    width?: string;
    height?: string;
};
function Modal({ open, onClose, children, height = `500px`, width = `300px` }: ModalProps) {
    if (!open) return null;
    return ReactDOM.createPortal(
        <>
            <div
                className="fixed bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center bg-modal"
                onClick={onClose}
            >
                <div
                    className={` animate-slide-up bottom-1/2  top-1/2  h-full max-h-[400px] w-full max-w-[300px] bg-white `}
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
