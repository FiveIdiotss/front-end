'use server';

import axios from 'axios';
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
        const response = await axios.get<School[]>(`${url}/api/schools`);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export type Major = {
    majorId: number;
    name: string;
};
const fetchMajorsData = async (name: string = '가천대학교'): Promise<Major[]> => {
    try {
        const response = await axios.get<Major[]>(`${url}/api/school/${name}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export { onSubmit, fetchSchoolsData, fetchMajorsData };
