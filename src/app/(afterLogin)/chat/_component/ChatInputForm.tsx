import React, { useEffect, useRef, useState } from 'react';
import emoticon from '@/../public/chat/emoticon.svg';
import file from '@/../public/chat/file.svg';
import capture from '@/../public/chat/capture.svg';
import send from '@/../public/chat/send.svg';
import Image from 'next/image';
import { Client } from '@stomp/stompjs';
import { Stomp } from '@stomp/stompjs';
import { useChatStore } from '../../_store/chatStore';
import { useSession } from 'next-auth/react';
import io from 'socket.io-client';

function ChatInputForm() {
    const [msgList, setMsgList] = useState<any[]>([]); //Zustand로 돌릴것
    const [inputMessage, setInputMessage] = useState<string>('');
    const { chatRoomId } = useChatStore();
    const { data: session } = useSession();
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [nowId, setNowId] = useState<number>(-1);
    const senderId = session?.user?.memberDTO.id;

    // const stompClient = useRef<Stomp | null>(null);
    useEffect(() => {
        if (nowId === chatRoomId) return;
        const initializeChat = async () => {
            const stomp = new Client({
                brokerURL: 'ws://menteetor.site:8080/ws',

                debug: (str: string) => {
                    console.log(str);
                },
                reconnectDelay: 5000, //자동 재 연결
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
            });
            setStompClient(stomp);
            stomp.activate();
            stomp.onConnect = () => {
                console.log('WebSocket 연결이 열렸습니다.');
                const subscriptionDestination = `/sub/chats/web`;

                stomp.subscribe(subscriptionDestination, (frame) => {
                    try {
                        const parsedMessage = JSON.parse(frame.body);

                        console.log(parsedMessage);
                        setMsgList((prevMessages) => [...prevMessages, parsedMessage]);
                    } catch (error) {
                        console.error('오류가 발생했습니다:', error);
                    }
                });
            };
        };
        initializeChat();
        setNowId(chatRoomId);

        return () => {
            if (stompClient && stompClient.connected) {
                stompClient.deactivate();
            }
        };
    }, [chatRoomId]);

    const sendMessage = () => {
        // 메시지 전송
        if (stompClient && stompClient.connected) {
            const destination = '/pub/hello';

            stompClient.publish({
                destination,
                body: JSON.stringify({
                    content: inputMessage,
                    senderId: senderId,
                    roomId: chatRoomId,
                }),
            });
            console.log('메시지 전송', inputMessage);
        }

        setInputMessage('');
    };
    return (
        <>
            <textarea
                className=" w-full resize-none overflow-auto border-y p-3 outline-none"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
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
                    <button onClick={sendMessage}>
                        <Image
                            src={send}
                            alt="send"
                            width={30}
                            height={30}
                            className="cursor-pointer hover:scale-105"
                        />
                    </button>
                </div>
            </div>
        </>
    );
}

export default ChatInputForm;
