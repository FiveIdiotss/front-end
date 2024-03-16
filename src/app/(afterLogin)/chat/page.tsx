import ChatList from './_component/ChatList';
import ChatRoom from './_component/ChatRoom';
import Axios from '@/app/util/axiosInstance';

function page() {
    return (
        <div className="  flex h-full w-full flex-row  border-x bg-white">
            {/* 유저의 채팅방 목록 */}
            <ChatList />

            {/* 선택된 채팅내용 */}
            <ChatRoom />
        </div>
    );
}

export default page;
