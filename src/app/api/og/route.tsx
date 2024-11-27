import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = req.nextUrl;
        const title = searchParams.get('title');

        if (!title) {
            return new Response('title', {
                status: 400,
            });
        }

        return new ImageResponse(
            (
                // 여기 부분은 원하는 디자인을 하면 됩니다. svg를 추가해서 아이콘도 가능!
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'white',
                    }}
                >
                    <h2>{title}</h2>
                </div>
            ),
            // 여기는 ImageResponse의 옵션입니다. 옵션에대해서는 공식문서 참고!
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (error) {
        return new Response('이미지 만들기 실패', { status: 500 });
    }
}
