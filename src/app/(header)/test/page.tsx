import Image from 'next/image';
import React from 'react';
import favicon from '@/../public/PWA/web-app-manifest-512x512.png';
import { createAvatar } from '@dicebear/core';
import { openPeeps } from '@dicebear/collection';

function page() {
    const randomSeed = Math.random().toString(36).substring(2, 15);

    const avatar = createAvatar(openPeeps, {
        seed: randomSeed,
    });

    const avatarURL = avatar.toDataUri();
    const ogSearchParams = new URLSearchParams();
    ogSearchParams.set('title', '하이하이'); // title 키와 값이다.

    return (
        <div className="m-auto flex  flex-col justify-between overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg">
            <img
                src={`${process.env.HOST_URL || 'https://menteetor.site'}/api/og?${ogSearchParams.toString()}`}
                alt="xx"
                width={1300}
                height={630}
            />
        </div>
    );
}

export default page;
