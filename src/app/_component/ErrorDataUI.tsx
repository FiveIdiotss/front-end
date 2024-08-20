import React from 'react';

function ErrorDataUI({ text }: { text: string }) {
    return <div className="flex flex-1 items-center justify-center text-gray-300">{text}</div>;
}

export default ErrorDataUI;
