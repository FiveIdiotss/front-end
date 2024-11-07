import { Metadata } from 'next';
import MentoringRequestReceived from './_component/MentoringRequestReceived';

export const metadata: Metadata = {
    title: '신청받은 멘토링',
};

function MentoringReqRecPage() {
    return <MentoringRequestReceived />;
}

export default MentoringReqRecPage;
