import Loading from '@/app/_component/Loading';
import { useRouter } from 'next/navigation';
import React from 'react';

type SubmitButtonProps = {
    cancelUrl?: string;
    onSubmit?: () => void;
    isLoading: boolean;
    type?: 'submit' | 'button';
};
function SubmitButton({ cancelUrl, onSubmit, isLoading, type = 'button' }: SubmitButtonProps) {
    const router = useRouter();
    return (
        <div className="fixed bottom-0 left-0 z-[4] flex  w-full flex-row justify-center gap-4 bg-gray-50 py-2 shadow-sm-top ">
            <div className="flex w-full max-w-[800px] flex-row justify-end gap-5 px-4">
                <button
                    onClick={() => router.back()}
                    className="h-11 w-20 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-600 "
                >
                    취소
                </button>
                <button
                    type={type}
                    className={`h-11 w-24 rounded-md bg-green-500 text-white hover:opacity-80 ${isLoading ? 'hidden' : ''}`}
                    onClick={onSubmit}
                >
                    작성하기
                </button>
                <button
                    className={`h-11  w-20 rounded-md bg-primary text-white hover:opacity-80 ${isLoading ? '' : 'hidden'}`}
                >
                    <Loading />
                </button>
            </div>
        </div>
    );
}

export default SubmitButton;
