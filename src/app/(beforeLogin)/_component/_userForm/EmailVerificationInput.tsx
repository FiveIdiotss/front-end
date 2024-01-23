`use client`;
import axios from 'axios';
import UserInput from './UserInput';
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import { FormikProps } from 'formik';
import { SignupFormValue } from '../../_lib/signup';
import { set } from 'react-hook-form';

type props = {
    placeholder: string;
    type: string;
    error?: string;
    value?: string;
    onBlur?: any;
    onChange?: any;
    name: string;
    formik: FormikProps<SignupFormValue>;
};
export default function EmailVerificationInput({
    placeholder,
    type,
    error,
    value,
    name,
    onBlur,
    onChange,
    formik,
}: props) {
    const [valid, setValid] = useState<boolean>(false);
    const [validCode, setValidCode] = useState<string>('');
    const [codeError, setCodeError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const emailValidFetch = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (formik.values.email === '') {
            formik.setFieldError('email', '이메일은 필수항목입니다.');
            return;
        }
        if (formik.errors.email) {
            return;
        }
        const data = { email: value, univName: formik.values.schoolName };
        console.log(data);
        setLoading(true);
        try {
            const result = await axios.post('login/email', data);
            console.log(result);
            setValid(true);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };
    const codeValidFetch = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (validCode === '') {
            setCodeError('인증번호를 입력해주세요.');
            return;
        }
        const data = { email: value, univName: formik.values.schoolName, code: validCode };
        console.log(data);
        // const result = await axios.post('login/email', data);
        setValid(true);
    };
    return (
        <>
            {!valid && (
                <div className=" flex w-full flex-row">
                    <>
                        <UserInput
                            type={type}
                            placeholder={placeholder}
                            error={error}
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            name={name}
                        />
                        <button
                            className="ml-3 h-12 w-24 rounded-md border border-solid border-gray-300 bg-gray-200 text-center"
                            onClick={(e) => {
                                emailValidFetch(e);
                            }}
                        >
                            인증
                        </button>
                    </>
                </div>
            )}
            {valid && (
                <>
                    <div className="  flex w-full flex-row">
                        <UserInput
                            type={'text'}
                            placeholder={'인증번호'}
                            error={codeError}
                            value={validCode}
                            onBlur={() => setCodeError('')}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setValidCode(e.target.value);
                                setCodeError('');
                            }}
                            name={'code'}
                        />
                        <button
                            className="ml-3 h-12 w-24 rounded-md border border-solid border-gray-300 bg-gray-200 text-center"
                            onClick={(e) => codeValidFetch(e)}
                        >
                            완료
                        </button>
                    </div>
                    <span className="text-primary mb-7">{`${value}으로 보내드린 인증 코드를 입력하세요.`}</span>
                </>
            )}
        </>
    );
}
