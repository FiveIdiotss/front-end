import { ImageResponse } from 'next/og'; // 2. ImageResponse를 import한다.
import { getMentorDetail } from '../../_lib/mentorService';

export const runtime = 'edge';
export const alt = 'About image';
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
    // 3. params 값을 받아온다. (url의 detail/ 이하 문구)
    const boardData = await getMentorDetail(Number(params.slug));

    return new ImageResponse(
        (
            <div
                className={`flex h-full w-full items-center justify-center text-2xl font-bold text-white ${
                    boardData.boardImageUrls[0] ? 'bg-transparent' : 'bg-[#6554bd]'
                }`}
                style={{
                    backgroundImage: boardData.boardImageUrls[0]
                        ? `url(${boardData.boardImageUrls[0].boardImageUrl})`
                        : 'none', // 이미지가 없으면 배경 이미지를 사용하지 않음
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                {boardData.boardDTO.title}
            </div>
        ),
        {
            width: 1200,
            height: 630,
        },
    );
}
