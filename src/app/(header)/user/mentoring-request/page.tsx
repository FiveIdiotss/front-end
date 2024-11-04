import { Metadata } from 'next';
import MentoringRequest from './_component/MentoringRequest';

export const metadata: Metadata = {
    title: '신청한 멘토링',
};

export default function MentoringReqPage() {
    return <MentoringRequest />;
}
