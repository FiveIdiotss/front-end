import { auth } from '@/auth';
import QuestDetail from './_component/QuestDetail';

async function QuestionDetailpage({ params }: { params: { slug: string } }) {
    const boardId = Number(params.slug);
    const session = await auth();
    const memberDTO = session?.user?.memberDTO;

    return <QuestDetail boardId={boardId} memberDTO={memberDTO} />;
}

export default QuestionDetailpage;
