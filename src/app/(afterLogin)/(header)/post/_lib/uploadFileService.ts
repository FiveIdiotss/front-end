import Axios from '@/app/util/axiosInstance';

export const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('multipartFile', file);

    const response = await Axios.post('/api/image', formData);
    console.log(response.data.data);

    return response.data.data;
};
