import { auth } from '@/auth';
import ChatList from './_component/ChatList';
import Header from '@/app/_component/layout/Header';
import MobileNav from '@/app/_component/layout/moblieNav/MobileNav';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '채팅 목록',
};

async function page() {
    const session = await auth();

    return (
        <div className="flex  w-full  flex-col">
            {/* <div className="flex  w-full  flex-col   pb-16 pt-[62px] mobile:pb-0  "> */}
            {/* <Header borderClassName="border-b" /> */}

            <ChatList session={session} />
            {/* <MobileNav isSigin={Boolean(session)} /> */}
        </div>
    );
}

export default page;
