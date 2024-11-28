import { thumbs } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { htmlToText } from 'html-to-text';
import { ImageResponse } from 'next/og';

export async function GET(req) {
    const avatar = createAvatar(thumbs, {
        seed: Math.random().toString(36).substring(2, 15),
        radius: 10,
    });

    const svg = avatar.toString(); // SVG 문자열을 가져옴

    // SVG를 Base64로 변환
    const base64 = Buffer.from(svg).toString('base64');
    const avatarURL = `data:image/svg+xml;base64,${base64}`; // Data URI 생성
    const imageUrl = `${process.env.HOST_URL || 'https://menteetor.site'}/PWA/web-app-manifest-512x512.png`;

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
                            alt="열역학"
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
                                자유 질문
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
                                    {replyCount}
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
                            <p style={{ marginTop: '16px', fontSize: '26px', color: '#ffffff' }}>@정진혁</p>
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
                                    fontSize: '40px',
                                    fontWeight: 'bold',
                                    color: '#ffffff',
                                    marginBottom: '3px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    maxWidth: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {`Q. ${title}`}
                            </div>
                            <p
                                style={{
                                    fontSize: '33px',
                                    color: '#ffffff',
                                    lineHeight: '1.5',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                }}
                            >
                                {content}
                            </p>
                        </div>
                    </div>

                    {/* Footer Section */}
                    {/* <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#f3f4f6',
                            padding: '20px',
                        }}
                    >
                        <span style={{ fontSize: '17px', color: '#232eee' }}>
                            © 2024 Menteeto. 해당 게시글과 관련된 질문과 답변을 여기에서 확인하세요.
                        </span>
                    </div> */}
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
