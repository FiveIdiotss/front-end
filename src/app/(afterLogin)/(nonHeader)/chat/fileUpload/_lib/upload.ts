import Axios from '@/app/util/axiosInstance';
import { pushNotification } from '@/app/util/pushNotification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Message } from '../../_lib/chatContentList';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/app/Models/AxiosResponse';

type UploadProps = {
    file: File;
    chatRoomId: number;
};
type UploadResponse = {
    fileType: string;
    fileUrl: string;
    content: string;
    senderName: string;
    senderId: number;
    chatRoomId: number;
    readCount: number;
    localDateTime: string;
};

const postUpload = async ({ file, chatRoomId }: UploadProps): Promise<Message> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await Axios.post(`/api/chat/sendFile?chatRoomId=${chatRoomId}`, formData);
    console.log(response.data.data);

    return response.data.data;
};
export const useUploadMutaion = () => {
    const mutaion = useMutation({
        mutationFn: postUpload,
        onSuccess: (data, variable) => {
            return data;
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            pushNotification(error.response?.data.message || '이미지 전송에 실패하였습니다.', 'error', 'light');
            console.error('Error uploading data:', error.response?.data.message);
        },
    });
    return mutaion;
};
