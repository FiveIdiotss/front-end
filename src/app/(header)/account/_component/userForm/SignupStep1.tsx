import { FormikProps } from 'formik';
import { SignupFormType } from '@/app/Models/SignupType';
import EmailVerificationInput from './EmailVerificationInput';
import UserInput from './UserInput';
import { useEffect, useState } from 'react';
import UniSearch from '../UniSearch';

export type SchoolDatas = {
    schoolId: number;
    schoolName: string;
    majorId: number;
    majorName: string;
};

interface Props {
    formik: FormikProps<SignupFormType>;
    handleSearchPage: () => void;
}
const SignupStep2: React.FC<Props> = ({ formik, handleSearchPage }) => {
    const [isSearchPage, setIsSearchPage] = useState<boolean>(false);

    useEffect(() => {
        if (formik.values.schoolName !== '' && formik.values.majorName !== '') {
            setIsSearchPage(false);
        }
    }, [formik.values.schoolName, formik.values.majorName]); //학교와 전공이 선택되면 검색페이지를 닫는다.

    return (
        <>
            <div className="flex w-full flex-row ">
                <UserInput
                    type="text"
                    placeholder="대학교"
                    name="schoolName"
                    value={formik.values.schoolName}
                    readOnly
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.errors.schoolName}
                />
                <button
                    type="button"
                    className="ml-3 h-12 w-24 rounded-md border border-solid border-gray-300 bg-gray-200 text-center hover:bg-gray-300"
                    onClick={handleSearchPage}
                >
                    검색
                </button>
            </div>
            <UserInput
                type="text"
                placeholder="전공"
                name="majorName"
                value={formik.values.majorName}
                readOnly
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.errors.majorName}
            />
            <input type="hidden" name="majorId" value={formik.values.majorId} />
            {/* majorId를 보내기위함,hidden사용 */}
        </>
    );
};

export default SignupStep2;
