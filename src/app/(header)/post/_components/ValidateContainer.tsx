import React from 'react';

interface Props {
    children: React.ReactNode;
    error?: string | string[];
    className?: string;
}

function ValidateContainer({ children, error, className }: Props) {
    return (
        <div className={`flex w-full flex-col ${className}`}>
            {children}
            <span className={`${error ? '' : 'hidden'} text-xs  text-red-400`}>{error}</span>
        </div>
    );
}

export default ValidateContainer;
