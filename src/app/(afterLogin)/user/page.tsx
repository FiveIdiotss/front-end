import Image from 'next/image';
import React from 'react';
import { auth } from '@/auth';
import PencilIcon from '../_component/icon/PencilIcon';
import SectionDivider from '../_component/SectionDivider';
import ProfileDashBoard from './_component/ProfileDashBoard/ProfileDashBoard';

async function UserPage() {
    const session = await auth();

    return (
        <div className="flex h-full w-full flex-col gap-1 p-7">
            <div className="flex  flex-row gap-6 ">
                <Image
                    src={session?.user?.memberDTO.memberImageUrl || ''}
                    alt="profile"
                    width={140}
                    height={140}
                    loading="eager"
                    className=" rounded-full object-cover "
                />
                <div className="flex flex-col justify-center gap-1">
                    <span className="text-2xl font-extrabold ">{session?.user?.memberDTO.name}</span>
                    <span className="text-base font-semibold text-neutral-600">
                        {session?.user?.memberDTO.schoolName}
                    </span>
                    <span className="text-base text-neutral-400">{session?.user?.memberDTO.email}</span>
                </div>
                <div className="flex h-full flex-grow  flex-row items-center justify-end  ">
                    <button className="flex h-fit flex-row gap-2  rounded-md border  border-neutral-300 bg-white px-2 py-1 hover:border-neutral-500">
                        <span>프로필 수정</span>
                        <PencilIcon className="m-auto h-5 w-5 " />
                    </button>
                </div>
            </div>
            <div className="mt-6 flex flex-row gap-3">
                <span className="">게시물 2</span>
                <span className="">즐겨찾기 4</span>
                <span className="">좋아요 6</span>
            </div>
            <span className="mt-4 font-light text-neutral-600">아직 자기소개가 없습니다.</span>
            <ProfileDashBoard />
        </div>
    );
}

export default UserPage;
