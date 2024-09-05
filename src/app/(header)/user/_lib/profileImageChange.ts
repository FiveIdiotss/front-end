import Axios from '@/app/util/axiosInstance';

export const postImageData = async (data: File | null) => {
    if (!data) return;
    console.log('이미지 데이터', data);
    const formData = new FormData();
    formData.append('imageFile', data as Blob);
    const response = await Axios.post('/api/member/image', formData);
    console.log('이미지 응답', response.data.data.imageUrl);
    return response.data.data;
};
export const postDefaultImage = async () => {
    const response = await Axios.post('/api/member/defaultImage');
    return response.data.data;
};
