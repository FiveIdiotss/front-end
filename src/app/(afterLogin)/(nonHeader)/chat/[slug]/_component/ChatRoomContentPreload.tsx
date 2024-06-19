import React from 'react';
import { Message } from '../../_lib/chatContentList';
import Link from 'next/link';
import Image from 'next/image';
import PdfIcon from '@/app/(afterLogin)/_component/icon/Chat/PdfIcon';
import DownLoadIcon from '@/app/(afterLogin)/_component/icon/Chat/DownLoadIcon';
import WordIcon from '@/app/(afterLogin)/_component/icon/Chat/WordIcon';
import HwpIcon from '@/app/(afterLogin)/_component/icon/Chat/HwpIcon';
import PptIcon from '@/app/(afterLogin)/_component/icon/Chat/PptIcon';
import ExcelIcon from '@/app/(afterLogin)/_component/icon/Chat/ExcelIcon';
import ZipIcon from '@/app/(afterLogin)/_component/icon/Chat/ZipIcon';
import NormalFile from '@/app/(afterLogin)/_component/icon/Chat/NormalFile';

const noOfficeFileTypeMapping: { [key: string]: string } = {
    IMAGE: 'image',
    MESSAGE: 'message',
    VIDEO: 'video',
    //기본
};
const officeFileTypeMapping: { [key: string]: string } = {
    pdf: 'pdf',
    doc: 'doc',
    docx: 'doc',
    hwp: 'hwp',
    ppt: 'ppt',
    pptx: 'ppt',
    xls: 'excel',
    xlsx: 'excel',
    zip: 'zip',
    unknown: 'unknown',
    //이미지, 메시지,비디오 빼고 파일들
};
const serverMessageTypeMapping: { [key: string]: string } = {
    CONSULT_EXTEND: 'consultExtend',
    //서버에서 보내는 상담 연장 메시지
};
function determineFileType(chat: Message) {
    if (noOfficeFileTypeMapping[chat.fileType]) {
        return { type: 'noOffice', value: noOfficeFileTypeMapping[chat.fileType] };
    } else if (serverMessageTypeMapping[chat.fileType]) {
        return { type: 'server', value: serverMessageTypeMapping[chat.fileType] };
    } else {
        const extension = chat.content.split('.').pop();
        if (extension && officeFileTypeMapping[extension]) {
            return { type: 'office', value: officeFileTypeMapping[extension] };
        } else {
            return { type: 'office', value: 'unknown' };
        }
    }
}
type FileType = '' | 'doc' | 'hwp' | 'ppt' | 'xls' | 'zip' | 'unknown';
const fileTypeToIcon: Record<FileType, React.JSX.Element> = {
    '': <PdfIcon className="h-10 w-10 flex-shrink-0 text-red-600" />,
    doc: <WordIcon className="h-10 w-10 flex-shrink-0 text-blue-500" />,
    hwp: <HwpIcon className="h-10 w-10 flex-shrink-0 text-blue-500" />,
    ppt: <PptIcon className="h-10 w-10 flex-shrink-0 text-red-600" />,
    xls: <ExcelIcon className="h-10 w-10 flex-shrink-0 text-green-500" />,
    zip: <ZipIcon className="h-10 w-10 flex-shrink-0 text-gray-500" />,
    unknown: <NormalFile className="h-10 w-10 flex-shrink-0 text-blue-500" />,
};
function isFileType(value: string): value is FileType {
    return value in fileTypeToIcon;
}

function ChatRoomContentPreload({ chat, isSender }: { chat: Message; isSender: boolean }) {
    const fileType = determineFileType(chat);

    if (fileType.type === 'noOffice') {
        return (
            <>
                {fileType.value === 'image' && (
                    <Link href={chat.fileURL} target="_blank">
                        <Image
                            src={chat.fileURL}
                            alt="image"
                            className={` object-cover ${isSender ? 'rounded-l-xl rounded-br-xl' : 'rounded-r-xl rounded-bl-xl'}`}
                            width={150}
                            height={120}
                        />
                    </Link>
                )}
                {fileType.value === 'message' && (
                    <span
                        className={`inline-block max-w-96 break-words ${isSender ? 'rounded-l-xl rounded-tr-xl bg-primary text-white' : 'rounded-r-xl rounded-bl-xl bg-neutral-200'} px-3 py-2 text-sm`}
                    >
                        {chat.content}
                    </span>
                )}
            </>
        );
    }
    if (isFileType(fileType.value)) {
        return (
            <Link
                href={chat.fileURL}
                target="_blank"
                className={`flex w-64 flex-row  items-center  gap-3  rounded-md border-2  bg-indigo-50  p-2   ${isSender ? ' border-primary' : ' border-neutral-400 bg-neutral-200'}`}
            >
                {fileTypeToIcon[fileType.value]}

                <span className="flex flex-grow flex-row justify-center break-all text-sm ">
                    {fileType.value === 'unknown' ? '알수없음' : chat.content}
                </span>

                <DownLoadIcon className=" h-5 w-5 flex-shrink-0 " />
            </Link>
        );
    }
    if (fileType.type === 'server') {
        return (
            <span
                className={`inline-block max-w-96 break-words ${isSender ? 'rounded-l-xl rounded-tr-xl bg-primary text-white' : 'rounded-r-xl rounded-bl-xl bg-neutral-200'} px-3 py-2 text-sm`}
            >
                {chat.content}
            </span>
        );
    }
}

export default ChatRoomContentPreload;
