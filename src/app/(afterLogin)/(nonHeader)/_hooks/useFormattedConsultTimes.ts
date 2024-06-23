import { useChatStore } from '../../_store/chatStore';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko'); // 기본 로케일을 한국어로 설정합니다.

export const useFormattedTime = () => {
    const { date, startTime, consultTime } = useChatStore(); // Zustand 스토어에서 시간 상태 불러오기

    const dateTimeString = `${date}T${startTime}`; // 시작시간
    const startTimeDate = new Date(dateTimeString); // 시작시간 Date 객체로 변환

    const endTimeDate = new Date(dateTimeString); // 종료시간 Date 객체로 변환
    endTimeDate.setMinutes(startTimeDate.getMinutes() + consultTime); // 상담 시간 + 분 추가

    const formatTime = (date: Date) => {
        const displayTime = dayjs(date).format('A hh:mm');
        return displayTime;
    }; // 시간을 포맷팅
    const formatDate = (date: Date) => {
        const displayDate = dayjs(date).format('YYYY/MM/DD');
        return displayDate;
    }; // 날짜를 포맷팅

    const addExtendedTime = (date: Date) => {
        return function (addMinute: number) {
            const extendedDate = dayjs(date).add(addMinute, 'minute').format('A hh:mm');
            return extendedDate;
        };
    }; //분을 매개변수로 받으면 종료시간에서 연장될 분을 추가

    return {
        formattedTime: formatTime(startTimeDate), // 포맷팅된 시작시간
        formattedEndTime: formatTime(endTimeDate), // 포맷팅된 종료시간
        formattedDate: formatDate(startTimeDate), // 포맷팅된 날짜
        formattedExtendedTime: addExtendedTime(endTimeDate), // 종료시간에서 연장될 분을 추가
    };

    // 변환된 시간 반환
};
