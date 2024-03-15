'use client';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function HeaderUser() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const onClickLogout = async () => {
        signOut({ redirect: false });
        router.push('/');
    };
    const stauts = status !== 'loading';
    return session ? (
        <>
            <button
                className="flex h-9 w-20 shrink-0 items-center justify-center rounded-md border border-black "
                onClick={onClickLogout}
            >
                <span className="text-sm ">로그아웃</span>
            </button>
        </>
    ) : (
        stauts && (
            <>
                <button className="flex h-9 w-20 shrink-0 items-center justify-center rounded-md border border-black ">
                    <span className="text-sm ">로그인</span>
                </button>

                <button className=" ml-2 flex h-9 w-20 shrink-0  items-center justify-center rounded-md bg-gray-700">
                    <span className="text-sm  text-white">가입하기</span>
                </button>
            </>
        )
    );
}

export default HeaderUser;
