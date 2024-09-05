import { create } from 'zustand';

type PrevUrlStore = {
    prevUrl: string; // 현재 URL
    setPrevUrl: (url: string) => void; // 현재 URL 업데이트 함수
};

const usePrevPageStore = create<PrevUrlStore>((set) => ({
    prevUrl: '', // 현재 URL
    setPrevUrl: (url) => {
        set({ prevUrl: url });
    },
}));

export default usePrevPageStore;
