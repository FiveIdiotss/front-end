import { useEffect, useState } from 'react';
import { useMentorDetailQuery } from '../../posts/_lib/mentorService';
import { v4 as uuidv4 } from 'uuid';
function convertTimeToMinutes(time: string) {
    const [hours, minutes] = time.split(':').map(Number); // "04:25"를 ":"로 분리하고, 각각 숫자로 변환
    return hours * 60 + minutes; // 시간을 분으로 변환 후, 분을 더함
}
const transformTimes = (times: { startTime: string; endTime: string }[]) => {
    return times.map((time) => {
        return {
            key: uuidv4(),
            startTime: convertTimeToMinutes(time.startTime),
            endTime: convertTimeToMinutes(time.endTime),
        };
    });
};

function mapEnglishToDays(days: string[]) {
    const daysInKorean = ['월', '화', '수', '목', '금', '토', '일'];
    const daysInEnglish = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    return days.map((day) => {
        const index = daysInEnglish.indexOf(day);
        return daysInKorean[index];
    });
}

interface timeType {
    key: string;
    startTime: number;
    endTime: number;
}

export type MentorFormType = {
    [key: string]: string | number | string[] | timeType[] | File[] | '';
    availableDays: string[];
    consultTime: number;
    times: timeType[];

    title: string | '';
    introduce: string | '';
    boardCategory: string | '';
    target: string | '';
    content: string | '';
    mainImage: File[];
};

export const useMentorInitialValue = (editId?: number) => {
    const [initialValues, setInitialValues] = useState<MentorFormType>({
        availableDays: [],
        consultTime: 30,
        times: [],

        title: '',
        introduce: '',
        boardCategory: '',
        target: '',
        content: '',
        mainImage: [],
    });
    const mentorDetailQuery = useMentorDetailQuery({
        mentorId: editId || 0,
        enabled: Boolean(editId),
    });
    const { data: mentorDetail, error, isPending } = mentorDetailQuery;

    useEffect(() => {
        if (mentorDetail) {
            setInitialValues({
                availableDays: mapEnglishToDays(mentorDetail.availableDays),
                consultTime: mentorDetail.consultTime,

                times: transformTimes(mentorDetail.times),

                title: mentorDetail.boardDTO.title,
                introduce: mentorDetail.boardDTO.introduce,
                boardCategory: mentorDetail.boardDTO.boardCategory,
                target: mentorDetail.boardDTO.target,
                content: mentorDetail.boardDTO.content,
                mainImage: initialValues.mainImage,
            });
        }
    }, [mentorDetail]);

    return { initialValues, isPending: Boolean(editId) && isPending, error };
};
