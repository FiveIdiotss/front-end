'use client';

import BackButton from './BackButton';
import { useFormState, useFormStatus } from 'react-dom';
import onSubmit from '../_lib/signup';
import { useState } from 'react';
export default function SignupModal() {
    const [state, formAction] = useFormState(onSubmit, null);
    const { pending: boolean } = useFormStatus();
    const [level, setLevel] = useState(1);

    const nextHandler = () => {
        setLevel(level + 1);
    };

    return (
        // 모달배경
        <div className="bg-modal absolute bottom-0 left-0 right-0 top-0 flex h-full w-screen items-center justify-center">
            <div className=" relative flex h-[550px] min-w-[450px]  flex-col items-center rounded-lg bg-white ">
                <div className="flex  h-14 w-full flex-row items-center border-b border-solid px-3 ">
                    {/* 모달헤더 */}
                    <div className="absolute">
                        <BackButton />
                    </div>
                    <span className=" flex w-full items-center justify-center font-semibold">로그인 또는 회원가입</span>
                </div>
                <div className="flex  w-full flex-grow items-center justify-center  p-6">
                    <form className="w-full">
                        <div className={`${level === 1 ? 'block' : 'hidden'} flex w-full flex-col gap-2`}>
                            <div className=" flex w-full flex-row">
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="이메일"
                                    className="h-10 w-full rounded-md border border-solid border-gray-300 px-3"
                                />
                                <button className="ml-3 w-24 rounded-md border border-solid border-gray-300 bg-gray-200 text-center">
                                    인증
                                </button>
                            </div>

                            <button
                                className="bg-primary mt-10 h-10 w-full rounded-md border border-solid border-gray-300 px-3 text-white"
                                onClick={(event) => {
                                    event.preventDefault();
                                    nextHandler();
                                }}
                            >
                                계속
                            </button>
                            <div className=" m-auto  mt-3 flex w-full flex-row">
                                <div className=" flex flex-grow flex-col justify-center">
                                    <div className="h-0 border border-b-0 border-slate-200"></div>
                                </div>
                                <span className="mx-2 text-sm ">또는</span>
                                <div className="flex flex-grow flex-col justify-center">
                                    <div className="h-0 border border-b-0 border-slate-200 "></div>
                                </div>
                            </div>
                            <div className="m-auto mt-3 flex h-20 flex-row gap-4">
                                <button className="h-16 w-16 rounded-full bg-yellow-400">Kakao</button>
                                <button className="h-16 w-16 rounded-full border border-neutral-300 ">Google</button>
                                <button className="h-16 w-16 rounded-full bg-green-500 text-white">Naver</button>
                            </div>
                        </div>
                        <div className={`${level === 2 ? 'block' : 'hidden'} flex flex-col gap-2`}>
                            <input
                                type="text"
                                name="name"
                                placeholder="이름"
                                className="h-10 w-96 rounded-md border border-solid border-gray-300 px-3"
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="비밀번호"
                                className="h-10 w-96 rounded-md border border-solid border-gray-300 px-3"
                            />
                            <input
                                type="password"
                                name="passwordConfirm"
                                placeholder="비밀번호 확인"
                                className="h-10 w-96 rounded-md border border-solid border-gray-300 px-3"
                            />
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="전화번호"
                                className="h-10 w-96 rounded-md border border-solid border-gray-300 px-3"
                            />
                            <button
                                className="h-10 w-96 rounded-md border border-solid border-gray-300 px-3 "
                                onClick={(event) => {
                                    event.preventDefault();
                                    nextHandler();
                                }}
                            >
                                계속
                            </button>
                        </div>
                        <div className={`${level === 3 ? 'block' : 'hidden'} flex flex-col gap-2`}>
                            <input
                                type="text"
                                name="university"
                                placeholder="대학교"
                                className="h-10 w-96 rounded-md border border-solid border-gray-300 px-3"
                            />
                            <input
                                type="text"
                                name="major"
                                placeholder="전공"
                                className="h-10 w-96 rounded-md border border-solid border-gray-300 px-3"
                            />
                            <input
                                type="text"
                                name="studentId"
                                placeholder="학번"
                                className="h-10 w-96 rounded-md border border-solid border-gray-300 px-3"
                            />
                            <button
                                type="submit"
                                className="h-10 w-96 rounded-md border border-solid border-gray-300 px-3"
                            >
                                회원가입
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
