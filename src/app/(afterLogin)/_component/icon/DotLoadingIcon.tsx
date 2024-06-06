import Image from 'next/image';
import React from 'react';
import dotLoading from '@/../public/dotLoading.gif';

function DotLoadingIcon() {
    return (
        <div className="  flex  h-full w-full items-center justify-center">
            <Image src={dotLoading} className="h-full max-h-2 w-full max-w-20  object-cover" alt="loading" />
        </div>
    );
}

export default DotLoadingIcon;
