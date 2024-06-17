import React, { useEffect, useState } from 'react';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import { ko } from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import { addMonths } from 'date-fns';
import { usePostsStore } from '@/app/(afterLogin)/_store/postsStore';

const dayMapping: Record<string, number> = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
};

const MyContainer = ({ className, children }: { className: any; children: any }) => {
    return (
        <CalendarContainer className={className}>
            <div className="flex  flex-col pb-2">
                <div style={{ position: 'relative' }}>{children}</div>
                <div className="mb-2 flex flex-row items-center gap-1 pl-5">
                    <div className="h-2 w-2 bg-black" />
                    신청가능
                    <div className="ml-1 h-2 w-2 bg-neutral-300" />
                    신청불가
                </div>
                <span className="flex w-full flex-row justify-end pr-4">최대 3개월 이내의 날짜만 신청 가능합니다.</span>
            </div>
        </CalendarContainer>
    );
}; //날짜 선택 컨테이너
function splitTimes(
    times: { startTime: string; endTime: string }[],
    consultTime: number,
): Array<{ startTime: string; endTime: string }> {
    const splitTimesArray = times.map(({ startTime, endTime }) => {
        const start = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
        const end = parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);

        const splits = [];
        for (let i = start; i < end; i += consultTime) {
            const nextTime = i + consultTime;
            const startHours = Math.floor(i / 60);
            const startMinutes = i % 60;
            const endHours = Math.floor(nextTime / 60);
            const endMinutes = nextTime % 60;
            splits.push({
                startTime: `${startHours.toString().padStart(2, '0')}:${startMinutes.toString().padStart(2, '0')}`,
                endTime: `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`,
            });
        }
        return splits;
    });

    return splitTimesArray.flat();
} //시간대 나누기

function DaySelectPicker({ isDrop }: { isDrop: boolean }) {
    const [selectDate, setSelectDate] = useState<Date | null>(null); //선택된 날짜
    const [timeList, setTimeList] = useState<{ startTime: string; endTime: string }[]>([]); //선택된 날짜에 따른 시간대

    const postsStore = usePostsStore(); //상세 게시글  스토어 사용
    const availableDaysNumbers = postsStore.availableDays.map((day) => dayMapping[day]); //사용가능한 요일 숫자로 변환
    const consultTime = postsStore.consultTime; //상담시간
    const times = postsStore.times; //상담시간대

    // useEffect(() => {
    //     if (postsStore) console.log('postsStore ', postsStore);
    //     console.log(splitTimes(times, consultTime));
    // }, [postsStore]);
    // useEffect(() => {
    //     if (availableDaysNumbers) console.log('availableDaysNumbers', availableDaysNumbers);
    // }, [availableDaysNumbers]);
    useEffect(() => {
        console.log(selectDate);
        setTimeList(splitTimes(times, consultTime));
    }, [selectDate]);

    const handleDateClick = (time: { startTime: string; endTime: string }) => {
        if (selectDate && time) {
            const month = (selectDate.getMonth() + 1).toString().padStart(2, '0'); //월 변환

            const date = `${selectDate.getFullYear()}-${month}-${selectDate.getDate()}`; //선택된 날짜
            postsStore.setMentoForm(date, postsStore.mentoForm.content, time);
            console.log('입력값', date, time);
        }
    };
    useEffect(() => {
        postsStore.setMentoForm('', postsStore.mentoForm.content, { startTime: '', endTime: '' });
    }, [selectDate]);

    return (
        <div
            className={`flex w-full flex-col  ${
                isDrop ? 'transition-all duration-300 ease-in' : ''
            } ${isDrop ? 'max-h-[1500px] opacity-100 ' : ' max-h-0 overflow-hidden opacity-0 '}`}
        >
            <DatePicker
                selected={selectDate}
                locale={ko}
                onChange={(date) => setSelectDate(date)}
                inline
                calendarContainer={MyContainer}
                disabledKeyboardNavigation
                minDate={new Date()}
                maxDate={addMonths(new Date(), 3)}
                filterDate={(date) => availableDaysNumbers.includes(date.getDay())} // excludeDates={[new Date(), addDays(new Date(), 1)]} //나중에 따로 제외 신청된 날짜 설정.
            />
            {selectDate && timeList && (
                <div className="flex  w-full flex-row flex-wrap  gap-2 rounded-b-md border-b border-l border-r border-gray-300 p-5">
                    {timeList.map((time, index) => (
                        <div
                            className={`flex cursor-pointer flex-row rounded-md border border-gray-300 p-2 text-sm hover:bg-slate-100 ${time.startTime === postsStore.mentoForm.time.startTime ? 'bg-slate-200' : ''} `}
                            key={index}
                            onClick={() => handleDateClick(time)}
                        >
                            {time.startTime}~{time.endTime}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DaySelectPicker;
