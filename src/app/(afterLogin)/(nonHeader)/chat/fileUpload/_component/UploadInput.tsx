import Image from 'next/image';
import React, { ChangeEvent, DragEvent, useCallback, useEffect, useRef } from 'react';
import fileAdd from '@/../public/chat/fileAdd.png';
import CloseIcon from '@/app/_icons/icon/CloseIcon';
import UploadPreload from './UploadPreload';

function UploadInput({ setFile, file }: { setFile: (file: File | null) => void; file: File | null }) {
    const dropRef = useRef<HTMLInputElement>(null);

    const handleDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback(
        (e: DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();

            const file = e.dataTransfer.files[0];
            setFile(file);
        },
        [setFile],
    );

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) setFile(file);
    };

    const handleUploadClick = () => {
        if (dropRef.current) dropRef.current.click();
    };
    const handleDeleteFile = () => {
        setFile(null);
    };

    return (
        <>
            {!file && (
                <div
                    className="flex  h-full w-full   cursor-pointer flex-col items-center justify-center gap-2 rounded-sm border bg-indigo-50 "
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={handleUploadClick}
                >
                    <Image src={fileAdd} alt="fileAdd" width={18} height={18} />
                    <input
                        type="file"
                        className="hidden"
                        ref={dropRef}
                        onChange={handleFileChange}
                        accept="image/*, video/*, .pdf, .doc, .docx, .zip, .ppt, .pptx, .xls, .xlsx, .hwp, .cell "
                    />
                    <span className="flex text-xs text-neutral-600 ">
                        마우스로 드래그해서 파일을 추가하거나 영역을 클릭해주세요.
                    </span>
                </div>
            )}
            {file && (
                <div className="flex  h-full w-full   flex-col items-center justify-center gap-2 rounded-sm border bg-indigo-50 p-6 ">
                    <div className=" flex h-full w-full max-w-60 flex-row rounded-md bg-white p-1 shadow-md  ">
                        <div className="rouned-md flex h-full flex-grow items-start">
                            <UploadPreload file={file} />
                            <button onClick={handleDeleteFile}>
                                <CloseIcon className="h-5 w-5 text-red-600" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UploadInput;
