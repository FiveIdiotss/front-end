import { auth } from '@/auth';
import RequestDetail from './_component/RequestDetail';
import Axios from '@/app/util/axiosInstance';
import { SubBoardDetailType } from '@/app/Models/subBoardType';
import dayjs from 'dayjs';
import { htmlToText } from 'html-to-text'; // require 대신 import 사용

export async function generateMetadata({ params }: { params: { slug: string } }) {
    try {
        const response = await Axios.get(`/api/subBoard/${params.slug}`);
        const boardData: SubBoardDetailType = response.data.data;
        const writeTime = dayjs(boardData.subBoardDTO.writeTime);
        const formattedTime = writeTime.format('YYYY.MM.DD');
        const text = htmlToText(boardData.subBoardDTO.content, {
            selectors: [
                { selector: 'img', format: 'skip' },
                { selector: 'a', format: 'skip' },
                { selector: 'iframe', format: 'skip' },
            ],
        });
        const trimmedText = text.length > 160 ? text.substring(0, 157) + '...' : text;

        return {
            title: { absolute: boardData.subBoardDTO.title + ' -  멘티토 | 멘토 찾기' },
            description: formattedTime + ' - ' + trimmedText,
            openGraph: {
                title: { absolute: boardData.subBoardDTO.title + ' - 멘티토 | 멘토 찾기' },
                description: formattedTime + ' - ' + trimmedText,
                type: 'website',
                url: `${process.env.HOST_URL}/posts/request/${params.slug}`, // URL 추가
            },
        };
    } catch (error) {
        console.error('Error fetching subBoard data:', error);
        // 기본값 반환 또는 에러 메타데이터 반환
        return {
            title: { absolute: '멘티토 | 멘토 찾기' },
            description: '게시물 정보를 불러오는 데 오류가 발생했습니다.',
        };
    }
}

async function QuestionDetailpage({ params }: { params: { slug: string } }) {
    const boardId = Number(params.slug);
    const session = await auth();
    const memberDTO = session?.user?.memberDTO;

    return <RequestDetail boardId={boardId} memberDTO={memberDTO} />;
}

export default QuestionDetailpage;
