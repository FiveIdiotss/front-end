'use client';
import React, { useEffect, useRef, useState } from 'react';
import HeaderUserInfo from './HeaderUserInfo';
import HeaderUserNotification from './HeaderUserNotification';
import HeaderUserChat from './HeaderUserChat';
import { MemberDto } from '@/auth';
import Link from 'next/link';
import { Client } from '@stomp/stompjs';
import { useQueryClient } from '@tanstack/react-query';
import HeaderRegist from './HeaderRegist';
import { useRouteLogin } from '@/app/_hooks/useRouteLogin';
import { useRouteSignup } from '@/app/_hooks/useRouteSignup';
import { pushNotification } from '@/app/util/pushNotification';

function HeaderUser({ memberDto }: { memberDto?: MemberDto }) {
    const stompClientRef = useRef<Client | null>(null); // stompClient를 위한 ref 추가
    const queryClient = useQueryClient();
    const { navigateToLogin } = useRouteLogin({
        isLoginRequired: false,
    });
    const { navigateToSignup } = useRouteSignup();

    const loginId = memberDto?.id;

    const handlePushCountChange = (count: number) => {
        queryClient.setQueryData(['push', 'count'], count);
    };
    useEffect(() => {
        if (!loginId) return;

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
                const subscriptionDestination = `/sub/notifications/${loginId}`;

                stomp.subscribe(
                    subscriptionDestination,
                    (frame) => {
                        try {
                            const unReadCount = JSON.parse(frame.body);
                            handlePushCountChange(unReadCount);
                            pushNotification({
                                position: 'top-center',
                                theme: 'light',
                                type: 'success',
                                msg: `🔔 새로운 알림이 있습니다.`,
                                isIcon: false,
                                maxWidth: '400px',
                            });
                            queryClient.invalidateQueries({
                                // predicate: (query) => query.queryKey?.includes('push'),
                                queryKey: ['push', 'list'],
                            }); // pushCountQuery를 다시 불러옴
                        } catch (error) {
                            console.error('오류가 발생했습니다:', error);
                        }
                    },
                    // connectHeader,
                );
            };
        };
        initializeChat();
        return () => {
            console.log('컴포넌트 언마운트');

            if (stompClientRef.current && stompClientRef.current.connected) {
                console.log('연결이 해제되었습니다.');
                stompClientRef.current.deactivate();
            }
        };
    }, []);

    if (memberDto) {
        return (
            <div className="flex h-full flex-row items-center  gap-1 mobile:gap-2">
                <HeaderRegist />
                <div className="ml-3 hidden h-full py-6 mobile:block">
                    <div className="h-full border-x border-gray-300" />
                </div>
                <HeaderUserNotification />
                <HeaderUserChat />
                <HeaderUserInfo memberDto={memberDto}></HeaderUserInfo>
            </div>
        );
    } else {
        return (
            <div className="flex flex-row">
                <button
                    onClick={navigateToLogin}
                    className="flex h-9 w-20 shrink-0  items-center justify-center rounded-md border border-gray-300 text-gray-700 "
                >
                    <span className="text-sm ">로그인</span>
                </button>

                <button
                    onClick={navigateToSignup}
                    className=" ml-2 flex h-9 w-20 shrink-0  items-center justify-center rounded-md bg-gray-600"
                >
                    <span className="text-sm  text-white">가입하기</span>
                </button>
            </div>
        );
    }
}

export default HeaderUser;
