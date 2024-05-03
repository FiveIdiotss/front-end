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
};
const useMentoNewPost = create<UseMentoNewPost>((set) => ({
    times: [],
    interver: 30,
    days: [],
    timeAdditionalInfo: '', //기타사항
    title: '',
    tags: [],
    category: '', //카테고리
    content: `<p>&nbsp;</p>
<h2><span style="font-family: 'arial black', sans-serif;"><strong>안녕하세요. 저는 [<span style="background-color: rgb(45, 194, 107); color: rgb(241, 196, 15);">정진혁</span>]</strong><span style="color: rgb(0, 0, 0);">&nbsp;</span><strong>입니다!🙌</strong></span></h2>
<p><span style="font-family: 'arial black', sans-serif;"><strong>멘토링 내용: </strong>프론트의 모든것</span></p>
<p><span style="font-family: 'arial black', sans-serif;"><strong>가능한 멘토링 영역:&nbsp;</strong></span></p>
<ul>
<li>next.js, react.js</li>
<li>auth.js (서버 쿠기, 서버세션과 리프레쉬 토큰 로직을 구현하며 안전하게 관리 해봅시다.)</li>
<li>js</li>
<li>react query</li>
<li>justand</li>
<li>git</li>
<li>tailwind</li>
</ul>
<p><span style="font-family: 'arial black', sans-serif;"><strong>멘토링 진행방식:</strong></span></p>
<ul>
<li>대면</li>
<li>비대면</li>
<li>덕소역</li>
</ul>
<p><span style="font-family: 'arial black', sans-serif;"><strong>예상 맨토링 일정(횟수): 주3회</strong></span></p>
<p>&nbsp;</p>`,
    setTimes: (newTime) => set((state) => ({ times: [...state.times, newTime] })),
    deleteTimes: (key) => set((state) => ({ times: state.times.filter((time) => time.key !== key) })),
}));

export default useMentoNewPost;
