import React from 'react';
import HeaderUserInfo from './HeaderUserInfo';
import HeaderUserNotification from './HeaderUserNotification';
import HeaderUserChat from './HeaderUserChat';
import { MemberDto } from '@/auth';
import Link from 'next/link';

function HeaderUser({ memberDto }: { memberDto?: MemberDto }) {
    if (memberDto) {
        return (
            <div className="flex h-full flex-row items-center gap-3">
                <HeaderUserNotification />
                <HeaderUserChat />
                <HeaderUserInfo memberDto={memberDto}></HeaderUserInfo>
            </div>
        );
    } else {
        return (
            <>
                <Link
                    href="/user/login"
                    className="flex h-9 w-20 shrink-0 items-center justify-center rounded-md border border-black "
                >
                    <span className="text-sm ">로그인</span>
                </Link>

                <Link
                    href="/user/signup"
                    className=" ml-2 flex h-9 w-20 shrink-0  items-center justify-center rounded-md bg-gray-700"
                >
                    <span className="text-sm  text-white">가입하기</span>
                </Link>
            </>
        );
    }
}

export default HeaderUser;
