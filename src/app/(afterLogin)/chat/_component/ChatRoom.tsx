'use client';
import React from 'react';
import emoticon from '@/../public/chat/emoticon.svg';
import file from '@/../public/chat/file.svg';
import capture from '@/../public/chat/capture.svg';
import send from '@/../public/chat/send.svg';
import Image from 'next/image';
import { faker } from '@faker-js/faker';
import ChatRoomContent from './ChatRoomContent';
import { useChatStore } from '../../_store/chatStore';

function ChatContent() {
    const { receiverId, receiverAvatar, receiverName } = useChatStore();
    return (
        <div className=" flex flex-1 flex-col ">
            {/* 대화중인 상대 유저정보 상단바 */}
            <div className="flex h-14 w-full flex-row items-center p-3">
                <div>
                    <Image
                        src={receiverAvatar}
                        alt="avatar"
                        className=" rounded-full object-cover"
                        width={45}
                        height={45}
                    />
                </div>
                <span className="ml-2 font-semibold">{receiverName}</span>
            </div>
            {/* 채팅내용 */}
            <div className="flex-grow overflow-y-scroll ">
                <ChatRoomContent />
            </div>
            {/* 채팅입력창 */}
            <div className="flex h-fit w-full flex-col ">
                <textarea
                    className=" w-full resize-none overflow-auto border-y p-3 outline-none"
                    style={{ lineHeight: '1.5em', maxHeight: '4.5em' }}
                    placeholder=" 메시지를 입력하세요."
                />
                <div className="flex h-16 flex-row justify-between px-2">
                    <div className="flex h-full flex-row items-center gap-2">
                        <Image
                            src={emoticon}
                            alt="emoticon"
                            width={30}
                            height={30}
                            className="cursor-pointer hover:rotate-12 hover:scale-105"
                        />
                        <Image
                            src={file}
                            alt="file"
                            width={30}
                            height={30}
                            className="cursor-pointer hover:rotate-12 hover:scale-105"
                        />
                        <Image
                            src={capture}
                            alt="capture"
                            width={30}
                            height={30}
                            className="cursor-pointer hover:rotate-12 hover:scale-105"
                        />
                    </div>
                    <div className="flex h-full items-center">
                        <Image
                            src={send}
                            alt="send"
                            width={30}
                            height={30}
                            className="cursor-pointer hover:scale-105"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatContent;
