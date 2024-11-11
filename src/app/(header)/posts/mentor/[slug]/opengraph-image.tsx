import { ImageResponse } from 'next/og'; // 2. ImageResponse를 import한다.
import { getMentorDetail } from '../../_lib/mentorService';

export default async function Image({ params }: { params: { slug: string } }) {
    // 3. params 값을 받아온다. (url의 detail/ 이하 문구)
    const boardData = await getMentorDetail(Number(params.slug));

    return new ImageResponse(
        (
            <div
                style={{
                    backgroundImage: boardData.boardImageUrls[0]
                        ? `url(${boardData.boardImageUrls[0].boardImageUrl})`
                        : 'none', // 이미지가 없으면 배경 이미지를 사용하지 않음
                    backgroundColor: boardData.boardImageUrls[0] ? 'transparent' : '#6554bd', // 이미지가 없으면 기본 배경색을 지정
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: 'bold',
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
