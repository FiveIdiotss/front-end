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
    ogSearchParams.set('title', '열 역학 질문입니다'); // title 키와 값이다.
    ogSearchParams.set('content', '열역학 제 1법칙 에너지보존 법칙에서 뇌터 정리에 대해 정확히 알고싶습니다!!'); // description 키와 값이다.
    ogSearchParams.set('category', '이공계'); // image 키와 값이다
    ogSearchParams.set('name', '정진혁'); // image 키와 값이다
    ogSearchParams.set('replyCount', '3'); // image 키와 값이다

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
