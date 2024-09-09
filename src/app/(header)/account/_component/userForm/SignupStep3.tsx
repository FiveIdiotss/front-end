import { FormikProps } from 'formik';
import { SignupFormType } from '@/app/Models/SignupType';
import EmailVerificationInput from './EmailVerificationInput';
import UserInput from './UserInput';
import UserDivider from '../UserDivider';
import UserSelect from './UserSelect';
interface SignupStep3Props {
    formik: FormikProps<SignupFormType>;
    step?: number;
    setStep?: React.Dispatch<React.SetStateAction<number>>;
    nextHandler?: (
        step: number,
        formik: FormikProps<SignupFormType>,
        setStep: React.Dispatch<React.SetStateAction<number>>,
    ) => void;
}
const SignupStep3: React.FC<SignupStep3Props> = ({ formik }) => {
    return (
        <>
            <UserInput
                type="text"
                placeholder="이름"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.errors.name}
            />
            <UserInput
                type="number"
                placeholder="학번"
                name="year"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.year}
                error={formik.errors.year}
            />

            <UserInput
                type="password"
                placeholder="비밀번호"
                name="password"
                error={formik.errors.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
            />

            <UserInput
                type="password"
                placeholder="비밀번호 확인"
                name="passwordConfirm"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.passwordConfirm}
                error={formik.errors.passwordConfirm}
            />
            <UserSelect
                name="gender"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.errors.gender}
            >
                <option value="" selected disabled>
                    성별 선택
                </option>
                <option value="MALE">남성</option>
                <option value="FEMALE">여성</option>
            </UserSelect>
        </>
    );
};

export default SignupStep3;
