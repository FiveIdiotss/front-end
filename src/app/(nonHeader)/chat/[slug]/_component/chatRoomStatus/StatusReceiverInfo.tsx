'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Axios from '@/app/util/axiosInstance';
import SchoolIcon from '@/app/_icons/common/SchoolIcon';
import Image from 'next/image';
import Loading from '@/app/_component/Loading';
import { useChatStore } from '@/app/_store/chatContentStore';
import { useRouter } from 'next/navigation';
import { useChatInfoStore } from '@/app/_store/chatInfoStore';

type ReceiverInfo = {
    member: number;
    email: string;
    name: string;
    year: number;
    gender: string;
    schoolName: string;
    majorName: string;
    memberImageUrl: string;
};

function StatusReceiverInfo() {
    const { receiverId, isLoginMentor } = useChatInfoStore();
    const router = useRouter();

    const { data: receiverInfo, isPending } = useQuery({
        queryKey: ['chat', 'room', 'receiverInfo', receiverId],
        queryFn: async () => {
            const response = await Axios(`/api/member/${receiverId}`);
            return response.data.data as ReceiverInfo;
        },
    });
    // if (!receiverId) {
    //     router.push('/chat');
    // }

    if (isPending) {
        return <Loading />;
    }
    if (!receiverInfo) {
        return <div>유저 정보가 없습니다.</div>;
    }

    return (
        <div className="flex   w-full flex-col   	   py-4 ">
            <span className="mb-4 font-semibold">{`${isLoginMentor ? '멘티 정보' : '멘토 정보'}`}</span>
            <div className=" flex w-full  flex-row items-center gap-3">
                {/* 이미지필요 */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2  text-neutral-500 ">
                    <Image
                        src={receiverInfo?.memberImageUrl}
                        alt="chat_info_avatar"
                        className=" h-full w-full rounded-full object-cover"
                        fill
                        sizes="96px"
                    />
                </div>
                <div className="flex  flex-col gap-1">
                    <span className="text-lg text-neutral-700  ">{receiverInfo.name}</span>
                </div>
            </div>
            <div className="mt-4 flex flex-row gap-2 ">
                <div className="mt-[2px] h-5 w-5">
                    <SchoolIcon />
                </div>
                <div className="flex flex-col gap-1">
                    <span className="font-">{receiverInfo.schoolName}</span>
                    <span className="text-sm text-neutral-500">
                        {receiverInfo.year}학번ㅣ{receiverInfo.majorName}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default StatusReceiverInfo;
