import { auth } from '@/auth';
import RequestDetail from './_component/RequestDetail';

async function QuestionDetailpage({ params }: { params: { slug: string } }) {
    const boardId = Number(params.slug);
    const session = await auth();
    const memberDTO = session?.user?.memberDTO;

    return <RequestDetail boardId={boardId} memberDTO={memberDTO} />;
}

export default QuestionDetailpage;
