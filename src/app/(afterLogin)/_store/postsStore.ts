import { create } from 'zustand';
type PostsStore = {
    pageStep: number; //0,1,2 페이지 스텝
    errorMessage: string; //에러메세지
    availableDays: string[]; //멘토의 가능한 요일
    consultTime: number; //상담시간이 30분,60분 단위인지
    times: { startTime: string; endTime: string }[]; //멘토의 가능한 시간
    mentoName: string;
    title: string; //멘토링명
    unavailableTimes?: { data: string; startTime: string }[]; //멘토의 불가능한 시간 선택사항
    mentoForm: {
        date: string;
        content: string;
        time: { startTime: string; endTime: string };
    }; //멘토링 신청서
    setPageStep: (pageStep: number) => void;
    setErrorMessage: (errorMessages: string) => void;
    setSchedule: (
        availableDays: string[],
        consultTime: number,
        times: { startTime: string; endTime: string }[],
        mentoName: string,
        title: string,
    ) => void;
    setMentoForm: (date: string, content: string, time: { startTime: string; endTime: string }) => void;

    setInit: () => void;
};
export const usePostsStore = create<PostsStore>((set) => ({
    pageStep: 0,
    errorMessage: '',
    availableDays: [],
    consultTime: 0,
    times: [],
    mentoName: '',
    title: '',
    unavailableTimes: [],
    mentoForm: {
        date: '',
        content: '',
        time: { startTime: '', endTime: '' },
    },
    setPageStep: (pageStep: number) => {
        set({ pageStep });
    },
    setErrorMessage: (errorMessage: string) => {
        set({ errorMessage });
    },
    setSchedule: (
        availableDays: string[],
        consultTime: number,
        times: { startTime: string; endTime: string }[],
        mentoName: string,
        title: string,
    ) => {
        set({
            availableDays: availableDays,
            consultTime: consultTime,
            times: times,
            mentoName: mentoName,
            title: title,
        }); //혹시나 서버에서 받아올 이름이 변경될수 있어서
    },
    setMentoForm: (date: string, content: string, time: { startTime: string; endTime: string }) => {
        set({ mentoForm: { date: date, content: content, time: time } }); //멘토링 신청서
    },
    setInit: () => {
        set({
            pageStep: 0,
            availableDays: [],
            consultTime: 0,
            times: [],
            unavailableTimes: [],
            mentoForm: { date: '', content: '', time: { startTime: '', endTime: '' } },
        });
    },
}));
