'use client';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import addTime2 from '@/../public/addTime3.png';
import Image from 'next/image';
import CanselSvg from '@/app/_component/CanselSvg';
function ScheduleSet() {
    type Time = {
        key: string;
        startTime: string;
        endTime: string;
    };
    const [hovered, setHovered] = useState<string>('');

    const days = ['월', '화', '수', '목', '금', '토', '일'];
    const [times, setTimes] = useState<Time[]>([]);

    const addTimeHandler = () => {
        {
            setTimes([
                ...times,
                {
                    key: uuidv4(), // 고유한 값을 생성하는 라이브러리
                    startTime: '오후 0시',
                    endTime: '오후 0시',
                },
            ]);
        }
    };
    const deleteTimeHandler = (key: string) => {
        setTimes(times.filter((time) => time.key !== key));
    };

    return (
        <div className="mt-3 flex flex-col  items-start gap-3">
            <div className="mt-4 flex w-full flex-row justify-start gap-10 border-b p-2">
                {days.map((day) => (
                    <div key={day} className="cursor-pointer  rounded-3xl hover:bg-indigo-100">
                        <span className="mr-2 text-lg">{day}</span>
                        <input type="checkbox" className="h-4 w-4" />
                    </div>
                ))}
            </div>
            {/* <div className="mt-4 flex flex-row gap-3 ">
                <span>시작 시간</span>
                <input type="time" className="bg-inherit" />
            </div>
            <div className="mt-4 flex flex-row gap-3 ">
                <span>종료 시간</span>
                <input type="time" className="bg-inherit" />
            </div> */}
            <div className="flex w-full flex-row flex-wrap items-center justify-start gap-2 border-b py-2">
                {times.map((time) => (
                    <div
                        key={time.key}
                        className="flex h-10 flex-row items-center justify-center  rounded-md bg-orange-100 "
                    >
                        <span className=" ml-3 text-sm">{`${time.startTime} ~ ${time.endTime}`}</span>
                        <div
                            className="  flex h-full  cursor-pointer items-center justify-center   p-3"
                            onMouseEnter={() => setHovered(time.key)}
                            onMouseLeave={() => setHovered('')}
                            onClick={() => deleteTimeHandler(time.key)}
                        >
                            <div className=" h-[16px] w-[16px]">
                                <CanselSvg fill={hovered === time.key ? 'red' : 'black'} />
                            </div>
                        </div>
                    </div>
                ))}
                <div
                    className="flex h-9 w-28 cursor-pointer flex-row items-center justify-center gap-1 rounded-md border border-indigo-200 bg-gray-100 text-sm  hover:scale-105 hover:bg-gray-200 hover:font-bold"
                    onClick={addTimeHandler}
                >
                    시간 추가
                    <Image alt="addTime" src={addTime2} className="h-6 w-6 " />
                </div>
            </div>
            <textarea className="mt-4 h-24 w-full rounded-lg bg-inherit p-2 outline-none" placeholder="기타 사항" />
        </div>
    );
}

export default ScheduleSet;
