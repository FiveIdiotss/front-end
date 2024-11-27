import { ImageResponse } from 'next/og'; // 2. ImageResponse를 import한다.
import { getSubBoardDetail } from '../../_lib/qeustOrRequestService';
import favicon from '@/../public/PWA/web-app-manifest-512x512.png';
import { createAvatar } from '@dicebear/core';
import { openPeeps } from '@dicebear/collection';
import NextImage from 'next/image';

export const alt = 'About Acme';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
    // 3. params 값을 받아온다. (url의 detail/ 이하 문구)
    const boardData = await getSubBoardDetail(Number(params.slug)); // 4. 해당 게시글의 데이터를 가져온다.
    const randomSeed = Math.random().toString(36).substring(2, 15);

    const avatar = createAvatar(openPeeps, {
        seed: randomSeed,
        radius: 10,
    });

    const avatarURL = avatar.toDataUri(); // 5. 랜덤 아바타를 생성한다.

    return new ImageResponse(
        (
            <div className="flex h-full w-full flex-col justify-between  bg-white shadow-lg">
                {/* Header Section */}
                <div className="flex w-full items-center bg-gradient-to-r from-purple-100 to-blue-100 px-8 py-6 shadow-sm">
                    <NextImage
                        src={favicon}
                        alt="열역학"
                        width={80}
                        height={80}
                        className="rounded-md border border-gray-200 shadow-sm"
                    />
                    <div className="ml-6">
                        <span className="block text-4xl font-bold tracking-tight text-gray-900">자유 질문</span>
                        <p className="mt-2 text-lg text-gray-600">{boardData?.subBoardDTO?.boardCategory}</p>
                    </div>
                </div>

                {/* Main Content Section */}
                <div className="flex w-full flex-grow items-center justify-between bg-gradient-to-br from-purple-50 to-blue-50 px-12 py-8">
                    <div className="flex flex-col items-center justify-center">
                        <NextImage src={avatarURL} alt="랜덤 아바타" width={120} height={120} />
                        <p className="mt-4 text-lg text-gray-500">@{boardData?.subBoardDTO.memberName}</p>
                    </div>
                    <div className="ml-12 flex flex-1 flex-col justify-center">
                        <span className="line-clamp- mb-6 text-4xl font-extrabold text-primary">
                            Q. {boardData?.subBoardDTO.title}
                        </span>
                        <p className="line-clamp-3 text-2xl font-medium leading-relaxed text-gray-800">
                            {boardData?.subBoardDTO.content}
                        </p>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="flex w-full items-center justify-center bg-gray-100 px-6 py-4">
                    <span className=" text-gray-500">
                        © 2024 Menteeto. 해당게시물과 관련된 질문과 답변을 여기에서 확인하세요.
                    </span>
                </div>
            </div>
        ),
        {
            ...size,
        },
    );
}
