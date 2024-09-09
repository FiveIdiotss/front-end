`use client`;
import axios from 'axios';
import UserInput from './UserInput';
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import { FormikProps } from 'formik';
import { SignupFormType } from '@/app/Models/SignupType';
import { set } from 'react-hook-form';
import Loading from '@/app/_component/Loading';
const url = process.env.NEXT_PUBLIC_API_URL;

type props = {
    placeholder: string;
    type: string;
    error?: string;
    value?: string;
    onBlur?: any;
    onChange?: any;
    name: string;
    formik: FormikProps<SignupFormType>;
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
    const [reFecth, setReFetch] = useState<boolean>(false);
    const emailValidFetch = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setCodeError('');
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
            const response = await axios.post(`${url}/api/email`, data);
            console.log(response.data);
            if (response.data.success === false) {
                setCodeError('서버에 존재하지 않는 이메일입니다.');
                setLoading(false);
                return;
            }
            setValid(true);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setCodeError('이메일이 잘못되었습니다.');
            setLoading(false);
        }
    };
    const codeValidFetch = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (validCode === '') {
            setCodeError('인증번호를 입력해주세요.');
            return;
        }
        const data = { email: value, univName: formik.values.schoolName, code: String(validCode) };
        console.log(data);
        setLoading(true);
        try {
            const checkRes = await axios.post(`${url}/api/email/verify`, data); //이메일 인증코드 확인
            console.log(checkRes.data);
            if (checkRes.data.success === false) {
                setCodeError(checkRes.data.message);
                setLoading(false);
                return;
            }
            const params = { email: value };
            console.log(params);
            const resetRes = await axios.post(`${url}/api/email/resetByEmail?email=${value}`); //이메일 인증코드 초기화
            console.log(resetRes.data);
            formik.setFieldValue('validEmail', true);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setCodeError('인증오류입니다. 다시 시도해주세요.');
            setLoading(false);
        }
        // const result = await axios.post('login/email', data);
        setValid(true);
    };
    return (
        <>
            {!valid && (
                <div className=" flex w-full flex-row">
                    <UserInput
                        type={type}
                        placeholder={placeholder}
                        error={codeError || error}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        name={name}
                    />
                    {loading ? (
                        <div className="ml-3 h-12 w-24 rounded-md border border-solid border-gray-300 bg-gray-200 text-center">
                            <Loading />
                        </div>
                    ) : (
                        <button
                            className="ml-3 h-12 w-24 rounded-md border border-solid border-gray-300 bg-gray-200 text-center"
                            onClick={(e) => {
                                emailValidFetch(e);
                            }}
                        >
                            인증
                        </button>
                    )}
                </div>
            )}
            {valid && (
                <div className=" flex w-full flex-col">
                    {formik.values.validEmail === false && (
                        <>
                            <span className="mb-4 text-primary">
                                {reFecth && <span className="text-red-400">(재발송)</span>}
                                {`${value}으로 보내드린 인증 코드를 입력하세요.`}
                            </span>
                            <div className="  flex w-full flex-row">
                                <UserInput
                                    type={'text'}
                                    placeholder={'인증번호'}
                                    error={codeError || formik.errors.validEmail}
                                    value={validCode}
                                    onBlur={(e: any) => {
                                        onBlur(e);
                                        setCodeError('');
                                    }}
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
                            <span className=" mb-9 ml-2  flex w-full justify-end text-red-400 ">
                                <button
                                    className="mr-[100px] border-b border-red-400 text-sm font-bold"
                                    onClick={(e) => {
                                        emailValidFetch(e);
                                        setReFetch(true);
                                    }}
                                >
                                    재발송
                                </button>
                            </span>
                        </>
                    )}
                    {formik.values.validEmail === true && (
                        <div className="flex w-full flex-col">
                            <span className="mb-4 text-primary">{`${value}로 인증이 완료되었습니다.`}</span>
                            <div className="flex w-full flex-row">
                                <UserInput type={'text'} value={value} name={'codecomplete'} disabled={true} />
                                <button
                                    className="ml-3 h-12 w-24 rounded-md border border-solid border-gray-300 bg-gray-200 text-center"
                                    disabled
                                >
                                    인증완료
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
