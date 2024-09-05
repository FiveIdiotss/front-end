'use client';
import { useEffect, useRef, useState } from 'react';
import { usePostsStore } from '@/app/_store/postsStore';
import DaySelectPicker from './DaySelectPicker';
import ArrowDropIcon from '@/app/_icons/common/ArrowDropIcon';

function MentoStepConsultationForm() {
    const { pageStep, setPageStep, mentoForm, setMentoForm, setErrorMessage } = usePostsStore();
    const [isDrop, setIsDrop] = useState(false);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const handleDrop = () => {
        setIsDrop(!isDrop);
    };
    const handleNext = () => {
        // setPageStep(pageStep + 1);
        if (!contentRef.current) return;
        if (mentoForm.date === '') return setErrorMessage('스케줄을 선택해주세요.');
        if (contentRef.current.value === '') return setErrorMessage('메세지를 입력해주세요.');
        setMentoForm(mentoForm.date, contentRef.current.value, mentoForm.time);
        setPageStep(pageStep + 1);
    };
    useEffect(() => {
        if (mentoForm.time.endTime === '' || mentoForm.time.startTime === '') return;
        setIsDrop(false);
    }, [mentoForm.time]);
    return (
        <>
            <div className="mt-7 flex h-fit flex-col gap-2">
                <span className=" text-sm">
                    스케줄 설정
                    <span className="text-red-600"> *</span>
                </span>
                <div
                    className=" flex  h-12 w-full items-center justify-between rounded-md border border-gray-300 px-4 hover:cursor-pointer "
                    onClick={handleDrop}
                >
                    {mentoForm.date === '' ? (
                        <span className="text-sm text-neutral-600 ">날짜 및 시간 선택</span>
                    ) : (
                        <span className="text-sm text-neutral-700 ">
                            {mentoForm.date} / {mentoForm.time.startTime}~{mentoForm.time.endTime}
                        </span>
                    )}
                    <div className="h-6 w-6">
                        <ArrowDropIcon isOpen={isDrop} className="" />
                    </div>
                </div>
            </div>

            <div className=" mt-1  flex   w-full flex-grow flex-col gap-5 overflow-y-auto">
                <DaySelectPicker isDrop={isDrop} />
                <div className="flex flex-col gap-2">
                    <span className=" text-sm">
                        멘토에게 남길 메세지
                        <span className="text-red-600"> *</span>
                    </span>
                    <textarea
                        ref={contentRef}
                        className="h-40 w-full rounded-md border border-gray-300 p-3 outline-none focus:border-primary"
                        placeholder="멘토에게 남길 메세지를 입력해주세요."
                    />
                </div>
            </div>
            <div className="flex h-fit   flex-row justify-end gap-2 ">
                <button
                    className="mt-7 h-10 w-24 rounded-md border border-solid border-gray-300 px-5 text-neutral-500 "
                    onClick={() => setPageStep(pageStep - 1)}
                >
                    이전
                </button>
                <button
                    className="mt-7 h-10 w-24 rounded-md border border-solid border-gray-300 bg-primary px-5 text-white "
                    onClick={handleNext}
                >
                    다음
                </button>
            </div>
        </>
    );
}

export default MentoStepConsultationForm;
