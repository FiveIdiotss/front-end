import React from 'react';

function ErrorDataUI({ text, className }: { text: string; className?: string }) {
    return <div className={`flex w-full items-center justify-center text-gray-300 ${className}`}>{text}</div>;
}

export default ErrorDataUI;
