'use client';
import React, { useRef, useState } from 'react';
import { useChatStore } from '../../_store/chatStore';
import Image from 'next/image';

import { getSession, useSession } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
// const addContent = async (content: string) => {
//     try {
//         const response = await axios.post('https://your-api-url.com/add-content', { content });
//         console.log('Content added successfully:', response.data);
//         return response;
//     } catch (error) {
//         console.error('Failed to add content:', error);
//         throw error;
//     }
// };

function ChatRoomContent() {
    const { receiverAvatar, receiverId, receiverName, chatRoomId } = useChatStore();
    // const { data: session } = useSession();

    // const feedAddMutation = useMutation({
    //     mutationFn: addContent,
    //     onSuccess: (response) => {
    //         client.current.send();
    //     },
    // });

    if (receiverId === -1) {
        return <div className="h-full w-full   text-center">대화를 선택해주세요</div>;
    }

    return (
        <div className="flex h-full w-full flex-col ">
            {/* 상대방과의 채팅내용 */}
            <div className="flex flex-row gap-1 px-4 py-3">
                <div>
                    <Image
                        src={receiverAvatar}
                        alt="avatar"
                        className="rounded-2xl object-cover"
                        width={40}
                        height={40}
                    />
                </div>
                <div className="flex w-full flex-col items-start justify-center gap-1  ">
                    <span className="font-sans text-xs font-medium ">{receiverName}</span>
                    <div className="flex flex-row gap-1 ">
                        <span className="flex rounded-r-xl rounded-bl-xl  bg-neutral-200 px-3 py-2 text-center font-sans text-sm">
                            안녕하세요!
                        </span>
                        <div className="flex h-full  flex-col items-start justify-end ">
                            <span className="font-sans text-xs font-normal">오전12:17</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 내가 보낸 채팅내용 */}
            <div className="flex w-full flex-row  justify-end gap-1 px-4 py-3">
                <div className="flex h-full  flex-col items-end justify-end ">
                    <span className=" text-xs font-normal text-primary">1</span>
                    <span className="font-sans text-xs font-normal">오전12:17</span>
                </div>
                <span className=" flex   rounded-l-xl rounded-br-xl bg-primary px-3 py-3 text-center font-sans text-sm text-white">
                    그래 안녕이다....
                </span>
            </div>
        </div>
    );
}

export default ChatRoomContent;
