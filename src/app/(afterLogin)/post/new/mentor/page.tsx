import React from 'react';
import checkIcon from '@/../public/check.png';
import Image from 'next/image';
import calenderCheckIcon from '@/../public/calendarCheck.png';
import ScheduleSet from '../../components/ScheduleSet';

function MentorFormPage() {
    return (
        <>
            <div className=" mt-10 flex h-14 w-full flex-row items-center justify-center rounded-lg bg-indigo-100">
                <Image src={calenderCheckIcon} alt="check" className="h-6 w-6" />
                <span className="  ml-4 text-base text-primary ">
                    가능한 요일과 시간을 선택해주세요.&nbsp; 선택된 요일에 일괄 적용됩니다.
                </span>
            </div>
            <ScheduleSet />

            <div className=" mt-10 flex h-14 flex-row items-center justify-center rounded-lg bg-indigo-100">
                <Image src={checkIcon} alt="check" className="h-6 w-6" />
                <span className="  ml-4 text-base text-primary ">
                    멘토 모집글 작성 예시를 참고해주세요.&nbsp; 꼼꼼히 작성하면 많은 사람들이 볼 가능성이 커져요
                </span>
            </div>
            <input className="mt-6 w-full text-3xl outline-none" placeholder="제목에 핵심 내용을 요약해보세요." />
            <input className="mt-6 w-1/2 text-base outline-none" placeholder="태그를 설정하세요(최대 7개)" />
        </>
    );
}

export default MentorFormPage;
