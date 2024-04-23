'use client';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loading from '@/app/_component/Loading';
import HeartIcon from '../icon/HeartIcon';
import HeaderUserInfo from './HeaderUserInfo';
import HeaderUserNotification from './HeaderUserNotification';
import HeaderUserLike from './HeaderUserLike';

function HeaderUser() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const onClickLogout = async () => {
        signOut({ redirect: false });
        router.push('/');
    };
    if (status === 'loading')
        return (
            <div className="h-9 w-20">
                <Loading />
            </div>
        );
    if (session) {
        return (
            <div className="flex h-full flex-row items-center gap-3">
                {/* <button
                    onClick={onClickLogout}
                    className="flex h-9 w-20 shrink-0 items-center justify-center rounded-md border border-black "
                >
                    <span className="text-sm ">로그아웃</span>
                </button> */}
                <HeaderUserLike />
                <HeaderUserNotification />
                <HeaderUserInfo memberDto={session.user?.memberDTO}></HeaderUserInfo>
            </div>
        );
    } else {
        <>
            <button className="flex h-9 w-20 shrink-0 items-center justify-center rounded-md border border-black ">
                <span className="text-sm ">로그인</span>
            </button>

            <button className=" ml-2 flex h-9 w-20 shrink-0  items-center justify-center rounded-md bg-gray-700">
                <span className="text-sm  text-white">가입하기</span>
            </button>
        </>;
    }
}

export default HeaderUser;
