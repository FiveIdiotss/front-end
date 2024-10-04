'use client';
import React, { useEffect, useState } from 'react';
import checkIcon from '@/../public/check.png';
import Image from 'next/image';
import calenderCheckIcon from '@/../public/calendarCheck.png';
import ScheduleSet from '../ScheduleSet';
import InfoModal from '../InfoModal';
import { useRouter } from 'next/navigation';
import SubmitButton from '../SubmitButton';
import { usePostMentorMutation, useUpdateMentorMutation } from '../../_lib/uploadMentorService';
import dynamic from 'next/dynamic';
import { useFormik } from 'formik';
import { useMentorInitialValue } from '../../_util/useMentorInitialValue';
import { CustomToast } from '@/app/util/customToast/CustomToast';
import Loading from '@/app/_component/Loading';

interface ErrMsgType {
    [key: string]: string;
    title: string;
    introduce: string;
    target: string;
    content: string;
    boardCategory: string;
    consultTime: string;
    availableDays: string;
    times: string;
}

const ERR_MSG: ErrMsgType = {
    title: '제목을 입력해주세요.',
    introduce: '간략한 소개글을 입력해주세요.',
    target: '멘토링 대상을 입력해주세요.',
    content: '멘토링 내용을 입력해주세요.',
    boardCategory: '카테고리를 선택해주세요.',
    consultTime: '상담 시간을 선택해주세요.',
    availableDays: '요일을 선택해주세요.',
    times: '시간을 추가해주세요.',
};

const QuillEditor = dynamic(() => import('../Editor'), { ssr: false });

const defaultContent = ``;

function formatTime(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
} //분단위로 받은 시간을 시간:분 형식으로 변환
function mapDaysToEnglish(days: string[]) {
    const daysInKorean = ['월', '화', '수', '목', '금', '토', '일'];
    const daysInEnglish = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    return days.map((day) => {
        const index = daysInKorean.indexOf(day);
        return daysInEnglish[index];
    });
}

