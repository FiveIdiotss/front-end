import Image from 'next/image';
import React from 'react';
import dotLoading from '@/../public/dotLoading.gif';

function DotLoadingIcon() {
    return <Image src={dotLoading} className="h-full w-full object-cover" alt="loading" />;
}

export default DotLoadingIcon;
