import { create } from 'zustand';
type Time = {
    key: string;
    startTime: number;
    endTime: number;
};

type UseMentoNewPost = {
    times: Time[];
    interver: number;
    days: string[];
    timeAdditionalInfo?: string;
    title: string;
    tags?: string[];
    category: string;
    content: string;
    setTimes: (newTime: Time) => void;
    deleteTimes: (key: string) => void;
    setContent: (content: string) => void;
};
const useMentoNewPost = create<UseMentoNewPost>((set) => ({
    times: [],
    interver: 30,
    days: [],
    timeAdditionalInfo: '', //기타사항
    title: '',
    tags: [],
    category: '', //카테고리
    content: '',
    setTimes: (newTime) => set((state) => ({ times: [...state.times, newTime] })),
    deleteTimes: (key) => set((state) => ({ times: state.times.filter((time) => time.key !== key) })),
    setContent: (content) => set({ content }),
}));

export default useMentoNewPost;
