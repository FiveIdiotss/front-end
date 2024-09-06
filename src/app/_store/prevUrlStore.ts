import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PrevUrlStore = {
    prevUrl: string; // 현재 URL
    setPrevUrl: (url: string) => void; // 현재 URL 업데이트 함수
};

const usePrevPageStore = create<PrevUrlStore>()(
    persist(
        (set) => ({
            prevUrl: '', // 초기 URL 값
            setPrevUrl: (url) => {
                set({ prevUrl: url });
            },
        }),
        {
            name: 'prev-url-store', // localStorage에 저장될 키 이름
            getStorage: () => sessionStorage, // localStorage를 사용하여 상태를 저장
        },
    ),
);

export default usePrevPageStore;
