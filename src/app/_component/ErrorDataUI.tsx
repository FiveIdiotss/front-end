import React from 'react';
import RefreshIcon from '../_icons/common/RefreshIcon';

function ErrorDataUI({ text, className, onReset }: { text: string; className?: string; onReset?: () => void }) {
    return (
        <div
            className={`mx-auto my-auto flex flex-col items-center justify-center gap-1 text-sm text-gray-400 ${className}`}
        >
            <span>{text}</span>
            {Boolean(onReset) && (
                <button
                    onClick={onReset}
                    className="0 my-2 flex w-28 flex-row items-center justify-center gap-2 rounded-md bg-gray-400 py-2 font-normal text-white"
                >
                    새로고침
                    <RefreshIcon className="h-4 w-4 text-white" />
                </button>
            )}
        </div>
    );
}

export default ErrorDataUI;
