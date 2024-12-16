'use client';
import PencilIcon from '@/app/_icons/common/PencilIcon';
import Image from 'next/image';
import React, { useState } from 'react';
import ProfileImageChange from './ProfileImageChange';

interface Props {
    profileImageUrl?: string;
    sizeClassName?: string;
}

function ProfileImage({ profileImageUrl, sizeClassName }: Props) {
    const [isProfileImageModal, setIsProfileImageModal] = useState(false);

    const handleModalOpen = () => {
        setIsProfileImageModal(true);
    };
    const handleModalClose = () => {
        setIsProfileImageModal(false);
    };
    return (
        <>
            <div className={`relative ${sizeClassName} overflow-hidden rounded-full `} onClick={handleModalOpen}>
                <Image src={profileImageUrl || ''} alt="profile" fill className=" object-cover" />

                <button className=" absolute flex h-full w-full items-center  justify-center border-white  p-[4px]">
                    <PencilIcon className="h-5 w-5 text-gray-600" />
                </button>
            </div>
            {isProfileImageModal && <ProfileImageChange onClose={handleModalClose} />}
        </>
    );
}

export default ProfileImage;
