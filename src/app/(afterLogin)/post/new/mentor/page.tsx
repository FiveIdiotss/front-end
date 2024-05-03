'use client';
import React, { useEffect } from 'react';
import checkIcon from '@/../public/check.png';
import Image from 'next/image';
import calenderCheckIcon from '@/../public/calendarCheck.png';
import ScheduleSet from '../../_components/ScheduleSet';
import TinyMceEditor from '../../_components/TinyMceEditor';
import useMentoNewPost from '../../../_store/mentoNewPost';
import { useMutation } from '@tanstack/react-query';
import Axios from '@/app/util/axiosInstance';
import Modal from '@/app/(afterLogin)/_component/Modal';
import InfoModal from '../../_components/InfoModal';
import WarningMessage from '@/app/_component/WarningMessage';
import { set } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Loading from '@/app/_component/Loading';

type newPostFormData = {
    title: string;
    introduce: string;
    target: string;
    content: string;
    consultTime: number;
    boardType: string;
    times: { startTime: string; endTime: string }[];
    availableDays: string[];
};

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
    const router = useRouter();
    const titleRef = React.useRef<HTMLInputElement>(null); //제목
    const introduceRef = React.useRef<HTMLInputElement>(null); //간략한 소개글
    const targetRef = React.useRef<HTMLInputElement>(null); //멘토링 대상 키워드
    const categoryRef = React.useRef<HTMLSelectElement>(null); //카테고리

    const state = useMentoNewPost();
    const mutation = useMutation({
        mutationFn: (data: newPostFormData) => Axios.post('/api/board', data),

        onSuccess: () => {
            setCompleteModalOpen(true);
        },
        onError: () => {
            setWarningModalOpen('등록에 실패했습니다. 다시 시도해주세요.');
        },
    }); //useMutation 사용

    const handleSubmit = () => {
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
            return setWarningModalOpen('모든 항목을 입력해주세요.');
        const data = {
            title: titleRef.current?.value,
            introduce: introduceRef.current?.value,
            target: targetRef.current?.value,
            content: state.content,
            boardCategory: categoryRef.current?.value,
            consultTime: state.interver,
            boardType: 'MENTOR',
            times: formatTimes,
            availableDays: days,
        };
        mutation.mutate(data);

        console.log('submit', data);
    };

    const handleInfoClose = () => {
        setCompleteModalOpen(false);
        router.push('/posts/mentor');
    };
    const handleWarningClose = () => {
        setWarningModalOpen('');
    };

    return (
        <>
            <div className=" mt-10 flex h-14 w-full flex-row items-center justify-center rounded-lg bg-indigo-100">
                <Image src={calenderCheckIcon} alt="check" className="h-6 w-6" />
                <span className="  ml-4 text-base text-primary ">
                    가능한 요일과 시간을 선택해주세요.&nbsp; 선택된 요일에 일괄 적용됩니다.
                </span>
            </div>
            <ScheduleSet /> {/* 요일 선택창 */}
            <div className=" mt-10 flex h-14 flex-row items-center justify-center rounded-lg bg-indigo-100">
                <Image src={checkIcon} alt="check" className="h-6 w-6" />
                <span className="  ml-4 text-base text-primary ">
                    멘토 모집글 작성 예시를 참고해주세요.&nbsp; 꼼꼼히 작성하면 많은 사람들이 볼 가능성이 커져요
                </span>
            </div>
            <input
                ref={titleRef}
                className="mt-6 w-full bg-inherit text-3xl outline-none"
                placeholder="제목에 핵심 내용을 요약해보세요."
            />
            {/* 제목 입력창 */}
            <input
                ref={introduceRef}
                className="mt-6 w-1/2 bg-inherit text-base outline-none"
                placeholder="간략한 소개글"
            />
            {/* 소개글 입력창 */}
            <select
                ref={categoryRef}
                className="mt-6 w-52 rounded-md  border border-neutral-400 bg-inherit p-2 text-sm  text-gray-400 outline-none"
            >
                <option selected disabled hidden value="">
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
                ref={targetRef}
                className="mt-6 w-1/2 bg-inherit text-base outline-none"
                placeholder="멘토링 대상 키워드(7개이하/ , 으로 구분 작성해주세요.)"
            />
            {/* 대상 키워드 입력창 */}
            <TinyMceEditor /> {/* 본문 입력창 */}
            <div className="mb-4 flex flex-row justify-end gap-4">
                <button className="h-11 w-20 rounded-md border border-neutral-300 hover:bg-neutral-200">취소</button>
                <button
                    className={`h-11 w-20 rounded-md bg-primary text-white hover:opacity-80 ${mutation.isPending ? 'hidden' : ''}`}
                    onClick={handleSubmit}
                >
                    등록
                </button>

                <button
                    className={`h-11  w-20 rounded-md bg-primary text-white hover:opacity-80 ${mutation.isPending ? '' : 'hidden'}`}
                >
                    <Loading />
                </button>
            </div>
            {/* 모달 */}
            <InfoModal
                open={completeModalOpen}
                onClose={handleInfoClose}
                completeText={'등록이 완료되었습니다.'}
                pageText={'잠시후 게시판으로 이동합니다.'}
            />
            <WarningMessage text={warningModalOpen} isOpen={warningModalOpen !== ''} onClose={handleWarningClose} />
        </>
    );
}

export default MentorFormPage;
