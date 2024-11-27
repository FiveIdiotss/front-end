import { ImageResponse } from 'next/og'; // 2. ImageResponse를 import한다.
import { getSubBoardDetail } from '../../_lib/qeustOrRequestService';
// import favicon from '@/../public/PWA/web-app-manifest-512x512.png';
// import { createAvatar } from '@dicebear/core';
// import { openPeeps } from '@dicebear/collection';

export const alt = 'About Acme';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
    // 3. params 값을 받아온다. (url의 detail/ 이하 문구)
    const boardData = await getSubBoardDetail(Number(params.slug)); // 4. 해당 게시글의 데이터를 가져온다.

    // const avatar = createAvatar(openPeeps, {
    //     seed: params.slug,
    //     radius: 10,
    // });

    // const avatarURL = avatar.toDataUri(); // 5. 랜덤 아바타를 생성한다.
    // const logoSrc = await fetch('/logo.png').then((res) => res.arrayBuffer());

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'white',
                    fontFamily: 'Arial, sans-serif',
                    overflow: 'hidden',
                }}
            >
                {/* Header Section */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: 'linear-gradient(to right, #e9d5ff, #bfdbfe)',
                        padding: '20px 40px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    {/* <img
                        src={favicon.src}
                        alt="열역학"
                        width={80}
                        height={80}
                        style={{
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                        }}
                    /> */}
                    <div style={{ marginLeft: '16px' }}>
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
                            {boardData?.subBoardDTO.boardCategory}
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
                                {boardData?.subBoardDTO.replyCount}
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
                        <p style={{ marginTop: '16px', fontSize: '16px', color: '#6b7280' }}>
                            @{boardData?.subBoardDTO.memberName}
                        </p>
                    </div>
                    <div style={{ marginLeft: '40px', flex: 1 }}>
                        <div
                            style={{
                                fontSize: '33px',
                                fontWeight: 'bold',
                                color: '#7963d9',
                                marginBottom: '10px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                maxWidth: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            Q. {boardData?.subBoardDTO.title}
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
                            {boardData?.subBoardDTO.content}
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
        {
            ...size,
        },
    );
}
