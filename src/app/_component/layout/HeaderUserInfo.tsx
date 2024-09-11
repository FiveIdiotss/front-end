'use client';
import { MemberDto } from '@/auth';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function HeaderUserInfo({ memberDto }: { memberDto: MemberDto | undefined }) {
    const [isClick, setIsClick] = useState(false);
    const router = useRouter();

    const handleSigOut = async () => {
        if (confirm('로그아웃 하시겠습니까?')) {
            await signOut({ callbackUrl: '/' });
        }
    };

    const handlePageMove = (href: string) => {
        router.push(href);
        setIsClick(false);
    };
    return (
        <div className="flex h-full  flex-shrink-0 items-center pl-3 ">
            <div className="relative">
                <button type="button" onClick={() => setIsClick(!isClick)} className="flex ">
                    <div className="relative h-[33px] w-[33px]  shrink-0 rounded-full   border-gray-400 hover:cursor-pointer   hover:border-primary">
                        <Image
                            src={memberDto?.memberImageUrl || '/assets/images/default-user.svg'}
                            alt="user"
                            sizes="200px"
                            className=" rounded-full object-cover "
                            fill={true}
                            quality={100}
                            loading="eager"
                        />
                    </div>
                </button>

                <div
                    className={`absolute  right-0 top-9 flex flex-col      ${isClick ? ' transition-all duration-200 ease-in' : ''} ${
                        isClick ? ' max-h-[1000px] w-fit  opacity-100' : 'max-h-0  w-0 overflow-hidden opacity-0'
                    }  `}
                >
                    <div className="mt-2  flex w-60 flex-col rounded-lg border bg-white   shadow-sm shadow-neutral-300 ">
                        <div className="flex w-full flex-row items-center   justify-start gap-3  border-b p-4">
                            <div className="relative h-12 w-12">
                                <Image
                                    src={memberDto?.memberImageUrl || '/assets/images/default-user.svg'}
                                    alt="user"
                                    className=" rounded-full object-cover"
                                    quality={100}
                                    fill={true}
                                    sizes="100px"
                                />
                            </div>
                            <div className="flex flex-col ">
                                <span className="text-sm  font-semibold text-neutral-800">{memberDto?.name}</span>
                                <span className="text-xs font-normal text-neutral-600">{memberDto?.schoolName}</span>
                                <span className="text-xs font-normal text-neutral-500">{memberDto?.email}</span>
                            </div>
                        </div>

                        <div className="flex w-full flex-col items-start justify-center border-b">
                            <button
                                onClick={() => handlePageMove('/user')}
                                className=" flex w-full items-center  px-4 py-[10px]  text-sm text-neutral-500 hover:cursor-pointer hover:bg-indigo-50 "
                            >
                                마이페이지
                            </button>
                            <button
                                onClick={() => handlePageMove('/user')}
                                className=" flex w-full items-center  px-4 py-[10px]  text-sm text-neutral-500 hover:cursor-pointer hover:bg-indigo-50 "
                            >
                                작성 게시물
                            </button>
                            <button
                                onClick={() => handlePageMove('/user?tab=북마크')}
                                className=" flex w-full items-center  px-4 py-[10px]  text-sm text-neutral-500 hover:cursor-pointer hover:bg-indigo-50 "
                            >
                                북마크
                            </button>
                        </div>
                        <div className="flex w-full flex-col items-start justify-center border-b">
                            <div className="flex w-full items-center justify-center">
                                <span className="pt-1 text-xs font-semibold text-neutral-700"> 신청 현황</span>
                            </div>
                            <button
                                onClick={() => handlePageMove('/user/mentoring-request')}
                                className=" flex w-full items-center  px-4 py-[10px]  text-sm text-neutral-500 hover:cursor-pointer hover:bg-indigo-50 "
                            >
                                멘토링 신청 내역
                            </button>
                            <button
                                onClick={() => handlePageMove('/user/mentoring-request-received')}
                                className=" flex w-full items-center  px-4 py-[10px]  text-sm text-neutral-500 hover:cursor-pointer hover:bg-indigo-50 "
                            >
                                멘토링 신청 받은 내역
                            </button>
                        </div>
                        <div className="flex w-full flex-col items-start justify-center border-b">
                            <span className=" flex w-full items-center  px-4 py-[10px]  text-sm text-neutral-500 hover:cursor-pointer hover:bg-indigo-50 ">
                                알림
                            </span>
                            <button
                                onClick={() => handlePageMove('/chat')}
                                className=" flex w-full items-center  px-4 py-[10px]  text-sm text-neutral-500 hover:cursor-pointer hover:bg-indigo-50 "
                            >
                                채팅
                            </button>
                        </div>

                        <div className=" flex  flex-col items-start justify-center ">
                            <span
                                className="w-full px-4 py-[11px] text-sm text-neutral-500 hover:cursor-pointer hover:bg-red-100 hover:font-semibold hover:text-red-400"
                                onClick={handleSigOut}
                            >
                                로그아웃
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderUserInfo;
