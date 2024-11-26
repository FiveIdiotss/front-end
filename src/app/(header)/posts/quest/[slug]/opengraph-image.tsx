import { ImageResponse } from 'next/og'; // 2. ImageResponse를 import한다.
import { getSubBoardDetail } from '../../_lib/qeustOrRequestService';

export const alt = 'About Acme';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
    // 3. params 값을 받아온다. (url의 detail/ 이하 문구)
    const boardData = await getSubBoardDetail(Number(params.slug));

    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 48,
                    background: '#6554bd',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                }}
            >
                {boardData.subBoardDTO.title}
            </div>
        ),
        {
            ...size,
        },
    );
}
