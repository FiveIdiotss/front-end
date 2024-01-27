'use client';
import AddBtn from '../_component/homePage/addBtn';
import { useSession } from 'next-auth/react';

export default function Home() {
    const { data: session, status } = useSession();
    console.log('세션정보', session);

    if (status === 'loading') {
        return <p>Loading...</p>;
    }
    if (status === 'unauthenticated') {
        return <p>로그인이 필요합니다.</p>;
    }
    return (
        // wrapper
        <div className="flex h-screen flex-col items-center py-10 pt-10">
            {/* search */}
            <div className="">검색 bar</div>
            {/* category */}
            <span className=" pt-10 font-semibold">카테고리</span>
            <div className="flex gap-5 pt-5">
                <div className="bg-red-500">category 1</div>
                <div className="bg-blue-500">category 2</div>
                <div className="bg-yellow-500">category 3</div>
            </div>
            <span className=" pt-10 font-semibold">멘토 글</span>
            <div className="flex gap-5 pt-5">
                <div className="bg-red-500">category 1</div>
                <div className="bg-blue-500">category 2</div>
                <div className="bg-yellow-500">category 3</div>
            </div>
            <span className=" pt-10 font-semibold">멘티 글</span>
            <div className="flex gap-5 pt-5">
                <div className="bg-red-500">category 1</div>
                <div className="bg-blue-500">category 2</div>
                <div className="bg-yellow-500">category 3</div>
            </div>
        </div>
    );
}

// {/* 편집 & 추가 버튼 */}
// <AddBtn />
