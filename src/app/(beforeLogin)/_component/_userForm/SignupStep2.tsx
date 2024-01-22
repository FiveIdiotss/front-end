import { FormikProps } from 'formik';
import { SignupFormValue } from '../../_lib/signup';
import EmailVerificationInput from './EmailVerificationInput';
import UserInput from './UserInput';
import UserDivider from '../UserDivider';
interface SignupStep2Props {
    formik: FormikProps<SignupFormValue>;
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    nextHandler: (
        step: number,
        formik: FormikProps<SignupFormValue>,
        setStep: React.Dispatch<React.SetStateAction<number>>,
    ) => void;
    searchModalHandler?: () => void;
}
const SignupStep2: React.FC<SignupStep2Props> = ({ formik, step, setStep, nextHandler, searchModalHandler }) => {
    return (
        <>
            <div className="flex w-full flex-row">
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
                    className="ml-3 w-24 rounded-md border border-solid border-gray-300 bg-gray-200 text-center hover:bg-gray-300"
                    onClick={(event) => {
                        event.preventDefault();
                        if (searchModalHandler) searchModalHandler();
                    }}
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
            <button
                className="bg-primary h-10 w-full rounded-md border border-solid border-gray-300 px-3 text-white "
                onClick={(event) => {
                    event.preventDefault();
                    nextHandler(step, formik, setStep);
                }}
            >
                계속
            </button>
        </>
    );
};

export default SignupStep2;
