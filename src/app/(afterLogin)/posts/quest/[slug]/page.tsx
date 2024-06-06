import { auth } from '@/auth';
import QuestDetail from './_component/QuestDetail';

async function QuestionDetailpage({ params }: { params: { slug: string } }) {
    const boardId = Number(params.slug);
    const session = await auth();
    if (!session) return <div>세션 만료</div>;
    const memberDTO = session.user!.memberDTO;

    return <QuestDetail boardId={boardId} memberDTO={memberDTO} />;
}

export default QuestionDetailpage;
