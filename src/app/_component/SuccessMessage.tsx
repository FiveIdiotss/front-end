'use client';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import warning_red from '@/../public/warning_red.png';
import SuccessCheckIcon from '../_icons/common/SuccessCheckIcon';
type Props = {
    text: string;
    isOpen: boolean;
    onClose: () => void;
};

function SuccessMessage({ text, isOpen, onClose }: Props) {
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                onClose();
            }, 1500); // 1초 후에 모달을 숨깁니다.
        }
    }, [isOpen]);

    return (
        <div
            className={`absolute bottom-20 left-1/2 flex h-14 w-4/5 -translate-x-1/2 flex-row items-center justify-center gap-2 rounded-md border border-black bg-green-200 shadow-lg ${isOpen ? 'transition-all duration-200 ease-in-out ' : ''} ${isOpen ? `opacity-100` : 'overflow-hidden border-none opacity-0'}`}
        >
            <SuccessCheckIcon className="h-6 w-6 text-green-500" />
            <span className="font-semibold text-green-500">{text}</span>
        </div>
    );
}

export default SuccessMessage;
