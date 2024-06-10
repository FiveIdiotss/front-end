import React from 'react';

function NoDataMessage({ text }: { text: string }) {
    return <div className="flex flex-1 items-center justify-center text-neutral-400">{text}</div>;
}

export default NoDataMessage;
