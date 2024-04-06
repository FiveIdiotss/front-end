'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import ModalWrapper from '../../_component/ModalWrapper';
import BackButton from '@/app/(beforeLogin)/_component/BackButton';

const text = `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`;

function MentoModal({ id }: { id?: string }) {
    return (
        <ModalWrapper className="max-h-[750px]  sm:max-w-[600px]  ">
            <div className="flex h-full w-full flex-col rounded-xl bg-white  p-7  shadow-xl">
                <div className="flex h-10 w-full flex-row items-center ">
                    <span className="text-xl font-semibold tracking-wide ">멘토링 소개</span>
                    <div className="flex flex-grow flex-row justify-end">
                        <BackButton />
                    </div>
                </div>

                <div className="mt-7 flex  w-full flex-grow flex-col overflow-y-scroll">
                    <div className="flex  h-full w-full flex-col  ">
                        <div className="flex  w-full flex-col">
                            <span className=" mb-2 font-semibold">멘토링 제목</span>
                            <span className="  font-semibold">{}</span>
                        </div>
                        <div className="flex h-full w-full flex-col">
                            <span className=" mb-2 font-semibold">멘토링 설명</span>
                            <span className="font-sans text-base font-extralight ">{text}</span>
                        </div>
                    </div>
                </div>

                <div className="flex h-fit w-full  justify-end">
                    <button className="mt-7 h-10  rounded-md border border-solid border-gray-300 bg-primary px-5 text-white hover:order-3">
                        신청하기
                    </button>
                </div>
            </div>
        </ModalWrapper>
    );
}

export default MentoModal;
