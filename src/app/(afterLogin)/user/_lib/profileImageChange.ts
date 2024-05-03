import Axios from '@/app/util/axiosInstance';

export const postImageData = async (data: File | null) => {
    if (!data) return;
    console.log('이미지 데이터', data);
    const formData = new FormData();
    formData.append('imageFile', data as Blob);
    const response = await Axios.post('/api/member/image', formData);
    return response.data;
};
export const postDefaultImage = async () => {
    const response = await Axios.post('/api/member/defaultImage');
    return response.data;
};
