'use client';
import { MemberDto } from '@/auth';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

function HeaderUserInfo({ memberDto }: { memberDto: MemberDto | undefined }) {
    const [isHovered, setIsHovered] = useState(false);
    const handleSigOut = async () => {
        if (confirm('로그아웃 하시겠습니까?')) {
            await signOut({ callbackUrl: '/home' });
        }
    };
    return (
        <div
            className="flex h-full flex-shrink-0 items-center pl-3 "
            onMouseLeave={() => setIsHovered(false)}
            onMouseEnter={() => setIsHovered(true)}
        >
            <div className="relative">
                <div className="h-[33px] w-[33px] shrink-0 rounded-full  border-2 border-gray-400 hover:cursor-pointer  hover:border-2 hover:border-primary hover:p-0 ">
                    <Link href="/user">
                        <Image
                            src={memberDto?.memberImageUrl || '/assets/images/default-user.svg'}
                            alt="user"
                            className=" rounded-full object-cover "
                            fill
                            quality={100}
                            loading="eager"
                        />
                    </Link>
                </div>

                <div
                    className={`absolute  right-0 top-12 flex    flex-col  ${isHovered ? ' transition-all duration-300 ease-in' : ''} ${
                        isHovered ? ' max-h-[1000px] w-fit  opacity-100' : 'max-h-0  w-0 overflow-hidden opacity-0'
                    }  `}
                >
                    <div className="mt-2  flex w-60 flex-col border bg-white    shadow-sm shadow-neutral-300 ">
                        <div className="flex w-full flex-row   items-center justify-start gap-2 border-b p-4">
                            <div className="">
                                <Image
                                    src={memberDto?.memberImageUrl || '/assets/images/default-user.svg'}
                                    alt="user"
                                    className=" rounded-full"
                                    width={45}
                                    height={45}
                                />
                            </div>
                            <div className="flex flex-col ">
                                <span className="text-sm  font-semibold text-neutral-800">{memberDto?.name}</span>
                                <span className="text-xs font-normal text-neutral-600">{memberDto?.schoolName}</span>
                                <span className="text-xs font-normal text-neutral-500">{memberDto?.email}</span>
                            </div>
                        </div>

                        <div className="flex w-full flex-col items-start justify-center border-b">
                            <div className="flex w-full items-center justify-center">
                                <span className="pt-1 text-xs font-semibold text-neutral-700"> 신청 현황</span>
                            </div>
                            <span className=" flex w-full items-center  px-4 py-[10px]  text-sm text-neutral-500 hover:cursor-pointer hover:bg-indigo-50 ">
                                멘토링 신청 내역
                            </span>
                            <span className="w-full px-4 py-[10px] text-sm text-neutral-500 hover:cursor-pointer hover:bg-indigo-50">
                                멘토링 신청 받은 내역
                            </span>
                        </div>
                        <div className="flex w-full flex-col items-start justify-center border-b">
                            <span className=" flex w-full items-center  px-4 py-[10px]  text-sm text-neutral-500 hover:cursor-pointer hover:bg-indigo-50 ">
                                작성 게시물
                            </span>
                            <span className="w-full px-4 py-[10px] text-sm text-neutral-500 hover:cursor-pointer hover:bg-indigo-50">
                                좋아요
                            </span>
                        </div>
                        <div className="flex w-full flex-col items-start justify-center border-b">
                            <span className=" flex w-full items-center  px-4 py-[10px]  text-sm text-neutral-500 hover:cursor-pointer hover:bg-indigo-50 ">
                                알림
                            </span>
                            <Link
                                href="/chat"
                                className="w-full px-4 py-[10px] text-sm text-neutral-500 hover:cursor-pointer hover:bg-indigo-50"
                            >
                                채팅
                            </Link>
                        </div>
                        <div className=" flex flex-grow flex-col items-start justify-center  border-b ">
                            <span className=" flex w-full items-center  px-4 py-[10px]  text-sm text-neutral-500 hover:cursor-pointer hover:bg-indigo-50 ">
                                마이페이지
                            </span>
                            <span className=" flex w-full items-center  px-4 py-[10px]  text-sm text-neutral-500 hover:cursor-pointer hover:bg-indigo-50 ">
                                설정
                            </span>
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
