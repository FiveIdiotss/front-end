'use client';
import React, { use, useCallback, useState } from 'react';
import TimeSelectModal from './TimeSelectModal';
import CloseIcon from '@/app/_icons/common/CloseIcon';
import { FormikProps } from 'formik';
import { MentorFormType } from '../_util/useMentorInitialValue';
import ValidateContainer from './ValidateContainer';
function formatTime(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours < 12 ? '오전' : '오후';
    return `${period} ${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}
const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

interface Props {
    formik: FormikProps<MentorFormType>;
}

function ScheduleSet({ formik }: Props) {
    const [hovered, setHovered] = useState<string>('');
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const handleAddTimeModal = () => {
        setModalOpen(true);
        formik.setFieldError('times', '');
    }; //시간선택모달열기
    const handleDeleteTime = (key: string) => {
        formik.setFieldValue(
            'times',
            formik.values.times.filter((time) => time.key !== key),
        );
    }; //시간삭제
    const handleInterverChange = (value: number) => {
        formik.setFieldValue('times', []);
        formik.setFieldValue('consultTime', value);
    }; //시간간격설정
    const handledaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (formik.values.availableDays.includes(value)) {
            formik.setFieldValue(
                'availableDays',
                formik.values.availableDays.filter((day) => day !== value),
            );
        } else {
            formik.setFieldValue('availableDays', [...formik.values.availableDays, value]);
        }
        formik.setFieldError('availableDays', '');
    }; //요일선택

    const daysError = formik.errors.availableDays;
    const timesError = formik.errors.times;

    return (
        <>
            <div className="mt-3 flex flex-col  items-start gap-5">
                {/* 요일선택 */}
                <div className={` mt-4 grid w-full grid-cols-7 gap-3  `}>
                    {DAYS.map((day) => (
                        <label
                            key={day}
                            className={`${
                                formik.values.availableDays.includes(day)
                                    ? 'border-blue-300 bg-blue-50 font-semibold text-blue-400'
                                    : ' text-gray-500  hover:bg-blue-50'
                            } flex   cursor-pointer flex-col  items-center justify-center rounded-lg border p-3 text-sm  transition-all mobile:text-base`}
                        >
                            <input
                                type="checkbox"
                                className="hidden"
                                value={day}
                                onChange={handledaysChange}
                                // checked={days.includes(day)}
                            />

                            {day}
                        </label>
                    ))}
                </div>

                {/* 시간선택 */}
                <div className=" mt-6 flex items-center space-x-4">
                    <span className=" text-gray-600">상담시간:</span>

                    <button
                        onClick={() => handleInterverChange(30)}
                        type="button"
                        className={`rounded-lg px-4 py-2 text-sm transition-all  ${
                            formik.values.consultTime === 30
                                ? 'border-blue-300 bg-blue-50 text-blue-400 '
                                : '  border-gray-200 text-gray-600 '
                        }    border focus:outline-none`}
                    >
                        30분
                    </button>

                    <button
                        onClick={() => handleInterverChange(60)}
                        type="button"
                        className={`rounded-lg px-4 py-2 text-sm transition-all  ${
                            formik.values.consultTime === 60
                                ? 'border-blue-300 bg-blue-50 text-blue-500 '
                                : '  border-gray-200 text-gray-600 '
                        }    border focus:outline-none`}
                    >
                        1시간
                    </button>
                </div>
                <div className={` flex w-full flex-wrap gap-2  `}>
                    {formik.values.times.length === 0 && (
                        <span className="text-sm text-gray-400">시간을 추가해주세요.</span>
                    )}
                    {formik.values.times.map((time) => (
                        <div
                            key={time.key}
                            className="flex h-10 cursor-pointer flex-row items-center  justify-center rounded-md border  bg-blue-50 text-gray-700 "
                            onClick={() => handleDeleteTime(time.key)}
                            onMouseEnter={() => setHovered(time.key)}
                            onMouseLeave={() => setHovered('')}
                        >
                            <span className=" ml-3 text-sm ">{`${formatTime(time.startTime)} ~ ${formatTime(time.endTime)}`}</span>
                            <div className="  flex h-full  cursor-pointer items-center justify-center   p-3">
                                <div className=" h-[16px] w-[16px]">
                                    <CloseIcon className={`${hovered ? 'text-red-400' : ''}`} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    className={`w-full rounded-md border bg-gray-50 px-4 py-3 text-sm font-semibold text-blue-400 shadow-sm `}
                    onClick={handleAddTimeModal}
                >
                    시간 추가 +
                </button>
                <div className="flex w-full flex-col rounded-2xl  border border-yellow-200 px-4 py-3 text-sm text-gray-500">
                    <span>
                        <span className="text-red-600">*</span> 선택한 시간 범위에서 자동으로 분할됩니다.
                    </span>
                    <span>
                        ex) 10:00 ~ 12:00 구간에서 30분 간격으로 선택 시, 10:00, 10:30, 11:00, 11:30으로 설정됩니다.
                    </span>
                </div>
            </div>

            {/* 시간선택 모달 */}
            <TimeSelectModal formik={formik} open={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    );
}

export default ScheduleSet;
