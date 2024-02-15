import { useRouter } from 'next/navigation';
import React from 'react';
type ModalWrapperProps = {
    children: React.ReactNode;
    className?: string;
};

function ModalWrapper({ children, className }: ModalWrapperProps) {
    const router = useRouter();
    const backHandler = () => {
        router.back();
    };
    return (
        <div
            className="fixed bottom-0 left-0 right-0 top-0 z-10 flex h-full w-screen items-center justify-center bg-modal"
            onClick={backHandler}
        >
            <div
                className={`animate-slide-up  relative h-full w-full ${className} `}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}

export default ModalWrapper;
