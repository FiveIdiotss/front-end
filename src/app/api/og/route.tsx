import { lorelei } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { htmlToText } from 'html-to-text';
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const avatar = createAvatar(lorelei, {
        seed: Math.random().toString(36).substring(2, 15),
        radius: 10,
    });

    const svg = avatar.toString(); // SVG 문자열을 가져옴

    // SVG를 Base64로 변환
    const base64 = Buffer.from(svg).toString('base64');
    const avatarURL = `data:image/svg+xml;base64,${base64}`; // Data URI 생성
    const imageUrl = `${process.env.HOST_URL || 'https://menteetor.site'}/PWA/web-app-manifest-512x512.png`;

    const htmlContent = `
  <p><br></p>
  <p>이산수학 관련 모든 질문 답변해드립니다.
  <img src="https://www.booksr.co.kr/wp-content/uploads/2022/01/bookcover_img92.jpg" alt="이산수학 (개정판)">
  <a href="https://example.com">링크</a>
  <iframe src="https://www.youtube.com"></iframe>
  </p>
`;
    const truncatedContent = htmlToText(htmlContent, {
        selectors: [
            { selector: 'img', format: 'skip' },
            { selector: 'a', format: 'skip' },
            { selector: 'iframe', format: 'skip' },
        ],
    }).slice(0, 75); // 첫 75자를 자르기
    try {
        const { searchParams } = req.nextUrl;
        const title = searchParams.get('title');
        const content = searchParams.get('content');
        const category = searchParams.get('category');
        const name = searchParams.get('name');
        const replyCount = searchParams.get('replyCount');

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
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'white',
                        fontFamily: 'Arial, sans-serif',
                        backgroundImage: `
    radial-gradient(circle at 15px 15px, #ffffff 1%, rgba(255, 255, 255, 0) 3%), 
    radial-gradient(circle at 45px 45px, #ffffff 0.5%, rgba(255, 255, 255, 0) 3%), 
    linear-gradient(to right, #7b2cbf, #4c8bf5)
  `,
                        backgroundSize: '60px 60px, 60px 60px, 100% 100%',
                        backgroundRepeat: 'repeat, repeat, no-repeat',
                    }}
                >
                    {/* Header Section */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            margin: '60px 60px 0 60px',
                            borderBottom: '1px solid #ffffff',
                            paddingBottom: '20px',
                        }}
                    >
                        <img
                            src={imageUrl}
                            alt="Acme Logo"
                            width={85}
                            height={85}
                            style={{
                                borderRadius: '20px',
                            }}
                        />
                        <div style={{ marginLeft: '16px', display: 'flex', flexDirection: 'column' }}>
                            <div
                                style={{
                                    fontSize: '35px',
                                    fontWeight: 'bold',
                                    color: '#ffffff',
                                }}
                            >
                                멘토 찾기
                            </div>
                            <div
                                style={{
                                    fontSize: '28px',
                                    color: '#ffffff',
                                }}
                            >
                                {category}
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 'auto',
                            }}
                        >
                            <span
                                style={{
                                    fontSize: '30px',
                                    color: '#ffffff',
                                    fontWeight: 'bold',
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: '30px',
                                        color: '#ffffff',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {`1`}
                                </span>
                                개의 답변
                            </span>
                        </div>
                    </div>

                    {/* Main Content Section */}
                    <div
                        style={{
                            display: 'flex',
                            flex: 1,
                            padding: '40px 80px',

                            alignItems: 'center', // Y축 기준 중앙 정렬 추가
                            justifyContent: 'center', // 수평 중앙 정렬
                            gap: '20px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <img src={avatarURL} alt="랜덤 아바타" width={120} height={120} />
                            <p style={{ marginTop: '16px', fontSize: '26px', color: '#ffffff' }}>{`@${name}`}</p>
                        </div>
                        <div
                            style={{
                                marginLeft: '40px',
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                            }}
                        >
                            <div
                                style={{
                                    fontSize: '44px',
                                    fontWeight: 'bold',
                                    marginBottom: '3px',
                                    overflow: 'hidden',
                                    maxWidth: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: '#ffffff',
                                }}
                            >
                                {`이산수학 과목 제대로 알려드립니다.이산수학 과목 제대로 알려드립니다.`}
                            </div>
                            <p
                                style={{
                                    fontSize: '33px',
                                    color: '#ffffff',
                                    lineHeight: '1.4',
                                }}
                            >
                                {truncatedContent}
                            </p>
                        </div>
                    </div>
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
