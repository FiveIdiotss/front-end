'use client';
import React, { use, useEffect, useRef, useState } from 'react';
import emoticon from '@/../public/chat/emoticon.svg';
import file from '@/../public/chat/file.svg';
import capture from '@/../public/chat/capture.svg';
import send from '@/../public/chat/send.svg';
import Image from 'next/image';
import { Client } from '@stomp/stompjs';
import { Stomp } from '@stomp/stompjs';
import { useChatStore } from '../../_store/chatStore';
import { useSession } from 'next-auth/react';
const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
}; //파일을 base64로 변환하는 함수
const convertToBinary = (file: File) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

function ChatInputForm() {
    const { chatList, setIsSending, setChat } = useChatStore();
    const [inputMessage, setInputMessage] = useState<string>(''); //textarea에 입력한 메시지
    const [inputImages, setInputImages] = useState<string>(''); //이미지 파일

    const { chatRoomId } = useChatStore();
    const { data: session } = useSession();
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [nowId, setNowId] = useState<number>(-1);
    const senderId = session?.user?.memberDTO.id;
    const senderName = session?.user?.memberDTO.name;
    const [isComposing, setIsComposing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

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
                const subscriptionDestination = `/sub/chats/${chatRoomId}`;

                stomp.subscribe(subscriptionDestination, (frame) => {
                    try {
                        const parsedMessage = JSON.parse(frame.body);

                        console.log('구독함으로부터 온메시지', parsedMessage);
                        setChat(parsedMessage);
                        if (parsedMessage.senderId === senderId) {
                            setIsSending(true);
                        }
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
                    content: inputImages === '' ? inputMessage : null, //이미지가 없거나 있을때
                    senderId: senderId,
                    chatRoomId: chatRoomId,
                    senderName: senderName,
                    image: inputImages === '' ? null : inputImages,
                }),
            });
            console.log('메시지 전송', inputMessage);
        }
        if (inputImages === '') {
            setInputMessage('');
        } else {
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            setInputImages('');
        }
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
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const arrayBufferToHex = (buffer: ArrayBuffer) => {
        const byteArray = new Uint8Array(buffer);
        return Array.from(byteArray)
            .map((byte) => byte.toString(16).padStart(2, '0'))
            .join(' ');
    };
    const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];

        const base64 = (await convertToBase64(file)) as string;

        setInputImages(base64);
    };
    return (
        <>
            <input type="file" className="" ref={fileInputRef} accept="image/*" onChange={handleChangeFile} />

            <textarea
                className=" w-full resize-none overflow-auto border-y p-3 outline-none"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => enterSendMessage(e)}
                style={{ lineHeight: '1.5em', maxHeight: '4.5em' }}
                placeholder=" 메시지를 입력하세요."
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
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
                    <button onClick={handleButtonClick}>
                        <Image
                            src={file}
                            alt="file"
                            width={30}
                            height={30}
                            className="cursor-pointer hover:rotate-12 hover:scale-105"
                        />
                    </button>
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
