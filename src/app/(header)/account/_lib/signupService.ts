import { ErrorResponse } from '@/app/Models/AxiosResponse';
import { MajorType, SchoolType, SignupFormType } from '@/app/Models/SignupType';
import Axios from '@/app/util/axiosInstance';
import { pushNotification } from '@/app/util/pushNotification';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
const url = process.env.NEXT_PUBLIC_API_URL;

const postSiginup = async (data: SignupFormType) => {
    console.log(data);
    delete data.passwordConfirm;
    delete data.majorName;
    delete data.schoolId;
    delete data.validEmail;
    console.log(data);

    const response = await Axios.post(`/api/member/signUp`, data);

    return response.data.data;
}; //회원가입

export const getSchools = async (): Promise<SchoolType[]> => {
    const response = await Axios.get(`/api/schools`);
    return response.data.data as SchoolType[];
}; //회원가입시 학교목록

export const getMajors = async (schoolName: string = '가천대학교'): Promise<MajorType[]> => {
    const response = await Axios.get(`/api/school/${schoolName}`);
    return response.data.data as MajorType[];
}; //회원가입시 학교별 학과목록

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
}; //회원가입

export const useSchoolsQuery = () => {
    const query = useQuery({
        queryKey: ['schools'],
        queryFn: getSchools,
        staleTime: 1000 * 60 * 60 * 24,
    });
    return query;
}; //학교목록

export const useMajorsQuery = ({ schoolName, enabled = false }: { schoolName: string; enabled: boolean }) => {
    const query = useQuery({
        queryKey: ['majors', schoolName],
        queryFn: () => getMajors(schoolName),
        staleTime: 1000 * 60 * 60 * 24,
        enabled: enabled,
    });
    return query;
}; //학교별 학과목록
