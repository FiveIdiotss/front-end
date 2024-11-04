import { Metadata } from 'next';
import SignupModal from '../../../account/_component/SignupModal';
export const metadata: Metadata = {
    title: '회원가입',
};

export default function Home() {
    return <SignupModal />;
}
