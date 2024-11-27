import { openPeeps } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
export const runtime = 'edge'; // edge 런타임을 사용해야한다.

export async function GET(req: NextRequest) {
    // const avatar = createAvatar(openPeeps, {
    //     seed: Math.random().toString(36).substring(2, 15),
    //     radius: 10,
    // });

    // const svg = avatar.toString(); // SVG 데이터를 문자열로 가져옵니다.

    // const base64 = Buffer.from(svg).toString('base64'); // Base64로 변환
    // const avatarURL = `data:image/svg+xml;base64,${base64}`; // Data URI 생성
    const imageUrl = `${process.env.HOST_URL || 'https://menteetor.site'}/PWA/web-app-manifest-512x512.png`;

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
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'white',
                        fontFamily: 'Arial, sans-serif',
                    }}
                >
                    {/* Header Section */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: 'linear-gradient(to right, #e9d5ff, #bfdbfe)',
                            padding: '20px 30px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <img
                            src={imageUrl}
                            alt="열역학"
                            width={80}
                            height={80}
                            style={{
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                            }}
                        />
                        <div style={{ marginLeft: '16px', display: 'flex', flexDirection: 'column' }}>
                            <div
                                style={{
                                    fontSize: '32px',
                                    fontWeight: 'bold',
                                    color: '#1f2937',
                                }}
                            >
                                자유 질문
                            </div>
                            <div
                                style={{
                                    fontSize: '18px',
                                    color: '#4b5563',
                                }}
                            >
                                이공계
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
                                    fontSize: '18px',
                                    color: '#4b5563',
                                    fontWeight: 'bold',
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: '18px',
                                        color: '#1c22d4',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    1
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
                            background: 'linear-gradient(to bottom right, #f3e8ff, #dbeafe)',
                            alignItems: 'center', // Y축 기준 중앙 정렬 추가
                            justifyContent: 'center', // 수평 중앙 정렬
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
                            {/* <img
                                src={avatarURL}
                                alt="랜덤 아바타"
                                width={120}
                                height={120}
                                style={{ borderRadius: '50%' }}
                            /> */}
                            <p style={{ marginTop: '16px', fontSize: '19px', color: '#6b7280' }}>@정진혁</p>
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
                                    fontSize: '33px',
                                    fontWeight: 'bold',
                                    color: '#7963d9',
                                    marginBottom: '3px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    maxWidth: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                Q. 열 역학 질문입니다
                            </div>
                            <p
                                style={{
                                    fontSize: '25px',
                                    color: '#374151',
                                    lineHeight: '1.5',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                }}
                            >
                                열역학 제 1법칙 에너지보존 법칙에서 뇌터 정리에 대해 정확히 알고싶습니다!!
                            </p>
                        </div>
                    </div>

                    {/* Footer Section */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#f3f4f6',
                            padding: '20px',
                        }}
                    >
                        <span style={{ fontSize: '17px', color: '#9ca3af' }}>
                            © 2024 Menteeto. 해당 게시글과 관련된 질문과 답변을 여기에서 확인하세요.
                        </span>
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
