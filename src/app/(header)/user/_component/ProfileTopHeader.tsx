'use client';
import { MemberDto } from '@/auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import ProfileImageChange from './ProfileImageChange';
import { signOut } from 'next-auth/react';
import ArrowDropIcon from '@/app/_icons/common/ArrowDropIcon';

const menuItems = [
    { name: '프로필', link: '/user' },
    { name: '멘토링 신청 내역', link: '/user/mentoring-request' },
    { name: '멘토링 신청 받은 내역', link: '/user/mentoring-request-received' },
]; //사이드바 메뉴

function ProfileTopHeader({ memberDTO }: { memberDTO?: MemberDto }) {
    const params = usePathname();
    const [isLinkToggle, setIsLinkToggle] = useState(false);
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
            <div className="flex h-full w-full  flex-col       border-b border-gray-300 px-3 py-2  ">
                <div className="flex w-full flex-row  items-center justify-center ">
                    <button
                        className="rouned-md flex flex-grow flex-row items-center p-1 hover:bg-gray-50"
                        onClick={() => setIsLinkToggle(!isLinkToggle)}
                    >
                        <ArrowDropIcon className="h-6 w-6 text-gray-500" isOpen={isLinkToggle} />
                        <span className=" text-gray-500">탭</span>
                    </button>
                    <div className="flex  justify-end ">
                        <span className="flex items-center rounded-md px-4 py-[8px] text-sm text-neutral-500 hover:cursor-pointer hover:bg-indigo-50 hover:font-semibold hover:text-neutral-600">
                            문의하기
                        </span>
                        <button
                            type="button"
                            className="flex items-center rounded-md px-4 py-[8px] text-sm text-neutral-500 hover:cursor-pointer hover:bg-red-50 hover:font-semibold hover:text-red-400"
                            onClick={handleSigOut}
                        >
                            로그아웃
                        </button>
                    </div>
                </div>
                <div
                    className={`flex flex-grow flex-col  transition-all ${isLinkToggle ? 'mt-3 max-h-[999px] gap-1 pt-3 opacity-100 ' : 'max-h-0 overflow-hidden opacity-0 '} border-t `}
                >
                    {menuItems.map((item, index) => (
                        <Link key={index} href={item.link}>
                            <span
                                className={`flex w-full items-center px-4 py-[10px] text-base text-neutral-600  hover:cursor-pointer  hover:font-semibold  ${params === item.link ? 'bg-indigo-100 font-semibold text-primary ' : ' hover:bg-gray-50 hover:text-primary'}`}
                            >
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </div>
                {isLinkToggle && (
                    <div className="flex flex-row  items-center justify-end">
                        <button
                            className="mt-1 flex items-center justify-center p-1 text-sm text-gray-500 hover:bg-gray-50"
                            onClick={() => setIsLinkToggle(false)}
                        >
                            닫기
                        </button>
                    </div>
                )}
            </div>
            <ProfileImageChange open={isProfileImageModal} onClose={handleModalClose} />
        </>
    );
}

export default ProfileTopHeader;
