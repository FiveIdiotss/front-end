import { FormikProps } from 'formik';
import { SignupFormValue } from '@/app/Models/SignupType';
import EmailVerificationInput from './EmailVerificationInput';
import UserInput from './UserInput';
import UserDivider from '../UserDivider';
interface SignupStep1Props {
    formik: FormikProps<SignupFormValue>;
}
const SignupStep1: React.FC<SignupStep1Props> = ({ formik }) => {
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
                formik={formik}
            />
        </>
    );
};

export default SignupStep1;
