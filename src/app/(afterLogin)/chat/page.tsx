import ChatList from './_component/ChatList';
import ChatRoom from './_component/ChatRoom';
import Axios from '@/app/util/axiosInstance';
export async function getChatList() {
    try {
        let params = {
            boardType: 'MENTEE',
            page: 1,
            size: 16,
        };
        const res = await Axios.get('/api/boards', { params });
        return res.data;
    } catch (err) {
        throw new Error('Error occured while fetching posts.');
    }
}

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
