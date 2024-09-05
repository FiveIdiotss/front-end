'use client';

import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';
import BackButton from './BackButton';
import { signIn } from 'next-auth/react';
import ArrowLeftBackIcon from '@/app/_icons/common/ArrowLeftBackIcon';
import Link from 'next/link';

export default function LoginModal() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await signIn('credentials', {
                username: email,
                password,
                callbackUrl: '/home',
            });
            if (response?.error === 'CredentialsSignin') {
                console.log(response);
                setMessage('아이디및 비밀번호를 확인해주세요.');
                return;
            } else if (response?.error === 'Configuration') {
                console.log(response);
                setMessage('서버 오류가 발생했습니다. 잠시후 다시 시도해주세요.');
                return;
            }
            console.log(response);
        } catch (err) {
            setMessage('로그인 실패');
        }
    };
    const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value);
    };

    return (
        // 모달배경
        <div className="absolute bottom-0 left-0 right-0 top-0 z-[9999] flex h-full w-screen items-center justify-center bg-modal">
            <div
                className={` relative   flex h-full w-full  flex-col  items-center  overflow-hidden bg-white sm:h-[500px] sm:w-[420px]  sm:rounded-lg `}
            >
                <div className="relative flex  h-14 w-full shrink-0 flex-row items-center border-b border-solid px-3">
                    {/* 모달헤더 */}
                    <div className="absolute">
                        <BackButton />
                    </div>
                </div>
                <div className=" flex  w-full flex-grow flex-col items-center  p-6">
                    <span className="font-mono text-3xl font-bold text-primary ">Menteeto</span>
                    <span className="text-sm text-gray-500">로그인하여 멘토링을 시작하세요.</span>
                    <form onSubmit={onSubmit} className="mt-5 flex w-full flex-grow flex-col gap-5">
                        <div className="flex w-full flex-col gap-1">
                            <label htmlFor="email">이메일</label>
                            <input
                                id="email"
                                className="h-11 w-full rounded-md border border-solid border-gray-300 px-3"
                                value={email}
                                onChange={onChangeEmail}
                                type="text"
                                placeholder="이메일을 입력하세요."
                            />
                        </div>
                        <div className="flex w-full flex-col gap-1">
                            <label htmlFor="password">비밀번호</label>
                            <input
                                id="password"
                                className="h-11 w-full rounded-md border border-solid border-gray-300 px-3"
                                value={password}
                                onChange={onChangePassword}
                                type="password"
                                placeholder="비밀번호를 입력하세요"
                            />
                        </div>
                        <div className="mt-4 flex w-full flex-col items-center gap-6">
                            <button
                                type="submit"
                                className="flex w-full  flex-row items-center justify-center gap-2 rounded-md border border-solid border-gray-300 bg-primary p-3 text-white"
                            >
                                로그인
                                <ArrowLeftBackIcon className="h-4 w-4 rotate-180" />
                            </button>
                            {/* <div className="w-full border-t"></div> */}
                            <span className="text-sm text-gray-600 ">
                                아직도 회원이 아니신가요?&nbsp;&nbsp;
                                <Link
                                    href="/auth/signup"
                                    className="font-semibold text-blue-500 underline underline-offset-2"
                                >
                                    회원 가입
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
