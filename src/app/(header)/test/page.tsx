import Image from 'next/image';
import React from 'react';
import favicon from '@/../public/PWA/web-app-manifest-512x512.png';
import { createAvatar } from '@dicebear/core';
import { openPeeps } from '@dicebear/collection';

function page() {
    const randomSeed = Math.random().toString(36).substring(2, 15);

    const avatar = createAvatar(openPeeps, {
        seed: randomSeed,
        radius: 10,
    });

    const avatarURL = avatar.toDataUri();

    return (
        <div className="m-auto flex h-[630px] w-[1300px] flex-col justify-between overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg">
            {/* Header Section */}
            <div className="flex w-full items-center bg-gradient-to-r from-purple-100 to-blue-100 px-8 py-6 shadow-sm">
                <Image
                    src={favicon}
                    alt="열역학"
                    width={80}
                    height={80}
                    className="rounded-md border border-gray-200 shadow-sm"
                />
                <div className="ml-6">
                    <span className="block text-4xl font-bold tracking-tight text-gray-900">자유 질문</span>
                    <p className="mt-2 text-lg text-gray-600">이공계</p>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="flex w-full flex-grow items-center justify-between bg-gradient-to-br from-purple-50 to-blue-50 px-12 py-8">
                <div className="flex flex-col items-center justify-center">
                    <Image src={avatarURL} alt="랜덤 아바타" width={120} height={120} />
                    <p className="mt-4 text-lg text-gray-500">@김동연</p>
                </div>
                <div className="ml-12 flex flex-1 flex-col justify-center">
                    <span className="line-clamp- mb-6 text-4xl font-extrabold text-primary">Q. 열역학 질문입니다.</span>
                    <p className="line-clamp-3 text-2xl font-medium leading-relaxed text-gray-800">
                        열역학 제 1법칙 에너지보존 법칙에서 뇌터 정리에 대해 정확히 알고싶습니다!! 열역학 제 1법칙
                        에너지보존 법칙에서 뇌터 정리에 대해 정확히 알고싶습니다!! 열역학 제 1법칙 에너지보존 법칙에서
                        뇌터 정리에 대해 정확히 알고싶습니다!!
                    </p>
                </div>
            </div>

            {/* Footer Section */}
            <div className="flex w-full items-center justify-center bg-gray-100 px-6 py-4">
                <span className=" text-gray-500">
                    © 2024 Menteetor. 열역학과 관련된 질문과 답변을 여기에서 확인하세요.
                </span>
            </div>
        </div>
    );
}

export default page;
