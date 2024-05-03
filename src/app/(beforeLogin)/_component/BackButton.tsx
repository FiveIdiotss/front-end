'use client';
import { useRouter } from 'next/navigation';

export default function BackButton({ onClose, className }: { onClose?: () => void; className?: string }) {
    const router = useRouter();
    const onclick = () => {
        if (onClose) onClose();
        else router.back();
    };
    return (
        <button onClick={onclick} className="flex  h-8 w-8 items-center justify-center rounded-full ">
            <svg className={className} width={24} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                <g>
                    <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                </g>
            </svg>
        </button>
    );
}
