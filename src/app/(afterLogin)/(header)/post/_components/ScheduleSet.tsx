'use client';
import React, { use, useCallback, useState } from 'react';

import addTime2 from '@/../public/addTime3.png';
import Image from 'next/image';
import CanselSvg from '@/app/_component/CanselSvg';
import TimeSelectModal from './TimeSelectModal';
import useMentoNewPost from '../../../_store/mentoNewPost';
import warning_yellow from '@/../public/warning_yellow.png';
function formatTime(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours < 12 ? '오전' : '오후';
    return `${period} ${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}
const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

function ScheduleSet() {
    const [hovered, setHovered] = useState<string>('');
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const { times, interver, days } = useMentoNewPost(); //zustand
    const handleAddTimeModal = () => {
        setModalOpen(true);
    }; //시간선택모달열기
    const handleDeleteTime = (key: string) => {
        useMentoNewPost.setState({ times: times.filter((time) => time.key !== key) });
    }; //시간삭제
    const handleInterverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        useMentoNewPost.setState({ times: [] });

        const value = Number(event.target.value);
        useMentoNewPost.setState({ interver: value });
    }; //시간간격설정
    const handledaysChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (days.includes(value)) {
            useMentoNewPost.setState({ days: days.filter((day) => day !== value) });
        } else {
            useMentoNewPost.setState({ days: [...days, value] });
        }
    }; //요일선택

    return (
        <>
            <div className="mt-3 flex flex-col  items-start gap-3">
                {/* 요일선택 */}
                <div className="mt-4 grid w-full grid-cols-4 justify-between  border-b p-2 mobile:grid-cols-7">
                    {DAYS.map((day) => (
                        <label
                            key={day}
                            className="flex cursor-pointer items-center  justify-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-700   hover:bg-gray-300 hover:bg-opacity-15 mobile:text-base"
                        >
                            {day}
                            <input
                                type="checkbox"
                                className="h-4 w-4 cursor-pointer mobile:h-5 mobile:w-5 "
                                value={day}
                                onChange={handledaysChange}
                                checked={days.includes(day)}
                            />
                        </label>
                    ))}
                </div>

                {/* 시간선택 */}
                <div className="flex w-full flex-row flex-wrap items-center justify-start gap-2 border-b py-2">
                    <div className="mb-6 flex w-full  flex-col items-center gap-2 border border-yellow-200 p-2 mobile:flex-row">
                        <div className="flex flex-row items-center gap-2 ">
                            <div className="flex-shrink-0">
                                <Image src={warning_yellow} alt="warning" height={20} width={20} />
                            </div>
                            <span className="ml-2 flex-grow text-xs leading-5 text-gray-500 mobile:text-sm">
                                지정한 시간 범위안에서 자동으로 선택한 시간으로 나눠집니다. <br />예{`)`} 10:00 ~ 12:00
                                사이에 30분 단위로 선택시 10:00, 10:30, 11:00, 11:30 으로 설정됩니다.
                            </span>
                        </div>
                        <div className="mx-3 flex flex-shrink-0    flex-row items-center gap-2 rounded-lg border border-dashed border-neutral-300 p-2">
                            <label className="flex cursor-pointer items-center justify-center  gap-1 text-sm">
                                30분
                                <input
                                    type="radio"
                                    value="30"
                                    checked={interver === 30}
                                    onChange={handleInterverChange}
                                    className="h-4 w-4 cursor-pointer"
                                />
                            </label>
                            <label className="flex cursor-pointer items-center justify-center gap-1 text-center text-sm">
                                1시간
                                <input
                                    type="radio"
                                    value="60"
                                    checked={interver === 60}
                                    onChange={handleInterverChange}
                                    className="h-4 w-4 cursor-pointer"
                                />
                            </label>
                        </div>
                    </div>
                    {times.map((time) => (
                        <div
                            key={time.key}
                            className="flex h-10 flex-row items-center justify-center  rounded-md bg-orange-100 "
                        >
                            <span className=" ml-3 text-sm">{`${formatTime(time.startTime)} ~ ${formatTime(time.endTime)}`}</span>
                            <div
                                className="  flex h-full  cursor-pointer items-center justify-center   p-3"
                                onMouseEnter={() => setHovered(time.key)}
                                onMouseLeave={() => setHovered('')}
                                onClick={() => handleDeleteTime(time.key)}
                            >
                                <div className=" h-[16px] w-[16px]">
                                    <CanselSvg fill={hovered === time.key ? 'red' : 'black'} />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div
                        className="flex h-10 w-28 cursor-pointer flex-row  items-center justify-center gap-1 rounded-md border border-gray-300 bg-gray-100 text-sm text-gray-500  hover:bg-gray-200 "
                        onClick={handleAddTimeModal}
                    >
                        시간 추가 <span className="mt-[1px] text-2xl"> +</span>
                    </div>
                </div>
            </div>

            {/* 시간선택 모달 */}
            <TimeSelectModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    );
}

export default ScheduleSet;
