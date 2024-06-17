import React from 'react';
import { Message } from '../../../_lib/chatContentList';
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

function ChatRoomContentPreload({ chat, isSender }: { chat: Message; isSender: boolean }) {
    let extension; //확장자
    const isImage = chat.fileType === 'IMAGE';
    const isMessage = chat.fileType === 'MESSAGE';
    const video = chat.fileType === 'VIDEO';
    if (!isImage && !isMessage && !video) {
        if (chat.content) {
            extension = chat.content.split('.').pop();
        } else {
            extension = 'unknown'; //확장자
        } //확장자
    } //이미지, 메시지 제외 모두 확장자 추출

    const isPdf = extension === 'pdf';
    const isDoc = extension === 'doc' || extension === 'docx';
    const isHwp = extension === 'hwp';
    const isPpt = extension === 'ppt' || extension === 'pptx';
    const isExcel = extension === 'xls' || extension === 'xlsx';
    const isZip = extension === 'zip';
    const isFile =
        !isImage &&
        !isMessage &&
        !video &&
        !isPdf &&
        !isDoc &&
        !isHwp &&
        !isPpt &&
        !isExcel &&
        !isZip &&
        extension !== 'unknown'; //기타파일

    const isUnknown = extension === 'unknown';
    const handleOpenFile = (url: string) => {
        const width = 600;
        const height = window.screen.height * 0.47;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;

        window.open(
            url,
            'Upload', // 동일한 창 이름을 제공합니다.
            `height=${height}, width=${width}, top=${top}, left=${left} ,resizable=yes`,
        );
    };

    return (
        <>
            {isImage && (
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
            {isMessage && (
                <span
                    className={`inline-block max-w-96 break-words ${isSender ? 'rounded-l-xl rounded-tr-xl bg-primary text-white' : 'rounded-r-xl rounded-bl-xl bg-neutral-200'} px-3 py-2 text-sm`}
                >
                    {chat.content}
                </span>
            )}
            {extension && (
                <Link
                    href={chat.fileURL}
                    target="_blank"
                    className={`flex w-64 flex-row  items-center  gap-3  rounded-md border-2  bg-indigo-50  p-2   ${isSender ? ' border-primary' : ' border-neutral-400 bg-neutral-200'}`}
                >
                    {isPdf && <PdfIcon className="h-10 w-10 flex-shrink-0 text-red-600" />}
                    {isDoc && <WordIcon className="h-10 w-10 flex-shrink-0 text-blue-500" />}
                    {isHwp && <HwpIcon className="h-10 w-10 flex-shrink-0 text-blue-500" />}
                    {isPpt && <PptIcon className="h-10 w-10 flex-shrink-0 text-red-600" />}
                    {isExcel && <ExcelIcon className="h-10 w-10 flex-shrink-0 text-green-500" />}
                    {isZip && <ZipIcon className="h-10 w-10 flex-shrink-0 text-gray-500" />}
                    {isFile && <NormalFile className="h-10 w-10 flex-shrink-0 text-blue-500" />}
                    {isUnknown && <NormalFile className="h-10 w-10 flex-shrink-0 text-gray-500" />}
                    <span className="flex     flex-grow flex-row  justify-center  break-all text-sm ">
                        {isUnknown ? '알수없음' : chat.content}
                    </span>

                    <DownLoadIcon className=" h-5 w-5 flex-shrink-0 " />
                </Link>
            )}
        </>
    );
}

export default ChatRoomContentPreload;
