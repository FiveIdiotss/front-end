'use client';
import React, { useEffect, useRef, useState } from 'react';
import send from '@/../public/chat/send.svg';
import Image from 'next/image';
import { Client } from '@stomp/stompjs';
import { MemberDto } from '@/auth';
import { useChatStore } from '@/app/(afterLogin)/_store/chatStore';
import ClipIcon from '@/app/(afterLogin)/_component/icon/ClipIcon';
import { Message } from '../_lib/chatContentList';

function ChatInputForm({ roomId }: { roomId: number }) {
    const { loginId, loginName, setIsSending, setIsReceiving, setChat } = useChatStore();
    const [inputMessage, setInputMessage] = useState<string>(''); //textarea에 입력한 메시지
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [isComposing, setIsComposing] = useState(false);

    const stompClientRef = useRef<Client | null>(null); // stompClient를 위한 ref 추가

    useEffect(() => {
        const connectHeader = {
            senderId: String(loginId),
            chatRoomId: String(roomId),
        };

        const initializeChat = async () => {
            const stomp = new Client({
                brokerURL: 'ws://menteetor.site:8080/ws',

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
    }, [roomId]);

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
            <div className="mt-1 flex h-full w-full flex-row  items-center border-y bg-white py-2 ">
                <textarea
                    className=" chatScroll  flex flex-grow  resize-none items-center overflow-auto  px-2 py-2 outline-none"
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
                    <button onClick={openUploadInPopup} className="flex h-[40px] items-center">
                        <ClipIcon className="h-6 w-6 text-neutral-600" />
                    </button>
                    <button onClick={sendMessage} className="flex h-[40px] items-center  px-3">
                        <Image
                            src={send}
                            alt="send"
                            width={26}
                            height={26}
                            className="cursor-pointer hover:scale-105"
                        />
                    </button>
                </div>
            </div>
        </>
    );
}

export default ChatInputForm;
