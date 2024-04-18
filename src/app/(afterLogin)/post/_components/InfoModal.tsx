'use client';
import React, { useEffect, useState } from 'react';
import Modal from '../../_component/Modal';
import checkBox from '@/../public/checkBox.png';
import info from '@/../public/info.png';
import Image from 'next/image';
type InfoModalProps = {
    open: boolean;
    text: string;
    onClose: () => void;
};

function InfoModal({ open, onClose, text }: InfoModalProps) {
    const [seconds, setSeconds] = useState(3);

    useEffect(() => {
        if (open && seconds > 0) {
            const timerId = setTimeout(() => {
                setSeconds(seconds - 1);
            }, 1000);
            return () => clearTimeout(timerId); // cleanup on unmount
        } else if (seconds === 0) {
            onClose();
        }
    }, [open, seconds, onClose]);

    return (
        <Modal open={open} className="max-h-[250px]  max-w-[400px]" modalBackground="bg-black bg-opacity-20">
            <div className="bg flex h-full w-full flex-col  rounded-lg border border-black bg-white">
                <div className="flex flex-row items-center justify-start p-1">
                    <Image src={info} alt="info" className="h-8 w-8" />
                </div>
                <div className="mb-3 flex flex-grow flex-col items-center justify-center gap-7">
                    <div className="flex  flex-row items-center gap-2">
                        <Image src={checkBox} alt="check" className="h-10 w-10" />
                        <span className="text-xl font-medium">등록이 완료되었습니다.</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-sm text-neutral-600">{text}</span>
                        <span className="text-sm text-neutral-500  ">{seconds}</span>
                        {/* 3초뒤 게시판으로 이동 */}
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default InfoModal;
