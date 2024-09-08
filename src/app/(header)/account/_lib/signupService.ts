import { ErrorResponse } from '@/app/Models/AxiosResponse';
import { MajorType, SchoolType, SignupFormType } from '@/app/Models/SignupType';
import Axios from '@/app/util/axiosInstance';
import { pushNotification } from '@/app/util/pushNotification';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const postSiginup = async (data: SignupFormType) => {
    delete data.passwordConfirm;
    delete data.majorName;
    delete data.schoolId;
    delete data.validEmail;

    const response = await Axios.post(`/api/member/signUp`, data);

    return response.data.data;
}; //회원가입

export const getSchools = async (): Promise<SchoolType[]> => {
    const response = await Axios.get(`/api/schools`);
    return response.data.data;
}; //회원가입시 학교목록

export const getMajors = async (schoolName: string = '가천대학교'): Promise<MajorType[]> => {
    const response = await Axios.get(`/api/school/${schoolName}`);
    return response.data.data;
}; //회원가입시 학교별 학과목록

//---------------------------------------------------------------------hooks---------------------------------------------------------------------

export const useSignupMutation = () => {
    const mutation = useMutation({
        mutationFn: postSiginup,
        // onError: (error: AxiosError<ErrorResponse>) => {
        //     pushNotification({
        //         msg: error.response?.data.message || '알 수 없는 오류가 발생했습니다.',
        //         type: 'error',
        //         theme: 'dark',
        //     });
        // },
    });
    return mutation;
}; //회원가입

export const useSchoolsQuery = () => {
    const query = useQuery<SchoolType[], AxiosError<ErrorResponse>>({
        queryKey: ['schools'],
        queryFn: getSchools,
        staleTime: 1000 * 60 * 60 * 24, //자주 바뀔것 같지 않아 24시간으로 설정
    });
    return query;
}; //학교목록

export const useMajorsQuery = ({ schoolName, enabled = false }: { schoolName: string; enabled: boolean }) => {
    const query = useQuery<MajorType[], AxiosError<ErrorResponse>>({
        queryKey: ['majors', schoolName],
        queryFn: () => getMajors(schoolName),
        staleTime: 1000 * 60 * 60 * 24, //자주 바뀔것 같지 않아 24시간으로 설정
        enabled: enabled,
    });
    return query;
}; //학교별 학과목록
