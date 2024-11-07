import { Metadata } from 'next';
import LoginModal from '../_component/LoginModal';

export const metadata: Metadata = {
    title: '로그인',
};

export default function Home() {
    return (
        <>
            <LoginModal />
        </>
    );
}
