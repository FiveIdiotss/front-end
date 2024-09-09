'use client';

import BackButton from './BackButton';

import { useEffect, useState } from 'react';
import UniSearch from './UniSearch';
import { SignupFormType } from '@/app/Models/SignupType';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SignupStep1 from './userForm/SignupStep1';
import SignupStep2 from './userForm/SignupStep2';
import SignupStep3 from './userForm/SignupStep3';
import { useSignupMutation } from '../_lib/signupService';
import SuccessStep from './userForm/SuccessStep';
import ArrowLeftBackIcon from '@/app/_icons/common/ArrowLeftBackIcon';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/app/Models/AxiosResponse';

type RequiredField = {
    field: keyof SignupFormType;
    message: string;
};
const stepsRequired: RequiredField[][] = [
    [
        { field: 'schoolName', message: ' ' },
        { field: 'majorName', message: '학교정보는 필수항목입니다.' },
    ],
    [
        { field: 'email', message: 'Email 인증은 필수항목입니다.' },
        {
            field: 'validEmail',
            message: '인증코드를 입력해주세요.',
        },
    ],

    [
        { field: 'name', message: '이름은 필수항목입니다.' },
        { field: 'year', message: '학번은 필수항목입니다.' },
        { field: 'gender', message: '성별은 필수항목입니다.' },
        { field: 'password', message: '패스워드는 필수항목입니다.' },
        { field: 'passwordConfirm', message: '패스워드확인은 필수항목입니다.' },
    ],
];
function getStepIndex(step: PageStepType): number {
    switch (step) {
        case '학사정보':
            return 1; // '학사정보'는 첫 번째 단계이므로 인덱스 0을 반환
        case '학사정보검색':
            // '학사정보검색' 단계는 예제에 명시되지 않았으므로, 이에 대한 적절한 인덱스를 결정해야 합니다.
            // 이 예제에서는 '학사정보검색'이 명시적으로 매핑되지 않으므로, 가정에 따라 인덱스를 할당하거나 -1을 반환할 수 있습니다.
            return 1; // 예제에서는 명확한 매핑이 없으므로 -1을 반환
        case '이메일인증':
            return 2; // '이메일인증'은 두 번째 단계이므로 인덱스 1을 반환
        case '개인정보':
            return 3; // '개인정보'는 세 번째 단계이므로 인덱스 2를 반환
        default:
            return -1; // 유효하지 않은 'step' 값에 대해 -1을 반환
    }
}
type PageStepType = '학사정보' | '학사정보검색' | '이메일인증' | '개인정보' | '회원가입완료';

