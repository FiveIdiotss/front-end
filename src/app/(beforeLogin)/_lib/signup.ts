'use server';

import axios from 'axios';
const url = process.env.NEXT_PUBLIC_API_URL;

const onSubmit = async (currentState: any, formData: FormData) => {
    const formDataObject = {
        email: (formData.get('email') as string) || '',
        name: (formData.get('name') as string) || '',
        pw: (formData.get('pw') as String) || '',
        year: (Number(formData.get('year')) as Number) || '',
        score: (Number(formData.get('score')) as Number) || '',
        gender: formData.get('gender') as String,
        schoolName: (formData.get('schoolName') as String) || '',
        majorId: (Number(formData.get('majorId')) as Number) || '',
    };

    console.log(formDataObject);
};

export type School = {
    schoolId: number;
    name: string;
};
const fetchSchoolsData = async (): Promise<School[]> => {
    try {
        const response = await axios.get<School[]>(`${url}/schools`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};
const postSignUpData = async () => {
    const fakeData = {
        a: 1,
        b: 2,
        c: 3,
    };
    try {
        const response = await axios.post(`${url}/signup`, fakeData);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export { onSubmit, fetchSchoolsData };
