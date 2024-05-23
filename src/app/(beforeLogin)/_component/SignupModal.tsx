'use client';

import BackButton from './BackButton';
import { onSubmit as submitfetch } from '../_lib/signup';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import search from '../../../../public/back.svg';
import UniSearch from './UniSearch';
import { SignupFormValue } from '../_lib/signup';
import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';
import SignupStep1 from './_userForm/SignupStep1';
import SignupStep2 from './_userForm/SignupStep2';
import SignupStep3 from './_userForm/SignupStep3';

type RequiredField = {
    field: keyof SignupFormValue;
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
        { field: 'pw', message: '패스워드는 필수항목입니다.' },
        { field: 'passwordConfirm', message: '패스워드확인은 필수항목입니다.' },
    ],
];

const nextHandler = async (
    step: number,
    formik: FormikProps<SignupFormValue>,
    setStep: React.Dispatch<React.SetStateAction<number>>,
) => {
    let next = true;
    stepsRequired[step - 1].forEach(({ field, message }) => {
        if (formik.values[field] === '' || formik.values[field] === undefined || formik.values[field] === false) {
            formik.setFieldError(field, message);
            next = false;
        }
        if (formik.errors[field]) {
            next = false;
        }
    });
    if (!next) return;
    if (step !== 3) {
        setStep(step + 1);
    } else {
        return 'onSubmit';
    } //step을 1씩 증가시킨다. 페이지 이동, 나중에 코드를 보기좋게 바꿔야함
};
export type SchoolDatas = {
    schoolId: number;
    schoolName: string;
    majorId: number;
    majorName: string;
};

//컴포넌트 시작
export default function SignupModal() {
    const [step, setStep] = useState<number>(1);

    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            pw: '',
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
            pw: Yup.string().max(255).min(7, '비밀번호는 7자리 이상이어야 합니다.'),
            passwordConfirm: Yup.string().oneOf([Yup.ref('pw')], '비밀번호가 일치하지 않습니다.'),
        }),
        validateOnChange: true,
        onSubmit: async (data: SignupFormValue) => {
            const res = await nextHandler(step, formik, setStep);

            if (res === 'onSubmit') {
                console.log(data);
                const res = await submitfetch(data);
                console.log(res);
            }
        },
    });

    const searchModalHandler = (number: number) => {
        setStep(number); //0이면 대학검색창, 1이면 이메일인증페이지, 2이면 로그인정보, 3이면 재학정보및 개인정보
    };

    const updateSchoolAndDepartmentHandler = (props: SchoolDatas) => {
        //학사정보를 선택하면 실행되는 함수
        formik.setValues({
            ...formik.values,
            schoolName: props.schoolName,
            schoolId: props.schoolId,
            majorName: props.majorName,
            majorId: props.majorId,
        });
    };
    useEffect(() => {
        if (formik.values.majorName !== '') setStep(1);
    }, [formik.values.majorName]); //초기에는 실행되지 않고 schoolName이 바뀔때만 실행된다.

    return (
        // 모달배경
        <div className="absolute bottom-0 left-0 right-0 top-0 flex h-full w-screen items-center justify-center bg-modal">
            <div
                className={` relative flex h-full  w-full flex-col  items-center rounded-lg bg-white sm:h-[550px] sm:w-[450px]`}
            >
                <div className="flex  h-14 w-full flex-row items-center border-b border-solid px-3 ">
                    {/* 모달헤더 */}
                    <div className="absolute">
                        {step !== 0 ? (
                            <BackButton />
                        ) : (
                            <button
                                onClick={() => searchModalHandler(1)}
                                className="flex  h-8 w-8 items-center justify-center rounded-full hover:bg-primary"
                            >
                                <Image src={search} height={32} width={32} alt="back" />
                            </button>
                        )}
                    </div>
                    <span className=" flex w-full items-center justify-center font-semibold">로그인 또는 회원가입</span>
                </div>
                <div className="flex  w-full flex-grow items-center justify-center  p-6">
                    <form onSubmit={formik.handleSubmit} className="w-full">
                        {step === 1 && (
                            <section className={` flex w-full flex-col gap-2`}>
                                <SignupStep1
                                    formik={formik}
                                    step={step}
                                    setStep={setStep}
                                    nextHandler={nextHandler}
                                    searchModalHandler={() => searchModalHandler(0)}
                                />
                            </section>
                        )}
                        {step === 2 && (
                            <section className={`${step === 2 ? 'block' : 'hidden'} flex flex-col gap-2 `}>
                                <SignupStep2 formik={formik} step={step} setStep={setStep} nextHandler={nextHandler} />
                            </section>
                        )}
                        {step === 3 && (
                            <section className={`${step === 3 ? 'block' : 'hidden'} flex flex-col gap-2`}>
                                <SignupStep3 formik={formik} />
                            </section>
                        )}
                        {step === 0 && (
                            <section className={`${step === 0 ? 'block' : 'hidden'} flex flex-col gap-2`}>
                                <UniSearch onSubmit={updateSchoolAndDepartmentHandler} />
                            </section>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