//컴포넌트 시작
export default function SignupModal() {
    const [step, setStep] = useState<PageStepType>('학사정보');
    const signupMutation = useSignupMutation();

    const formik = useFormik<SignupFormType>({
        initialValues: {
            email: '',
            name: '',
            password: '',
            year: undefined,
            gender: '',
            schoolName: '',
            schoolId: 0, //필요없음
            majorName: '', //필요없음
            majorId: 0,
            passwordConfirm: '', //필요없음
            validEmail: false, //필요없음
        },
        validationSchema: Yup.object({
            email: Yup.string().email('이메일 형식이 올바르지 않습니다.').max(255),
            password: Yup.string().max(255).min(7, '비밀번호는 7자리 이상이어야 합니다.'),
            passwordConfirm: Yup.string().oneOf([Yup.ref('password')], '비밀번호가 일치하지 않습니다.'),
        }),
        validateOnChange: true,
        onSubmit: async (values: SignupFormType) => {
            if (step === '학사정보') {
                stepsRequired[0].forEach(({ field, message }) => {
                    if (values[field] === '' || values[field] === undefined || values[field] === false) {
                        formik.setFieldError(field, message);
                    } else {
                        setStep('이메일인증');
                    }
                });
            }
            if (step === '이메일인증') {
                stepsRequired[1].forEach(({ field, message }) => {
                    if (values[field] === '' || values[field] === undefined || values[field] === false) {
                        formik.setFieldError(field, message);
                    } else if (!formik.values.validEmail) {
                        formik.setFieldError('email', '이메일 인증을 완료해주세요.');
                    } else {
                        setStep('개인정보');
                    }
                });
            }
            if (step === '개인정보') {
                // 모든 필드가 유효한지 검증
                const isFormValid = stepsRequired[2].every(
                    ({ field }) => values[field] !== '' && values[field] !== undefined,
                );

                if (isFormValid) {
                    signupMutation.mutate(values, {
                        onSuccess: () => {
                            setStep('회원가입완료');
                        },
                    });
                } else {
                    stepsRequired[2].forEach(({ field, message }) => {
                        if (values[field] === '' || values[field] === undefined) {
                            formik.setFieldError(field, message);
                        }
                    });
                }
            }
        },
    });

    const backHandler = () => {
        if (step === '학사정보검색') {
            setStep('학사정보');
        } else if (step === '이메일인증') {
            setStep('학사정보');
        } else if (step === '개인정보') {
            setStep('이메일인증');
        }
    };

    useEffect(() => {
        if (formik.values.majorName !== '' && formik.values.schoolName !== '' && step === '학사정보검색')
            setStep('학사정보');
    }, [formik.values.majorName, formik.values.schoolName]); //초기에는 실행되지 않고 schoolName이 바뀔때만 실행된다.

    useEffect(() => {
        // 모달이 열릴 때 body의 overflow를 hidden으로 설정
        document.body.style.overflow = 'hidden';

        // cleanup 함수를 통해 모달이 닫히거나 컴포넌트가 언마운트될 때 overflow를 복원
        return () => {
            document.body.style.overflow = '';
        };
    }, []); // 빈 배열을 의존성 배열로 제공하여 컴포넌트 마운트 시 한 번만 실행되도록 함

    return (
        // 모달배경
        <div className="absolute bottom-0 left-0 right-0 top-0 z-[9999]  flex h-screen w-screen items-center justify-center bg-modal ">
            <div
                className={` relative   flex h-full w-full  flex-col  items-center  overflow-hidden bg-white sm:h-[500px] sm:w-[420px]  sm:rounded-lg `}
            >
                <div className="flex  h-14 w-full shrink-0 flex-row items-center border-b border-solid px-3 text-gray-700 ">
                    {/* 모달헤더 */}
                    <div className="absolute">
                        {(step === '학사정보' || step === '회원가입완료') && <BackButton />}
                        {step !== '학사정보' && step !== '회원가입완료' && (
                            <button
                                onClick={backHandler}
                                className="flex  h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
                            >
                                <ArrowLeftBackIcon className="h-7 w-7" />
                            </button>
                        )}
                    </div>
                    <span className=" flex w-full items-center justify-center font-semibold">
                        회원가입&nbsp;&nbsp;
                        <span className={`${step === '회원가입완료' ? 'hidden' : ''}`}>{getStepIndex(step)}/3</span>
                    </span>
                </div>

                <form onSubmit={formik.handleSubmit} className=" flex w-full flex-grow flex-col overflow-y-auto">
                    <div
                        className={`flex w-full flex-grow flex-col justify-center gap-2 bg-white ${step === '학사정보검색' ? '' : 'p-4'} `}
                    >
                        {step === '학사정보' && (
                            <SignupStep1 handleSearchPage={() => setStep('학사정보검색')} formik={formik} />
                        )}
                        {step === '학사정보검색' && <UniSearch formik={formik} />}

                        {step === '이메일인증' && <SignupStep2 formik={formik} />}
                        {step === '개인정보' && <SignupStep3 formik={formik} />}
                        {step === '회원가입완료' && <SuccessStep formik={formik} />}
                    </div>
                    <div className="mx-auto text-sm text-red-600">
                        {signupMutation.error
                            ? (signupMutation.error as AxiosError<ErrorResponse>).response?.data.message
                            : ''}
                    </div>

                    <div
                        className={` ${step === '학사정보검색' || step === '회원가입완료' ? 'hidden' : 'flex'} sticky bottom-0   w-full flex-col items-center gap-6 bg-white p-3`}
                    >
                        <button
                            type="submit"
                            className="flex w-full  flex-row items-center justify-center gap-2 rounded-md border border-solid border-gray-300 bg-primary p-3 text-white"
                        >
                            {step === '개인정보' ? (
                                '회원가입'
                            ) : (
                                <span className="flex flex-row items-center gap-2 ">다음</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
