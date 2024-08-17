'use client';
import NonStandardModal from '@/app/(afterLogin)/_component/common/NonStandardModal';
import React, { use, useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import ImageIcon from '@/app/_icons/common/ImageIcon';
import { useMutation } from '@tanstack/react-query';
import { postDefaultImage, postImageData } from '../_lib/profileImageChange';
import { updateSessionImage } from '../_lib/updateSession';
import { AxiosError } from 'axios';
import { pushNotification } from '@/app/util/pushNotification';
import { ErrorResponse } from '@/app/Models/AxiosResponse';
import { useRouter } from 'next/navigation';

function ProfileImageChange({ open, onClose }: { open: boolean; onClose: () => void }) {
    const { data: session, status, update: UpdateSession } = useSession();
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const imageMutation = useMutation({
        mutationFn: () => postImageData(selectedImage),

        onSuccess: async (imageUrl) => {
            console.log('이미지 링크', imageUrl);
            await updateSessionImage(imageUrl); //서버액션으로 이미지 서버 세션에 업데이트
            await UpdateSession(); //클라이언트도 세션 업데이트&새로고침
            router.refresh();
            pushNotification('이미지가 성공적으로 변경되었습니다.', 'success', 'light');
        },
        onError: (err) => {
            console.log(err);
            pushNotification('등록에 실패했습니다. 다시 시도해주세요.', 'error', 'light');
        },
    }); //사용자 이미지 업로드
    const defaultImageMutation = useMutation({
        mutationFn: postDefaultImage,

        onSuccess: async (data) => {
            await updateSessionImage(data); //서버액션으로 이미지 서버 세션에 업데이트
            await UpdateSession(); //클라이언트도 세션 업데이트&새로고침
            setSelectedImage(null);
            pushNotification('이미지가 성공적으로 변경되었습니다.', 'success', 'light');
        },
        onError: (err: AxiosError<ErrorResponse>) => {
            console.log('에러 데이터', err.response?.data);

            pushNotification(err.response?.data.message || '등록에 실패했습니다. 다시 시도해주세요.', 'error', 'light');
        },
    }); //기본 이미지 변경

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            setSelectedImage(files[0]);
        }
    };
    const handlefileInputOpen = () => {
        //이미지 선택창 열기
        fileInputRef.current?.click();
    };

    const handleImageSubmit = () => {
        if (!selectedImage) return pushNotification('이미지를 선택해주세요.', 'error', 'light');
        imageMutation.mutate();
    };
    const handleDefaultImageSubmit = () => {
        defaultImageMutation.mutate();
    };

    useEffect(() => {
        if (!open) {
            setSelectedImage(null);
        }
    }, [open]); //모달창이 닫힐때 이미지 초기화

    return (
        <>
            <NonStandardModal
                open={open}
                onClose={onClose}
                className="flex h-fit w-full flex-col items-center gap-2 rounded-md bg-zinc-600 p-4 shadow-md mobile:w-[470px]"
            >
                <div
                    className="relative flex h-52 w-52 items-center justify-center rounded-full  text-center "
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Image
                        src={
                            selectedImage
                                ? URL.createObjectURL(selectedImage)
                                : session?.user?.memberDTO.memberImageUrl || ''
                        }
                        alt="profile"
                        fill
                        className="rounded-full border-2   object-cover"
                    />

                    <div
                        className={`absolute top-0 flex h-52 w-52 cursor-pointer flex-col items-center justify-center gap-1 rounded-full bg-black bg-opacity-50 transition-all duration-150 ${isHovered ? 'visible opacity-100' : 'invisible opacity-0'}`}
                        onClick={handlefileInputOpen}
                    >
                        <ImageIcon className="mt-6 h-9 w-9 text-neutral-200 " />
                        <span className="text-xs text-neutral-200">업로드</span>
                    </div>
                </div>
                <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />

                {/* <span className=" mb-2 text-sm text-blue-600 underline ">추가및 변경</span> */}
                <span className=" text-lg text-white">프로필 사진</span>
                <span className="mt-5 w-4/5 text-center text-sm text-zinc-400">
                    프로필 사진 등록은 커뮤니케이션의 첫 걸음입니다. 사진을 추가해보세요.
                </span>
                <span className="text-center text-sm text-zinc-400">
                    사진을 추가하면 다른 사람들이 당신을 더 쉽게 찾을 수 있습니다.
                </span>
                <div className="mt-4 flex w-full flex-row gap-3 ">
                    <button
                        className="flex-grow rounded-md border py-[3px] text-white shadow-md hover:border-neutral-400"
                        onClick={handleDefaultImageSubmit}
                    >
                        제거
                    </button>
                    <button
                        className="flex-grow rounded-md bg-primary   py-[3px] text-white shadow-md hover:bg-opacity-80 "
                        onClick={handleImageSubmit}
                    >
                        변경
                    </button>
                </div>
            </NonStandardModal>
        </>
    );
}

export default ProfileImageChange;
