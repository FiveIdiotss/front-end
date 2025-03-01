'use client';
import { MemberDto } from '@/auth';
import Image from 'next/image';
import React, { useState } from 'react';
import PencilIcon from '@/app/_icons/common/PencilIcon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import ProfileImageChange from './ProfileImageChange';
import ProfileImage from './ProfileImage';
const menuItems = [
    { name: '프로필', link: '/user' },
    { name: '멘토링 신청 내역', link: '/user/mentoring-request' },
    { name: '멘토링 신청 받은 내역', link: '/user/mentoring-request-received' },
]; //사이드바 메뉴

function ProfileLeftHeader({ memberDTO }: { memberDTO?: MemberDto }) {
    const params = usePathname();

    const handleSigOut = async () => {
        if (confirm('로그아웃 하시겠습니까?')) {
            await signOut({ callbackUrl: '/' });
        }
    };
    return (
        <>
            <div className="flex h-full w-full  flex-col  gap-12      border-x border-gray-300 p-10 shadow-right ">
                <div className="flex w-full flex-col items-center justify-center ">
                    <ProfileImage profileImageUrl={memberDTO?.memberImageUrl} sizeClassName="h-[100px] w-[100px]" />
                    <span className="mt-2 text-lg font-bold">{memberDTO?.name}</span>
                    <span className="text-base text-neutral-600">{memberDTO?.schoolName}</span>
                    <span className=" text-sm text-neutral-400">{memberDTO?.email}</span>
                </div>
                <div className="flex flex-grow  flex-col gap-1 border-y pt-3">
                    {menuItems.map((item, index) => (
                        <Link key={index} href={item.link}>
                            <span
                                className={`flex w-full items-center px-4 py-[10px] text-base text-neutral-600  hover:cursor-pointer hover:bg-indigo-100 hover:font-semibold hover:text-primary ${params === item.link ? 'bg-indigo-100 font-semibold text-primary ' : ''}`}
                            >
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </div>
                <div className="flex flex-col ">
                    <span className="flex w-full items-center px-4 py-[8px] text-sm text-neutral-500 hover:cursor-pointer hover:bg-indigo-100 hover:font-semibold hover:text-neutral-600">
                        문의하기
                    </span>
                    <button
                        type="button"
                        onClick={handleSigOut}
                        className="flex w-full items-center px-4 py-[8px] text-sm text-neutral-500 hover:cursor-pointer hover:bg-red-100 hover:font-semibold hover:text-red-400"
                    >
                        로그아웃
                    </button>
                </div>
            </div>
        </>
    );
}

export default ProfileLeftHeader;
