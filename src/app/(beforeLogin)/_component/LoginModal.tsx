'use client';

import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import BackButton from './BackButton';
import { signIn } from 'next-auth/react';

export default function LoginModal() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setMessage('');

        const response = signIn('credentials', {
            username: email,
            password,
            redirect: false,
        })
            .then((res) => {
                console.log(res);
                router.push('/home');
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value);
    };

    return (
        // 모달배경
        <div className="bg-modal absolute bottom-0 left-0 right-0 top-0 flex h-full w-screen items-center justify-center">
            <div className="relative flex h-[550px] min-w-[450px]  flex-col items-center rounded-lg bg-white ">
                <div className="flex  h-14 w-full flex-row items-center border-b border-solid px-3">
                    {/* 모달헤더 */}
                    <BackButton />
                    <span className="flex w-full items-center justify-center font-semibold">로그인</span>
                </div>
                <div className="flex  w-full flex-grow items-center justify-center  p-6">
                    <form onSubmit={onSubmit} className="w-full">
                        <div className="flex w-full flex-col gap-2">
                            <div className="flex w-full flex-col gap-2">
                                <label htmlFor="email">이메일</label>
                                <input
                                    id="email"
                                    className="h-10 w-full rounded-md border border-solid border-gray-300 px-3"
                                    value={email}
                                    onChange={onChangeEmail}
                                    type="text"
                                    placeholder="이메일을 입력하세요."
                                />
                            </div>
                            <div className="flex w-full flex-col gap-2">
                                <label htmlFor="password">비밀번호</label>
                                <input
                                    id="password"
                                    className="h-10 w-full rounded-md border border-solid border-gray-300 px-3"
                                    value={password}
                                    onChange={onChangePassword}
                                    type="password"
                                    placeholder="비밀번호를 입력하세요"
                                />
                            </div>
                            <div className="flex w-full flex-row">
                                <button className="bg-primary mt-10 h-10 w-full rounded-md border border-solid border-gray-300 px-3 text-white">
                                    로그인하기
                                </button>
                            </div>
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
                        <div className="text-red flex justify-center">{message}</div>
                    </form>
                </div>
            </div>
        </div>
    );
}
