'use client';
import React, { useEffect, useRef, useState } from 'react';
import send from '@/../public/chat/send.svg';
import Image from 'next/image';
import { Client } from '@stomp/stompjs';
import { useChatContentStore } from '@/app/_store/chatContentStore';
import ClipIcon from '@/app/_icons/common/ClipIcon';
import { Message } from '../_lib/chatContentList';
import { useChatInfoStore } from '@/app/_store/chatInfoStore';

function ChatInputForm({ roomId }: { roomId: number }) {
    const { setIsSending, setIsReceiving, setChat } = useChatContentStore();
    const { loginId, loginName } = useChatInfoStore();
    const [inputMessage, setInputMessage] = useState<string>(''); //textarea에 입력한 메시지
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [isComposing, setIsComposing] = useState(false);

    const stompClientRef = useRef<Client | null>(null); // stompClient를 위한 ref 추가

    useEffect(() => {
        if (!loginId) return;
        const connectHeader = {
            senderId: String(loginId),
            chatRoomId: String(roomId),
        };

        const initializeChat = async () => {
            const stomp = new Client({
                brokerURL: 'wss://menteetor.site/ws',

                debug: (str: string) => {
                    console.log('연결 상태', str);
                },
                reconnectDelay: 5000, //자동 재 연결
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
            });
            stompClientRef.current = stomp;
            // setStompClient(stomp);
            stomp.activate();
            stomp.onConnect = () => {
                console.log('WebSocket 연결이 열렸습니다.');
                const subscriptionDestination = `/sub/chats/${roomId}`;

                stomp.subscribe(
                    subscriptionDestination,
                    (frame) => {
                        try {
                            const parsedMessage = JSON.parse(frame.body) as Message;

                            console.log('구독함으로부터 온메시지', parsedMessage);
                            setChat(parsedMessage);
                            if (parsedMessage.senderId === loginId) {
                                setIsSending(true);
                            } else setIsReceiving(true);
                        } catch (error) {
                            console.error('오류가 발생했습니다:', error);
                        }
                    },
                    connectHeader,
                );
            };
        };
        initializeChat();

        return () => {
            console.log('컴포넌트 언마운트');
            console.log('stompClient 상태:', stompClientRef.current);

            if (stompClientRef.current && stompClientRef.current.connected) {
                console.log('연결이 해제되었습니다.');
                stompClientRef.current.deactivate();
            }
        };
    }, [loginId]); //채팅방 연결

    const sendMessage = () => {
        // 메시지 전송
        if (stompClientRef.current && stompClientRef.current.connected) {
            const destination = '/pub/hello';
            stompClientRef.current.publish({
                destination,
                body: JSON.stringify({
                    content: inputMessage, //이미지가 없거나 있을때
                    senderId: loginId,
                    chatRoomId: roomId,
                    senderName: loginName,
                }),
            });
            console.log('메시지 전송', inputMessage);
        }
        setInputMessage('');
        textareaRef.current?.focus();
    };
    const handleCompositionStart = () => {
        setIsComposing(true);
    };

    const handleCompositionEnd = () => {
        setIsComposing(false);
    };
    const enterSendMessage = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (isComposing) return;

        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const openUploadInPopup = () => {
        const width = 600;
        const height = window.screen.height * 0.47;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;

        window.open(
            `/chat/fileUpload?id=${roomId}`,
            'Upload',
            `height=${height}, width=${width}, top=${top}, left=${left} ,resizable=yes`,
        );
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = '1.5rem';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [inputMessage]); //textarea의 높이를 자동으로 조절 최대 5줄까지 가능
    return (
        <>
            <div className="mt-1 flex h-full w-full flex-row  items-center border-y bg-white ">
                <textarea
                    className=" chatScroll  flex flex-grow  resize-none items-center overflow-auto  px-2 py-3 outline-none"
                    value={inputMessage}
                    ref={textareaRef}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => enterSendMessage(e)}
                    style={{ lineHeight: '1.5em', maxHeight: '7.5em' }}
                    placeholder=" 메시지를 입력하세요."
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={handleCompositionEnd}
                />
                <div className="flex h-full flex-row items-end gap-1">
                    <button
                        onClick={openUploadInPopup}
                        type="button"
                        className="flex h-full min-h-12 items-end px-2     pl-3 hover:bg-gray-100"
                    >
                        <div className="flex h-12 items-center ">
                            <ClipIcon className="h-6 w-6 text-neutral-600" />
                        </div>
                    </button>

                    <button
                        onClick={sendMessage}
                        type="button"
                        className="flex h-full min-h-12 items-end   bg-indigo-100  px-2 pl-3"
                    >
                        <div className="flex h-12 items-center ">
                            <Image
                                src={send}
                                alt="send"
                                width={24}
                                height={24}
                                className="cursor-pointer hover:scale-105"
                            />
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
}

export default ChatInputForm;
