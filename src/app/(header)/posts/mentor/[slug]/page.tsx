import dayjs from 'dayjs';
import { htmlToText } from 'html-to-text';
import React, { useEffect } from 'react';
import { getMentorDetail } from '../../_lib/mentorService';
import MentorDetail from './_component/MentorDetail';

export async function generateMetadata({ params }: { params: { slug: string } }) {
    try {
        const boardData = await getMentorDetail(Number(params.slug));
        const writeTime = dayjs(boardData.boardDTO.writeTime);
        const formattedTime = writeTime.format('YYYY.MM.DD');
        const text = htmlToText(boardData.boardDTO.content);
        const trimmedText = text.length > 160 ? text.substring(0, 157) + '...' : text;

        return {
            title: { absolute: boardData.boardDTO.title + ' -  멘티토 | 멘토링' },
            description: formattedTime + ' - ' + trimmedText,

            openGraph: {
                title: boardData.boardDTO.title + ' -  멘티토 | 멘토링',
                description: formattedTime + ' - ' + trimmedText,
                type: 'article',
                article: {
                    publishedTime: writeTime.toISOString(),
                    modifiedTime: writeTime.toISOString(),
                },
            },
        };
    } catch (error) {
        console.error('Error fetching subBoard data:', error);
        // 기본값 반환 또는 에러 메타데이터 반환
        return {
            title: { absolute: '멘티토 | 멘토링' },
            description: '게시물 정보를 불러오는 데 오류가 발생했습니다.',
        };
    }
}

function MentorDetailPage({ params }: { params: { slug: string } }) {
    const boardId = Number(params.slug);
    return <MentorDetail id={boardId} />;
}

export default MentorDetailPage;