function MentorForm({ editId }: { editId?: number }) {
    const router = useRouter();

    const [completeModalOpen, setCompleteModalOpen] = useState(false); //완료 모달
    const postMentorMutation = usePostMentorMutation(); //멘토 등록 mutation
    const updateMentorMutation = useUpdateMentorMutation(editId); //멘토 수정 mutation

    const { initialValues, isPending } = useMentorInitialValue(editId); //초기값
    const isEditPage = Boolean(editId);

    const formik = useFormik({
        initialValues, // 초기값
        validateOnChange: false, // change 이벤트 발생시 validate 실행 여부
        enableReinitialize: true,

        onSubmit: (values) => {
            const formatTimes = values.times.map((time) => ({
                startTime: formatTime(time.startTime),
                endTime: formatTime(time.endTime),
            }));
            const days = mapDaysToEnglish(values.availableDays);

            let errorMessage: string[] = [];

            Object.keys(values).forEach((key) => {
                const value = values[key];
                if (value === '' || (Array.isArray(value) && value.length === 0)) {
                    if (key === 'mainImage') {
                        return;
                    }

                    formik.setFieldError(key, ERR_MSG[key]);
                    errorMessage = [...errorMessage, ERR_MSG[key]];
                }
            });
            if (errorMessage.length > 0) {
                CustomToast({
                    msg: errorMessage[0],
                    position: 'top-center',
                });
                return;
            }
            if (isEditPage) {
                updateMentorMutation.mutate(
                    {
                        title: values.title,
                        introduce: values.introduce,
                        target: values.target,
                        content: values.content,
                        boardCategory: values.boardCategory,
                        consultTime: values.consultTime,
                        times: formatTimes,
                        availableDays: days,
                        platform: 'WEB',
                        images: values.mainImage,
                    },
                    {
                        onSuccess: () => {
                            setCompleteModalOpen(true);
                        },
                    },
                );
                return;
            } else {
                postMentorMutation.mutate(
                    {
                        title: values.title,
                        introduce: values.introduce,
                        target: values.target,
                        content: values.content,
                        boardCategory: values.boardCategory,
                        consultTime: values.consultTime,
                        times: formatTimes,
                        availableDays: days,
                        platform: 'WEB',
                        images: values.mainImage,
                    },
                    {
                        onSuccess: () => {
                            setCompleteModalOpen(true);
                        },
                    },
                );
            }
        },
    });

    const handleInfoClose = () => {
        setCompleteModalOpen(false);
        if (isEditPage) {
            router.back();
        } else {
            router.push('/posts/mentor');
        }
    };

    if (isPending) return <Loading description="잠시만 기다려주세요..." />;

    return (
        <form className="flex w-full  flex-col pb-36" onSubmit={formik.handleSubmit}>
            <div className="  flex min-h-12 w-full flex-row items-center justify-center  bg-orange-100 p-3">
                <Image src={calenderCheckIcon} alt="check" className="h-6 w-6" />
                <span className="  ml-4 text-sm text-black  mobile:text-base ">
                    요일과 시간을 선택해주세요. 선택한 요일에 동일하게 적용됩니다.
                </span>
            </div>
            <ScheduleSet formik={formik} />
            {/* 요일 선택창 */}
            <div className=" mt-20 flex min-h-12  flex-row items-center justify-center  bg-orange-100  p-3">
                <Image src={checkIcon} alt="check" className="h-6 w-6" />
                <span className="  ml-4 text-sm  text-black mobile:text-base ">
                    멘토 모집글 작성 예시를 참고해주세요.&nbsp; 꼼꼼히 작성하면 많은 사람들이 볼 가능성이 커져요
                </span>
            </div>
            <input
                type="text"
                onChange={(e) => formik.setFieldValue('title', e.target.value)}
                className="mt-6 w-full bg-inherit text-2xl text-gray-800 outline-none"
                placeholder="제목에 핵심 내용을 요약해보세요."
                value={formik.values.title}
            />
            {/* 제목 입력창 */}
            <input
                type="text"
                onChange={(e) => formik.setFieldValue('introduce', e.target.value)}
                className="mt-6 w-full bg-inherit text-base text-gray-800 outline-none mobile:w-1/2"
                placeholder="간략한 소개글"
                value={formik.values.introduce}
            />
            {/* 소개글 입력창 */}
            <select
                onChange={(e) => formik.setFieldValue('boardCategory', e.target.value)}
                className={`mt-6 w-52 cursor-pointer rounded-md border border-gray-400 bg-inherit p-2 text-sm outline-none ${
                    formik.values.boardCategory === '' ? 'text-gray-500' : 'text-gray-800'
                }`}
                value={formik.values.boardCategory}
            >
                <option disabled hidden value="">
                    카테고리 선택(필수)
                </option>
                <option value="이공">이공</option>
                <option value="자연">자연</option>
                <option value="인문">인문</option>
                <option value="사회">사회</option>
                <option value="의약">의약</option>
                <option value="예체능">예체능</option>
                <option value="사범">사범</option>
            </select>

            {/* 대상 키워드 입력창 */}
            <input
                type="text"
                onChange={(e) => formik.setFieldValue('target', e.target.value)}
                className="mb-4 mt-6 w-full bg-inherit text-base text-gray-800 outline-none mobile:w-1/2"
                placeholder="멘토링 대상"
                value={formik.values.target}
            />
            {/* <TinyMceEditor />  */}
            <QuillEditor defualtValue={defaultContent} formik={formik} />
            <SubmitButton
                type="submit"
                cancelUrl="/quest"
                submitLabel={isEditPage ? '수정하기' : '작성하기'}
                isLoading={postMentorMutation.isPending}
            />
            {/* 모달 */}
            <InfoModal
                open={completeModalOpen}
                onClose={handleInfoClose}
                completeText={isEditPage ? '수정이 완료되었습니다.' : '작성이 완료되었습니다.'}
                pageText={isEditPage ? '잠시후 이전 페이지로 이동합니다.' : '잠시후 게시판으로 이동합니다.'}
            />
        </form>
    );
}

export default MentorForm;
