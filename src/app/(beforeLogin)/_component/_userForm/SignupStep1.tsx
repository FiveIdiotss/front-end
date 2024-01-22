import { FormikProps } from 'formik';
import { SignupFormValue } from '../../_lib/signup';
import EmailVerificationInput from './EmailVerificationInput';
import UserInput from './UserInput';
import UserDivider from '../UserDivider';
interface SignupStep1Props {
    formik: FormikProps<SignupFormValue>;
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    nextHandler: (
        step: number,
        formik: FormikProps<SignupFormValue>,
        setStep: React.Dispatch<React.SetStateAction<number>>,
    ) => void;
}
const SignupStep1: React.FC<SignupStep1Props> = ({ formik, step, setStep, nextHandler }) => {
    return (
        <>
            <EmailVerificationInput
                type="text"
                name="email"
                placeholder="이메일"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email}
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
            <button
                className="bg-primary mt-10 h-10 w-full rounded-md border border-solid border-gray-300 px-3 text-white"
                onClick={(event) => {
                    event.preventDefault();
                    nextHandler(step, formik, setStep);
                }}
            >
                계속
            </button>
            <UserDivider />
            <div className="m-auto mt-3 flex h-20 flex-row gap-4">
                <button className="h-16 w-16 rounded-full bg-yellow-400">Kakao</button>
                <button className="h-16 w-16 rounded-full border border-neutral-300 ">Google</button>
                <button className="h-16 w-16 rounded-full bg-green-500 text-white">Naver</button>
            </div>
        </>
    );
};

export default SignupStep1;
