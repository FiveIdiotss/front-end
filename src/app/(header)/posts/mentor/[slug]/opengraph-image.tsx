import { ImageResponse } from 'next/og'; // 2. ImageResponse를 import한다.
import { getMentorDetail } from '../../_lib/mentorService';
import { createAvatar } from '@dicebear/core';
import { notionists } from '@dicebear/collection';
import { htmlToText } from 'html-to-text';

export const alt = 'About Acme';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
    // 3. params 값을 받아온다. (url의 detail/ 이하 문구)
    const boardData = await getMentorDetail(Number(params.slug));
    const avatar = createAvatar(notionists, {
        seed: params.slug,
        radius: 10,
    });

    const svg = avatar.toString(); // SVG 문자열을 가져옴

    // SVG를 Base64로 변환
    const base64 = Buffer.from(svg).toString('base64');
    const avatarURL = `data:image/svg+xml;base64,${base64}`; // Data URI 생성

    const imageUrl = `${process.env.HOST_URL || 'https://menteetor.site'}/PWA/web-app-manifest-512x512.png`;
    const truncatedContent = htmlToText(boardData.boardDTO.content, {}).slice(0, 75); // 첫 75자를 자르기
    const content =
        truncatedContent.length === htmlToText(boardData.boardDTO.content, {}).length
            ? truncatedContent
            : truncatedContent + '...';
    const truncatedTitle = boardData.boardDTO.title.slice(0, 40); // 첫 30자를 자르기
    const title = truncatedTitle.length === boardData.boardDTO.title.length ? truncatedTitle : truncatedTitle + '...';

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
                            멘토링
                        </div>
                        <div
                            style={{
                                fontSize: '28px',
                                color: '#ffffff',
                            }}
                        >
                            {boardData.boardDTO.boardCategory}
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
                                {`${boardData.boardDTO.majorName} | ${boardData.boardDTO.year.toString().slice(-2)}학번`}
                            </span>
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
                        <p
                            style={{ marginTop: '16px', fontSize: '26px', color: '#ffffff' }}
                        >{`@${boardData.boardDTO.memberName}`}</p>
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
                                color: '#ffffff',
                                marginBottom: '3px',
                                overflow: 'hidden',
                                maxWidth: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {title}
                        </div>
                        <p
                            style={{
                                fontSize: '33px',
                                color: '#ffffff',
                                lineHeight: '1.4',
                            }}
                        >
                            {content}
                        </p>
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        },
    );
}
