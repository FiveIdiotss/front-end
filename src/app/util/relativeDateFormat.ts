import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko'); // 한국어로 설정

interface RelativeDateFormatResult {
    /** 오직 날짜만 포함된 문자열 */
    onlyDate: string;
    /** 오직 시간만 포함된 문자열 */
    onlyTime: string;
    /** 날짜 또는 시간을 포함하는 문자열. 오늘이면 시간만, 아니면 날짜만 포함. */
    DateOrTime: string;
    /** 상대적인 날짜 또는 시간을 나타내는 문자열 (예: "5분 전", "어제") */
    relativeDateOrTime: string;
}

export const relativeDateFormat = (date: string): RelativeDateFormatResult => {
    const inputDate = dayjs(date);
    const today = dayjs();

    let onlyDate = inputDate.format('YYYY.MM.DD');
    let onlyTime = inputDate.format('HH:mm');
    let DateOrTime;
    let relativeDateOrTime;
    if (today.isSame(inputDate, 'day')) {
        DateOrTime = onlyTime;
        relativeDateOrTime = inputDate.fromNow();
    } else {
        DateOrTime = onlyDate;
        relativeDateOrTime = onlyDate;
    }

    return {
        onlyDate,
        onlyTime,
        DateOrTime,
        relativeDateOrTime,
    };
};
