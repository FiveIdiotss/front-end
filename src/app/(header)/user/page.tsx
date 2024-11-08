import Image from 'next/image';
import React from 'react';
import { auth } from '@/auth';
import ProfileDashBoard from './_component/ProfileDashBoard/ProfileDashBoard';
import Link from 'next/link';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: '프로필',
};

async function UserPage() {
    const session = await auth();

    return (
        <div className="flex h-full w-full flex-col gap-1 p-3  mobile:p-6">
            <div className="flex  flex-row gap-6 ">
                <div
                    // href={session?.user?.memberDTO.memberImageUrl || ''}
                    className="relative h-[100px] w-[100px] mobile:h-[140px] mobile:w-[140px]  "
                >
                    <Image
                        src={session?.user?.memberDTO.memberImageUrl || ''}
                        alt="profile"
                        fill={true}
                        sizes="240px"
                        quality={100}
                        loading="eager"
                        className="rounded-full object-cover"
                    />
                </div>
                <div className="flex flex-col justify-center gap-1">
                    <span className="text-2xl font-extrabold ">{session?.user?.memberDTO.name}</span>
                    <span className="text-base font-semibold text-neutral-600">
                        {session?.user?.memberDTO.schoolName}
                    </span>
                    <span className="text-base text-neutral-400">{session?.user?.memberDTO.email}</span>
                </div>
                {/* <div className="flex h-full flex-grow  flex-row items-center justify-end  ">
                    <button className="flex h-fit flex-row gap-2  rounded-md border  border-neutral-300 bg-white px-2 py-1 hover:border-neutral-500">
                        <span>프로필 수정</span>
                        <PencilIcon className="m-auto h-5 w-5 " />
                    </button>
                </div> */}
            </div>
            <div className="mt-6 flex flex-row gap-3">
                <span className="">게시물 2</span>
                <span className="">즐겨찾기 4</span>
                <span className="">좋아요 6</span>
            </div>
            <span className="mt-4 font-light text-neutral-600">아직 자기소개가 없습니다.</span>
            <ProfileDashBoard session={session} />
        </div>
    );
}

export default UserPage;
