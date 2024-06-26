import Loading from '@/app/_component/Loading';
import React from 'react';

type SubmitButtonProps = {
    cancelUrl: string;
    onSubmit: () => void;
    isLoading: boolean;
};
function SubmitButton({ cancelUrl, onSubmit, isLoading }: SubmitButtonProps) {
    return (
        <div className="shadow-sm-top fixed bottom-0 left-0  flex w-full flex-row justify-center gap-4 bg-gray-50 py-2 ">
            <div className="flex w-full max-w-[800px] flex-row justify-end gap-5 px-7">
                <button className="h-11 w-20 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-600 ">
                    취소
                </button>
                <button
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
