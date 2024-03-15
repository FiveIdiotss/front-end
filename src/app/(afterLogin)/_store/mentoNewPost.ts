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
    content: string;
    setTimes: (newTime: Time) => void;
    deleteTimes: (key: string) => void;
};
const useMentoNewPost = create<UseMentoNewPost>((set) => ({
    times: [],
    interver: 30,
    days: [],
    timeAdditionalInfo: '', //기타사항
    title: '',
    tags: [],
    content: `<p><span style="font-family: 'arial black', sans-serif; color: rgb(0, 0, 0); background-color: rgb(251, 238, 184);"><strong>[멘토링 모집 내용 예시]</strong></span></p>
<h2><span style="font-family: 'arial black', sans-serif;"><strong>안녕하세요. 저는 [<span style="color: rgb(22, 145, 121);">홍길동</span>]</strong><span style="color: rgb(0, 0, 0);">&nbsp;</span><strong>입니다!🔥</strong></span></h2>
<p><span style="font-family: 'arial black', sans-serif;"><strong>멘토 자기소개:</strong></span></p>
<p><span style="font-family: 'arial black', sans-serif;"><strong>멘토링 내용:</strong></span></p>
<p><span style="font-family: 'arial black', sans-serif;"><strong>가능한 멘토링 영역:</strong></span></p>
<ul>
<li>1번</li>
<li>2번</li>
<li>3번</li>
</ul>
<p><span style="font-family: 'arial black', sans-serif;"><strong>멘토링 진행방식:</strong></span></p>
<ul>
<li>1번</li>
<li>2번</li>
<li>3번</li>
</ul>
<p><span style="font-family: 'arial black', sans-serif;"><strong>예상 스터디 일정(횟수):&nbsp;</strong></span></p>
<p>&nbsp;</p>`,
    setTimes: (newTime) => set((state) => ({ times: [...state.times, newTime] })),
    deleteTimes: (key) => set((state) => ({ times: state.times.filter((time) => time.key !== key) })),
}));

export default useMentoNewPost;
