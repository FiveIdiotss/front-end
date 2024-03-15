'use client';
import React, { use } from 'react';
import Image from 'next/image';
import { useChatStore } from '../../_store/chatStore';
import { ChatUsers } from './ChatList';
type Props = {
    user: ChatUsers;
};

function ChatListCard(props: Props) {
    const { user } = props;
    const { setUserInformation } = useChatStore();
    const { receiverId } = useChatStore();
    const onClickChat = () => {
        setUserInformation(user);
    };

    return (
        <div
            key={user.receiverId}
            className={`flex h-20 w-full shrink-0 cursor-pointer  items-center pl-4 hover:bg-neutral-100 ${user.receiverId === receiverId && 'border-l-4 border-primary bg-neutral-100'} `}
            onClick={onClickChat}
        >
            <Image
                src={user.receiverAvatar}
                alt="avatar"
                className=" rounded-full object-cover"
                width={45}
                height={45}
            />
            <div className="ml-3 flex  flex-col  ">
                <span className="">{user.receiverName}</span>
                <span className="text-sm font-light text-neutral-600">1:1 대화내용</span>
            </div>
        </div>
    );
}

export default ChatListCard;
