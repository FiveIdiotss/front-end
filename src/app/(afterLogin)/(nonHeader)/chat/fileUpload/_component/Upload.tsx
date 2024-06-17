'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import UploadInput from './UploadInput';
import { useUploadMutaion } from '../_lib/upload';
import { pushNotification } from '@/app/util/pushNotification';
import Loading from '@/app/_component/Loading';
import { useChatStore } from '@/app/(afterLogin)/_store/chatStore';

function Upload() {
    const searchParams = useSearchParams();
    const [file, setFile] = useState<File | null>(null);
    const { setChat } = useChatStore(); //파일 업로드시 채팅방에 파일정보를 보내기위해 사용(즉시 업데이트)

    const handleClose = () => {
        window.close();
    }; //현제창 닫기
    const handleFileChange = (file: File | null) => {
        setFile(file);
    };
    const uploadMutation = useUploadMutaion();

    const handleUpload = () => {
        if (!file) {
            pushNotification('파일을 선택해주세요.', 'error', 'light');
            return;
        }
        uploadMutation.mutate(
            { file: file, chatRoomId: Number(searchParams.get('id')) },
            {
                onSuccess: (data) => {
                    setChat(data);
                    console.log('파일업로드성공');
                    // window.close();
                },
            },
        );
    };

    return (
        <div className="flex h-full w-full flex-col gap-4 ">
            <div className="flex w-full flex-row items-center justify-between border-b bg-indigo-50 px-4 py-2">
                <span className="text-sm font-semibold">파일 첨부하기</span>
            </div>
            <div className="flex max-h-[430px] w-full flex-grow flex-col  gap-5 px-8 ">
                <UploadInput setFile={handleFileChange} file={file} />
                <span className="text-xs text-blue-400">
                    하나의 파일만 등록할수 있습니다.&nbsp;&nbsp;
                    <br />
                    이미지(JPG, GIF, PNG, JPEG)&nbsp; · &nbsp;동영상 · &nbsp;문서(ZIP, PDF, DOCX, PPTX, XLSX, HWP,
                    )&nbsp;
                </span>
                <div className="flex w-full items-center justify-center gap-1 border-t py-2 ">
                    <button
                        onClick={handleClose}
                        className="   h-10 w-16 rounded-md border  border-neutral-300 bg-neutral-100 text-sm text-neutral-600 "
                    >
                        취소
                    </button>
                    {!uploadMutation.isPending && (
                        <button
                            onClick={handleUpload}
                            className={` h-10 w-16 rounded-md border bg-primary text-sm text-white hover:opacity-80 `}
                        >
                            확인
                        </button>
                    )}
                    {uploadMutation.isPending && (
                        <button className={` h-10 w-16 rounded-md  border bg-primary text-sm text-white  `}>
                            <Loading />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Upload;
