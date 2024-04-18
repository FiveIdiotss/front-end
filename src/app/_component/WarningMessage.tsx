'use client';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import warning_red from '@/../public/warning_red.png';
import styles from './WarningMessage.module.css';
type Props = {
    text: string;
    isOpen: boolean;
    onClose: () => void;
};

function WarningMessage({ text, isOpen, onClose }: Props) {
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                onClose();
            }, 1500); // 1초 후에 모달을 숨깁니다.
        }
    }, [isOpen]);

    return (
        <div
            className={`absolute bottom-20 left-1/2 flex h-14 w-4/5 -translate-x-1/2 flex-row items-center justify-center gap-2 rounded-md border border-black bg-yellow-200 shadow-lg ${isOpen ? 'transition-all duration-200 ease-in-out ' : ''} ${isOpen ? `opacity-100` : 'overflow-hidden border-none opacity-0'}`}
        >
            <Image src={warning_red} width={20} height={20} alt="warning" />
            <span className="font-semibold text-red-500">{text}</span>
        </div>
    );
}

export default WarningMessage;
