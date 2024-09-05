import ExcelIcon from '@/app/_icons/Chat/ExcelIcon';
import HwpIcon from '@/app/_icons/Chat/HwpIcon';
import PdfIcon from '@/app/_icons/Chat/PdfIcon';
import PptIcon from '@/app/_icons/Chat/PptIcon';
import WordIcon from '@/app/_icons/Chat/WordIcon';
import ZipIcon from '@/app/_icons/Chat/ZipIcon';
import FileIcon from '@/app/_icons/common/FileIcon';
import Image from 'next/image';
import React from 'react';
type FileType = 'IMAGE' | 'VIDEO' | 'ZIP' | 'PDF' | 'FILE';

function UploadPreload({ file }: { file: File }) {
    const isImage = file.type.startsWith('image/'); //이미지 파일인지 확인
    const isVideo = file.type.startsWith('video/'); //비디오 파일인지 확인

    const fileExtension = !isImage || !isVideo ? file.name.split('.').pop()?.toLowerCase() : null;

    const convertUrl = (file: File) => {
        return URL.createObjectURL(file);
    }; //파일을 url로 변환

    if (!file || !fileExtension) {
        return null;
    }

    return (
        <div className=" flex h-full w-full flex-col items-center gap-2 px-1 py-4">
            <div className=" relative flex h-full w-full justify-center p-5">
                {file.type.startsWith('image/') && (
                    <Image src={convertUrl(file)} alt="Preview" fill className="object-contain" sizes="100%" />
                )}
                {file.type.startsWith('video/') && (
                    <video src={convertUrl(file)} controls className="h-auto w-full object-contain" />
                )}
                {fileExtension === 'zip' && <ZipIcon className="h-auto w-4/5" />}
                {fileExtension === 'pdf' && <PdfIcon className="h-auto w-4/5 text-red-500" />}
                {['doc', 'docx'].includes(fileExtension) && <WordIcon className="h-auto w-4/5 text-blue-500" />}
                {fileExtension === 'hwp' && <HwpIcon className="h-auto w-4/5 text-blue-500" />}
                {['ppt', 'pptx', 'show'].includes(fileExtension) && <PptIcon className="h-auto w-4/5 text-red-500" />}
                {['xls', 'xlsx'].includes(fileExtension) && <ExcelIcon className="h-auto w-4/5 text-green-500" />}
                {!['docx', 'hwp', 'ppt', 'pptx', 'show', 'xls', 'xlsx', 'cell', 'zip', 'pdf'].includes(fileExtension) &&
                    !isImage &&
                    !isVideo && <FileIcon className="h-auto w-4/5 text-gray-500" />}
            </div>
            <span className="text-center text-xs font-medium text-neutral-600">{file.name}</span>
        </div>
    );
}

export default UploadPreload;
