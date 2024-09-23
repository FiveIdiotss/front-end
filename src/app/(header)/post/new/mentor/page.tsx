'use client';
import React, { FormEvent, useCallback, useState } from 'react';
import checkIcon from '@/../public/check.png';
import Image from 'next/image';
import calenderCheckIcon from '@/../public/calendarCheck.png';
import ScheduleSet from '../../_components/ScheduleSet';
import useMentoNewPost from '../../../../_store/mentoNewPost';
import InfoModal from '../../_components/InfoModal';
import WarningMessage from '@/app/_component/WarningMessage';
import { useRouter } from 'next/navigation';
import { debounce } from 'lodash';
import SubmitButton from '../../_components/SubmitButton';
import { usePostMentorMutation } from '../../_lib/uploadMentorService';
import dynamic from 'next/dynamic';
import { pushNotification } from '@/app/util/pushNotification';
import MentoringSchedule from '../../_components/TestSchedule';

const QuillEditor = dynamic(() => import('../../_components/Editor'), { ssr: false });

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

function MentorFormPage() {
    const [completeModalOpen, setCompleteModalOpen] = React.useState(false);
    const [warningModalOpen, setWarningModalOpen] = React.useState('');
    const [mainImage, setMainImage] = useState<File[]>([]);

    const router = useRouter();
    const titleRef = React.useRef<HTMLInputElement>(null); //제목
    const introduceRef = React.useRef<HTMLInputElement>(null); //간략한 소개글
    const targetRef = React.useRef<HTMLInputElement>(null); //멘토링 대상 키워드
    const categoryRef = React.useRef<HTMLSelectElement>(null); //카테고리

    const state = useMentoNewPost();
    const { content, setContent } = useMentoNewPost();

    const postMentorMutation = usePostMentorMutation();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formatTimes = state.times.map((time) => ({
            startTime: formatTime(time.startTime),
            endTime: formatTime(time.endTime),
        }));
        const days = mapDaysToEnglish(state.days);

        if (
            !titleRef.current?.value ||
            !introduceRef.current?.value ||
            !targetRef.current?.value ||
            !categoryRef.current?.value ||
            state.content === '' ||
            state.interver === 0 ||
            days.length === 0 ||
            formatTimes.length === 0
        )
            return pushNotification({
                msg: '모든 항목을 입력해주세요.',
                type: 'error',
                theme: 'light',
                isIcon: false,
                textColor: '#dbc821',
            });
        postMentorMutation.mutate(
            {
                request: {
                    title: titleRef.current?.value,
                    introduce: introduceRef.current?.value,
                    target: targetRef.current?.value,
                    content: state.content,
                    boardCategory: categoryRef.current?.value,
                    consultTime: state.interver,
                    times: formatTimes,
                    availableDays: days,
                    platform: 'WEB',
                },
                images: mainImage,
            },
            {
                onSuccess: () => {
                    setCompleteModalOpen(true);
                },
            },
        );
    };

    const handleInfoClose = () => {
        setCompleteModalOpen(false);
        router.push('/posts/mentor');
    };
    const handleWarningClose = () => {
        setWarningModalOpen('');
    };
    const debouncedHandleSubmit = useCallback(
        debounce((newValue: string, editor: any) => {
            setContent(newValue);
        }, 400), // 디바운스 시간을 300ms로 설정
        [],
    ); //
    const handleMainImage = async (file: File) => {
        setMainImage([...mainImage, file]);
    };
    return (
        <form className="flex w-full  flex-col pb-36" onSubmit={onSubmit}>
            <div className="  flex min-h-12 w-full flex-row items-center justify-center  bg-indigo-100 p-3">
                <Image src={calenderCheckIcon} alt="check" className="h-6 w-6" />
                <span className="  ml-4 text-sm text-primary  mobile:text-base ">
                    요일과 시간을 선택해주세요. 선택한 요일에 동일하게 적용됩니다.
                </span>
            </div>
            {/* <MentoringSchedule /> */}
            <ScheduleSet />
            {/* 요일 선택창 */}
            <div className=" mt-20 flex min-h-12  flex-row items-center justify-center  bg-indigo-100  p-3">
                <Image src={checkIcon} alt="check" className="h-6 w-6" />
                <span className="  ml-4 text-sm  text-primary mobile:text-base ">
                    멘토 모집글 작성 예시를 참고해주세요.&nbsp; 꼼꼼히 작성하면 많은 사람들이 볼 가능성이 커져요
                </span>
            </div>
            <input
                type="text"
                ref={titleRef}
                className="mt-6 w-full bg-inherit text-2xl outline-none"
                placeholder="제목에 핵심 내용을 요약해보세요."
            />
            {/* 제목 입력창 */}
            <input
                type="text"
                ref={introduceRef}
                className="mt-6 w-full bg-inherit text-base outline-none mobile:w-1/2"
                placeholder="간략한 소개글"
            />
            {/* 소개글 입력창 */}
            <select
                ref={categoryRef}
                className="mt-6 w-52 cursor-pointer  rounded-md border border-neutral-400 bg-inherit p-2  text-sm text-gray-400 outline-none"
                defaultValue=""
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
            <input
                type="text"
                ref={targetRef}
                className="mb-4 mt-6 w-full bg-inherit text-base outline-none mobile:w-1/2"
                placeholder="멘토링 대상"
            />
            {/* 대상 키워드 입력창 */}
            {/* <TinyMceEditor />  */}
            <QuillEditor
                defualtValue={defaultContent}
                setContent={setContent}
                content={content}
                setMainImage={handleMainImage}
            />
            <SubmitButton type="submit" cancelUrl="/quest" isLoading={postMentorMutation.isPending} />
            {/* 모달 */}
            <InfoModal
                open={completeModalOpen}
                onClose={handleInfoClose}
                completeText={'등록이 완료되었습니다.'}
                pageText={'잠시후 멘토링 게시판으로 이동합니다.'}
            />
            <WarningMessage text={warningModalOpen} isOpen={warningModalOpen !== ''} onClose={handleWarningClose} />
        </form>
    );
}

export default MentorFormPage;
