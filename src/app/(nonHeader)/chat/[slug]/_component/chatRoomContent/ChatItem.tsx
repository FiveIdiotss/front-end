import React from 'react';
import { Message } from '../../_lib/chatContentList';
import Link from 'next/link';
import Image from 'next/image';
import PdfIcon from '@/app/_icons/Chat/PdfIcon';
import DownLoadIcon from '@/app/_icons/Chat/DownLoadIcon';
import WordIcon from '@/app/_icons/Chat/WordIcon';
import HwpIcon from '@/app/_icons/Chat/HwpIcon';
import PptIcon from '@/app/_icons/Chat/PptIcon';
import ExcelIcon from '@/app/_icons/Chat/ExcelIcon';
import ZipIcon from '@/app/_icons/Chat/ZipIcon';
import NormalFile from '@/app/_icons/Chat/NormalFile';
import SystemMessageItem from './systemMessage/SystemMessageItem';
type ValueType =
    | 'pdf'
    | 'doc'
    | 'hwp'
    | 'ppt'
    | 'xls'
    | 'zip'
    | 'unknown'
    | 'image'
    | 'text'
    | 'video'
    | 'consultExtend'
    | 'consultExtendDecline'
    | 'consultExtendAccept'
    | 'consultExtendComplete';

type NoOfficeValueType = 'image' | 'text' | 'video';
type OfficeValueType = 'pdf' | 'doc' | 'hwp' | 'ppt' | 'excel' | 'zip' | 'unknown';
export type ServerValueType =
    | 'consultExtend'
    | 'consultExtendDecline'
    | 'consultExtendAccept'
    | 'consultExtendComplete';

const noOfficeFileTypeMapping: { [key: string]: NoOfficeValueType } = {
    IMAGE: 'image',
    TEXT: 'text',
    VIDEO: 'video',
    //기본
};
const officeFileTypeMapping: { [key: string]: OfficeValueType } = {
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
const serverMessageTypeMapping: { [key: string]: ServerValueType } = {
    CONSULT_EXTEND: 'consultExtend',
    CONSULT_EXTEND_DECLINE: 'consultExtendDecline',
    CONSULT_EXTEND_ACCEPT: 'consultExtendAccept',
    CONSULT_EXTEND_COMPLETE: 'consultExtendComplete',

    //서버에서 보내는 상담 연장 메시지
};

function determineFileType(
    chat: Message,
):
    | { type: 'noOffice'; value: NoOfficeValueType }
    | { type: 'office'; value: OfficeValueType }
    | { type: 'server'; value: ServerValueType } {
    if (noOfficeFileTypeMapping[chat.messageType]) {
        return { type: 'noOffice', value: noOfficeFileTypeMapping[chat.messageType] };
    } else if (serverMessageTypeMapping[chat.messageType]) {
        return { type: 'server', value: serverMessageTypeMapping[chat.messageType] };
    } else {
        const extension = chat.content.split('.').pop();
        if (extension && officeFileTypeMapping[extension]) {
            return { type: 'office', value: officeFileTypeMapping[extension] };
        } else {
            return { type: 'office', value: 'unknown' };
        }
    }
} //파일 타입을 구분하는 함수

type FileType = 'pdf' | 'doc' | 'hwp' | 'ppt' | 'xls' | 'zip' | 'unknown'; //나머지는 unknown으로 분류
const fileTypeToIcon: Record<FileType, React.JSX.Element> = {
    pdf: <PdfIcon className="h-10 w-10 flex-shrink-0 text-red-600" />,
    doc: <WordIcon className="h-10 w-10 flex-shrink-0 text-blue-500" />,
    hwp: <HwpIcon className="h-10 w-10 flex-shrink-0 text-blue-500" />,
    ppt: <PptIcon className="h-10 w-10 flex-shrink-0 text-red-600" />,
    xls: <ExcelIcon className="h-10 w-10 flex-shrink-0 text-green-500" />,
    zip: <ZipIcon className="h-10 w-10 flex-shrink-0 text-gray-500" />,
    unknown: <NormalFile className="h-10 w-10 flex-shrink-0 text-blue-500" />,
}; //파일 아이콘 매핑

function isMessageType(value: string): value is FileType {
    return value in fileTypeToIcon;
}
type Props = {
    chat: Message;
    isUserSentMessage: boolean;
    isLoginMentor: boolean;
};

function ChatItem({ chat, isUserSentMessage, isLoginMentor }: Props) {
    const messageType = determineFileType(chat);

    if (messageType.type === 'noOffice') {
        return (
            <>
                {messageType.value === 'image' && (
                    <Link href={chat.fileURL} target="_blank">
                        <Image
                            src={chat.fileURL}
                            alt="image"
                            className={` object-cover ${isUserSentMessage ? 'rounded-l-xl rounded-br-xl' : 'rounded-r-xl rounded-bl-xl'}`}
                            width={150}
                            height={120}
                        />
                    </Link>
                )}
                {messageType.value === 'text' && (
                    <p
                        className={` inline-block min-w-0 max-w-72  overflow-auto   break-words ${isUserSentMessage ? 'rounded-l-xl rounded-tr-xl bg-primary text-white' : 'rounded-r-xl rounded-bl-xl bg-neutral-200'} px-3 py-2 text-sm`}
                        style={{ whiteSpace: 'pre-wrap' }}
                    >
                        {chat.content}
                    </p>
                )}
            </>
        );
    } //office관련 문서가 아닌 파일

    if (isMessageType(messageType.value)) {
        return (
            <Link
                href={chat.fileURL}
                target="_blank"
                className={`flex w-64 flex-row  items-center  gap-3  rounded-md border-2  bg-indigo-50  p-2   ${isUserSentMessage ? ' border-primary' : ' border-neutral-400 bg-neutral-200'}`}
            >
                {fileTypeToIcon[messageType.value]}

                <span className="flex flex-grow flex-row justify-center break-all text-sm ">
                    {messageType.value === 'unknown' ? '알수없음' : chat.content}
                </span>

                <DownLoadIcon className=" h-5 w-5 flex-shrink-0 " />
            </Link>
        );
    } //office관련 문서거나 unknown인 파일

    if (messageType.type === 'server') {
        return <SystemMessageItem chat={chat} isUserSentMessage={isUserSentMessage} messageType={messageType} />;
    } //서버에서 보내는 Notification
}

export default ChatItem;
