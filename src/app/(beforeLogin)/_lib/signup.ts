import { ErrorResponse } from '@/app/Models/AxiosResponse';
import axios, { Axios, AxiosError } from 'axios';
const url = process.env.NEXT_PUBLIC_API_URL;

export type SignupFormValue = {
    email: string;
    name: string;
    pw: string;
    year: number | undefined;
    gender: string;
    schoolName: string;
    schoolId?: number;
    majorName?: string;
    majorId: number;
    passwordConfirm?: string;
    validEmail?: boolean;
};
const onSubmit = async (data: SignupFormValue) => {
    console.log(data);
    delete data.passwordConfirm;
    delete data.majorName;
    delete data.schoolId;
    delete data.validEmail;

    try {
        const response = await axios.post(`${url}/api/member/signup`, data);
        return { message: '회원가입이 완료되었습니다.', success: true };
    } catch (error) {
        console.log(error);
        return { message: '회원가입에 실패하였습니다.', success: false };
    }
};

export type School = {
    schoolId: number;
    name: string;
};
const fetchSchoolsData = async (): Promise<School[]> => {
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
const fetchMajorsData = async (name: string = '가천대학교'): Promise<Major[]> => {
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

export { onSubmit, fetchSchoolsData, fetchMajorsData };
