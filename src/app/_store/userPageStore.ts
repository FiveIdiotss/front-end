import { create } from 'zustand';

type UserPageStore = {
    isImageModalOpen: boolean; // 이미지 모달 오픈 여부
    setIsImageModalOpen: (isOpen: boolean) => void;
};
const userPageStore = create<UserPageStore>((set) => ({
    isImageModalOpen: false, // 이미지 모달 오픈 여부
    setIsImageModalOpen: (isOpen) => {
        set({ isImageModalOpen: isOpen });
    },
}));

export default userPageStore;
