import Axios from '@/app/util/axiosInstance';
import { useMutation } from '@tanstack/react-query';

type newPostFormData = {
    request: {
        title: string;
        introduce: string;
        target: string;
        content: string;
        consultTime: number;
        times: { startTime: string; endTime: string }[];
        availableDays: string[];
        boardCategory: string;
    };
    images: File[];
};

const postMentor = async ({ request, images }: newPostFormData) => {
    const formData = new FormData();
    const requestBlob = new Blob(
        [
            JSON.stringify({
                title: request.title,
                introduce: request.introduce,
                target: request.target,
                content: request.content,
                consultTime: request.consultTime,
                times: request.times,
                availableDays: request.availableDays,
                boardCategory: request.boardCategory,
            }),
        ],
        { type: 'application/json' },
    );
    formData.append('request', requestBlob);

    if (images.length > 0) {
        formData.append('images', JSON.stringify(images));
    }

    try {
        const response = await Axios.post('/api/board', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.data;
    } catch (error) {
        console.error('Error uploading data:', error);
        throw error;
    }
};

export const usePostMentorMutation = () => {
    const mutation = useMutation({
        mutationFn: postMentor,
    });

    return mutation;
};
