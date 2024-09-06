'use client';

import { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BackButton from './BackButton';
import { signIn } from 'next-auth/react';
import ArrowLeftBackIcon from '@/app/_icons/common/ArrowLeftBackIcon';
import Link from 'next/link';
import usePrevPageStore from '@/app/_store/prevUrlStore';

export default function LoginModal() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [errorMessage, setErrorMessage] = useState(''); //로그인 에러메세지

    const searchParams = useSearchParams();
    const errorType = searchParams.get('error'); //로그인시 에러타입(서버에서 받아올 경우 CredentialsSignin)
    const errorCode = searchParams.get('code'); //로그인시 에러코드(서버에서 받아올 경우 wrong_password, no_user)
    const loginRequired = Boolean(searchParams.get('loginRequired')); //로그인 필요 여부

    const router = useRouter();

    const { prevUrl } = usePrevPageStore(); //이전 URL 저장 및 반환
    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        // setErrorMessage('');
        await signIn('credentials', {
            username: email,
            password,
            // redirect: loginRequired,
            callbackUrl: prevUrl || '/',
        });
    };
    const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value);
    };
    const onClose = () => {
        console.log('에러타입', errorType);
        console.log('prevUrl', prevUrl);
        if (Boolean(errorType)) {
            router.push(prevUrl);
        } else {
            router.back();
        }
    };

    // useEffect(() => {
    //     if (errorType) {
    //         if (errorType === 'CredentialsSignin') {
    //             if (errorCode === 'wrong_password') {
    //                 setErrorMessage('비밀번호가 일치하지 않습니다.');
    //             } else if (errorCode === 'no_user') {
    //                 setErrorMessage('해당 이메일이 존재하지 않습니다.');
    //             } else {
    //                 setErrorMessage('에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
    //             }
    //         } else {
    //             setErrorMessage('에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
    //         }
    //     }
    // }, [errorType, errorCode]);
    let errorMessage = '';

    if (errorType) {
        if (errorType === 'CredentialsSignin') {
            if (errorCode === 'wrong_password') {
                errorMessage = '비밀번호가 일치하지 않습니다.';
            } else if (errorCode === 'no_user') {
                errorMessage = '해당 이메일이 존재하지 않습니다.';
            } else {
                errorMessage = '에러가 발생했습니다. 잠시 후 다시 시도해주세요.';
            }
        } else {
            errorMessage = '에러가 발생했습니다. 잠시 후 다시 시도해주세요.';
        }
    }
    // useEffect(() => {
    //     if (email !== '' || password !== '') {
    //         setErrorMessage('');
    //     }
    // }, [email, password]);

    return (
        // 모달배경
        <div className="absolute bottom-0 left-0 right-0 top-0 z-[9999] flex h-full w-screen items-center justify-center bg-modal">
            <div
                className={` relative   flex h-full w-full  flex-col  items-center  overflow-hidden bg-white sm:h-[500px] sm:w-[420px]  sm:rounded-lg `}
            >
                <div className="relative flex  h-14 w-full shrink-0 flex-row items-center border-b border-solid px-3">
                    {/* 모달헤더 */}
                    <div className="absolute">
                        <BackButton onClose={onClose} />
                    </div>
                </div>
                <div className=" flex  w-full flex-grow flex-col items-center  p-6">
                    <span className="font-mono text-3xl font-bold text-primary ">Menteeto</span>
                    {loginRequired && (
                        <span className="text-sm font-medium text-gray-500">로그인이 필요한 서비스 입니다.</span>
                    )}
                    {!loginRequired && <span className="text-sm text-gray-500">로그인하여 멘토링을 시작하세요.</span>}

                    <form onSubmit={onSubmit} className="mt-5 flex w-full flex-grow flex-col gap-5">
                        <div className="flex w-full flex-col gap-1">
                            <label htmlFor="email">이메일</label>
                            <input
                                id="email"
                                className="h-11 w-full rounded-md border border-solid border-gray-300 px-3"
                                value={email}
                                onChange={onChangeEmail}
                                type="text"
                                placeholder="abcd@example.com"
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
                                placeholder="비밀번호"
                            />
                        </div>
                        <div className="flex w-full items-center justify-center">
                            <span className="text-sm text-red-500">{errorMessage}</span>
                        </div>
                        <div className=" flex w-full flex-col items-center gap-6">
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
                                    href="/account/signup"
                                    replace
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
