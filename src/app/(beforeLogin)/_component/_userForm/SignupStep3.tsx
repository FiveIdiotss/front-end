import { FormikProps } from 'formik';
import { SignupFormValue } from '../../_lib/signup';
import EmailVerificationInput from './EmailVerificationInput';
import UserInput from './UserInput';
import UserDivider from '../UserDivider';
import UserSelect from './UserSelect';
interface SignupStep3Props {
    formik: FormikProps<SignupFormValue>;
    step?: number;
    setStep?: React.Dispatch<React.SetStateAction<number>>;
    nextHandler?: (
        step: number,
        formik: FormikProps<SignupFormValue>,
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
                name="pw"
                error={formik.errors.pw}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.pw}
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

            <button
                type="submit"
                className="bg-primary h-10 w-full rounded-md border border-solid border-gray-300 px-3 text-white"
            >
                회원가입
            </button>
        </>
    );
};

export default SignupStep3;
