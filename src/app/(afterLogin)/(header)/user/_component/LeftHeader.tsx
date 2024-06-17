'use client';
import { auth } from '@/auth';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import PencilIcon from '@/app/(afterLogin)/_component/icon/PencilIcon';
import LogoutIcon from '@/app/(afterLogin)/_component/icon/LogoutIcon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ProfileImageChange from './ProfileImageChange';
const menuItems = [
    { name: '프로필', link: '/user' },
    { name: '멘토링 신청 내역', link: '/user/mentoring-request' },
    { name: '멘토링 신청 받은 내역', link: '/user/mentoring-request-received' },
]; //사이드바 메뉴

function LeftHeader() {
    const { data: session } = useSession();

    const params = usePathname();
    const [isProfileImageModal, setIsProfileImageModal] = useState(false);

    const handleModalOpen = () => {
        setIsProfileImageModal(true);
    };
    const handleModalClose = () => {
        setIsProfileImageModal(false);
    };
    return (
        <>
            <div className="flex h-full w-full  flex-col  gap-12      border-x border-gray-300 p-10 shadow-right ">
                <div className="flex w-full flex-col items-center justify-center ">
                    <div className="relative h-[100px] w-[100px]">
                        <Image
                            src={session?.user?.memberDTO.memberImageUrl || ''}
                            alt="profile"
                            fill
                            className="rounded-full border-2 object-cover"
                        />

                        <button
                            className="absolute -right-1 top-[67px] h-7 w-7 rounded-full border-2 border-white bg-primary p-[4px]"
                            onClick={handleModalOpen}
                        >
                            <PencilIcon className="text-white" />
                        </button>
                    </div>
                    <span className="mt-2 text-lg font-bold">{session?.user?.memberDTO.name}</span>
                    <span className="text-base text-neutral-600">{session?.user?.memberDTO.schoolName}</span>

                    <span className=" text-sm text-neutral-400">{session?.user?.memberDTO.email}</span>
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
                    <span className="flex w-full items-center px-4 py-[8px] text-sm text-neutral-500 hover:cursor-pointer hover:bg-red-100 hover:font-semibold hover:text-red-400">
                        로그아웃
                    </span>
                </div>
            </div>
            <ProfileImageChange open={isProfileImageModal} onClose={handleModalClose} />
        </>
    );
}

export default LeftHeader;
