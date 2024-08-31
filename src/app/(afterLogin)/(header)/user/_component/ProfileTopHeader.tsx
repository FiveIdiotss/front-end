'use client';
import PencilIcon from '@/app/_icons/common/PencilIcon';
import { MemberDto } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import ProfileImageChange from './ProfileImageChange';
import { signOut } from 'next-auth/react';

const menuItems = [
    { name: '프로필', link: '/user' },
    { name: '멘토링 신청 내역', link: '/user/mentoring-request' },
    { name: '멘토링 신청 받은 내역', link: '/user/mentoring-request-received' },
]; //사이드바 메뉴

function ProfileTopHeader({ memberDTO }: { memberDTO?: MemberDto }) {
    const params = usePathname();
    const [isProfileImageModal, setIsProfileImageModal] = useState(false);

    const handleModalOpen = () => {
        setIsProfileImageModal(true);
    };
    const handleModalClose = () => {
        setIsProfileImageModal(false);
    };
    const handleSigOut = async () => {
        if (confirm('로그아웃 하시겠습니까?')) {
            await signOut({ callbackUrl: '/home' });
        }
    };
    return (
        <>
            <div className="flex h-full w-full  flex-col  gap-3      border-b border-gray-300 px-3 py-3  ">
                <div className="flex w-full flex-col items-center justify-center ">
                    <div className="flex w-full flex-row justify-end ">
                        <span className="flex items-center px-4 py-[8px] text-sm text-neutral-500 hover:cursor-pointer hover:bg-indigo-100 hover:font-semibold hover:text-neutral-600">
                            문의하기
                        </span>
                        <button
                            type="button"
                            className="flex items-center px-4 py-[8px] text-sm text-neutral-500 hover:cursor-pointer hover:bg-red-100 hover:font-semibold hover:text-red-400"
                            onClick={handleSigOut}
                        >
                            로그아웃
                        </button>
                    </div>
                </div>
                <div className="flex flex-grow  flex-col gap-1 border-t pt-3">
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
            </div>
            <ProfileImageChange open={isProfileImageModal} onClose={handleModalClose} />
        </>
    );
}

export default ProfileTopHeader;
