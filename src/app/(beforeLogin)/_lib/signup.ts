'use server';

import axios from 'axios';
const url = process.env.NEXT_PUBLIC_API_URL;

const onSubmit = async (currentState: any, formData: FormData) => {
    const formDataObject = {
        email: (formData.get('email') as string) || '',
        name: (formData.get('name') as string) || '',
        pw: (formData.get('pw') as String) || '',
        year: (Number(formData.get('year')) as Number) || '',
        gender: (formData.get('gender') as String) || '',
        schoolName: (formData.get('schoolName') as String) || '',
        majorId: (Number(formData.get('majorId')) as Number) || '',
    };

    try {
        const response = await axios.post(`${url}/member/signup`, formDataObject);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

export type School = {
    schoolId: number;
    name: string;
};
const fetchSchoolsData = async (): Promise<School[]> => {
    try {
        const response = await axios.get<School[]>(`${url}/schools`);
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
        const response = await axios.get<Major[]>(`${url}/school/${name}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export { onSubmit, fetchSchoolsData, fetchMajorsData };
