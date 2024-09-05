import { ErrorResponse } from '@/app/Models/AxiosResponse';
import { pushNotification } from '@/app/util/pushNotification';
import { useMutation } from '@tanstack/react-query';
import axios, { Axios, AxiosError } from 'axios';
const url = process.env.NEXT_PUBLIC_API_URL;

export type SignupFormValue = {
    email: string;
    name: string;
    password: string;
    year: number | undefined;
    gender: string;
    schoolName: string;
    schoolId?: number;
    majorName?: string;
    majorId: number;
    passwordConfirm?: string;
    validEmail?: boolean;
};
const postSiginup = async (data: SignupFormValue) => {
    console.log(data);
    delete data.passwordConfirm;
    delete data.majorName;
    delete data.schoolId;
    delete data.validEmail;
    console.log(data);

    try {
        const response = await axios.post(`${url}/api/member/signUp`, data);
        return { message: '회원가입이 완료되었습니다.', success: true };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export type School = {
    schoolId: number;
    name: string;
};
export const fetchSchoolsData = async (): Promise<School[]> => {
    try {
        const response = await axios.get(`${url}/api/schools`);
        return response.data.data as School[];
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export type Major = {
    majorId: number;
    name: string;
};
export const fetchMajorsData = async (name: string = '가천대학교'): Promise<Major[]> => {
    try {
        const response = await axios.get(`${url}/api/school/${name}`);
        console.log('학교이름', name);
        console.log('해당학교의 학과', response.data);

        return response.data.data as Major[];
    } catch (error) {
        console.log(error);
        throw error;
    }
};

//---------------------------------------------------------------------hooks---------------------------------------------------------------------

export const useSignupMutation = () => {
    const mutation = useMutation({
        mutationFn: postSiginup,
        onError: (error: AxiosError<ErrorResponse>) => {
            pushNotification({
                msg: error.response?.data.message || '알 수 없는 오류가 발생했습니다.',
                type: 'error',
                theme: 'dark',
            });
        },
    });
    return mutation;
};
