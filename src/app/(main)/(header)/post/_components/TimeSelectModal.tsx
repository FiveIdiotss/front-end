'use client';
import React, { useEffect, useState } from 'react';
import Modal from '../../../_component/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale/ko';
import { v4 as uuidv4 } from 'uuid';
import useMentoNewPost from '../../../_store/mentoNewPost';

type Props = {
    open: boolean;
    onClose: () => void;
};

function dateToMinutes(date: Date): number {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return hours * 60 + minutes;
} //시간, 분을 받아서 분으로 바꿔주는 함수

function TimeSelectModal({ open, onClose }: Props) {
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);
    const { times, interver } = useMentoNewPost(); //zustand
    useEffect(() => {
        if (startTime && endTime) {
            useMentoNewPost.getState().setTimes({
                key: uuidv4(),
                startTime: dateToMinutes(startTime),
                endTime: dateToMinutes(endTime),
            });
            setStartTime(null);
            setEndTime(null);
            onClose();
        }
    }, [endTime, startTime, onClose]);
    useEffect(() => {
        setStartTime(null);
        setEndTime(null);
    }, [onClose]);

    return (
        <Modal open={open} onClose={onClose} className="max-h-[200px] w-full max-w-[300px]">
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-xl bg-white">
                <DatePicker
                    selected={startTime}
                    onChange={(time) => setStartTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={interver}
                    timeCaption="Time"
                    dateFormat="aa HH:mm 시작"
                    locale={ko}
                    placeholderText="시작 시간"
                    className="flex w-full cursor-pointer items-center justify-center rounded-lg  border-2 border-neutral-500 px-2 py-3 focus:border-primary focus:outline-none"
                    filterTime={(time) => {
                        const dateToMinute = dateToMinutes(time);
                        for (let i = 0; i < times.length; i++) {
                            if (times[i].startTime > times[i].endTime) {
                                if (dateToMinute > times[i].startTime || dateToMinute < times[i].endTime) {
                                    return false;
                                }
                            }
                            if (dateToMinute > times[i].startTime && dateToMinute < times[i].endTime) {
                                return false;
                            }
                            for (let j = 0; j < times.length; j++) {
                                if (
                                    i !== j &&
                                    ((times[i].endTime === times[j].startTime && dateToMinute === times[i].endTime) ||
                                        (times[i].startTime === times[j].endTime &&
                                            dateToMinute === times[i].startTime))
                                ) {
                                    return false;
                                }
                            }
                        }

                        // 위의 모든 조건을 만족하면, 이 시간을 선택할 수 있음
                        return true;
                    }}
                />
                {startTime && (
                    <DatePicker
                        selected={endTime}
                        onChange={(time) => setEndTime(time)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={interver}
                        timeCaption="Time"
                        dateFormat="aa HH:mm 종료"
                        locale={ko}
                        placeholderText="종료 시간"
                        filterTime={(time) => {
                            const dateToMinute = dateToMinutes(time);
                            if (dateToMinute === dateToMinutes(startTime)) {
                                return false;
                            }
                            for (let i = 0; i < times.length; i++) {
                                if (times[i].startTime > times[i].endTime) {
                                    if (dateToMinute > times[i].startTime || dateToMinute < times[i].endTime) {
                                        return false;
                                    }
                                }
                                if (dateToMinute > times[i].startTime && dateToMinute < times[i].endTime) {
                                    return false;
                                }
                                for (let j = 0; j < times.length; j++) {
                                    if (
                                        i !== j &&
                                        ((times[i].endTime === times[j].startTime &&
                                            dateToMinute === times[i].endTime) ||
                                            (times[i].startTime === times[j].endTime &&
                                                dateToMinute === times[i].startTime))
                                    ) {
                                        return false;
                                    }
                                }
                            }

                            // 위의 모든 조건을 만족하면, 이 시간을 선택할 수 있음
                            return true;
                        }}
                        className="flex w-full  cursor-pointer items-center justify-center  rounded-lg border-2 border-neutral-500 px-2 py-3 focus:border-primary focus:outline-none"
                    />
                )}
            </div>
        </Modal>
    );
}
export default TimeSelectModal;
