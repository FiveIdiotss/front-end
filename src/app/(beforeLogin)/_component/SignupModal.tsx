'use client';

import BackButton from './BackButton';
import { useFormState, useFormStatus } from 'react-dom';
import { onSubmit } from '../_lib/signup';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import search from '../../../../public/back.svg';
import UniSearch from './UniSearch';

export type SchoolDatas = {
    majorId: number;
    majorName: string;
    schoolId: number;
    schoolName: string;
};

export default function SignupModal() {
    const [state, formAction] = useFormState(onSubmit, null);
    const { pending: boolean } = useFormStatus();
    const [level, setLevel] = useState<number>(1);
    const [schoolDatas, setSchoolDatas] = useState<SchoolDatas>({
        majorId: 0,
        majorName: '',
        schoolId: 0,
        schoolName: '',
    });
    const [isFocused, setIsFocused] = useState(false);

    const nextHandler = () => {
        setLevel(level + 1); //level을 1씩 증가시킨다. 페이지 이동, 나중에 코드를 보기좋게 바꿔야함
    };
    const searchModalHandler = (number: number) => {
        setLevel(number); //0이면 대학검색창, 1이면 이메일인증페이지, 2이면 로그인정보, 3이면 재학정보및 개인정보
    };
    const selectSchoolHandler = (schoolData: SchoolDatas) => {
        setSchoolDatas(schoolData); //대학교 이름을 받아온다.
    };
    useEffect(() => {
        if (schoolDatas.majorName !== '') setLevel(2);
    }, [schoolDatas]); //초기에는 실행되지 않고 schoolName이 바뀔때만 실행된다.
    return (
        // 모달배경
        <div className="bg-modal absolute bottom-0 left-0 right-0 top-0 flex h-full w-screen items-center justify-center">
            <div className=" relative flex h-[550px] min-w-[450px]  flex-col items-center rounded-lg bg-white ">
                <div className="flex  h-14 w-full flex-row items-center border-b border-solid px-3 ">
                    {/* 모달헤더 */}
                    <div className="absolute">
                        {level !== 0 ? (
                            <BackButton />
                        ) : (
                            <button
                                onClick={() => searchModalHandler(2)}
                                className="hover:bg-primary  flex h-8 w-8 items-center justify-center rounded-full"
                            >
                                <Image src={search} height={32} width={32} alt="back" />
                            </button>
                        )}
                    </div>
                    <span className=" flex w-full items-center justify-center font-semibold">로그인 또는 회원가입</span>
                </div>
                <div className="flex  w-full flex-grow items-center justify-center  p-6">
                    <form action={formAction} className="w-full">
                        <div className={`${level === 1 ? 'block' : 'hidden'} flex w-full flex-col gap-2`}>
                            <div className=" flex w-full flex-row">
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="이메일"
                                    className="h-10 w-full rounded-md border border-solid border-gray-300 px-3"
                                />
                                <button
                                    disabled
                                    className="ml-3 w-24 rounded-md border border-solid border-gray-300 bg-gray-200 text-center"
                                >
                                    인증
                                </button>
                            </div>
                            <input
                                type="password"
                                name="pw"
                                id="pw"
                                placeholder="비밀번호"
                                className="h-10 w-full rounded-md border border-solid border-gray-300 px-3"
                            />
                            <input
                                type="password"
                                id="pw"
                                placeholder="비밀번호 확인"
                                className="h-10 w-full rounded-md border border-solid border-gray-300 px-3"
                            />

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

                        <div className={`${level === 2 ? 'block' : 'hidden'} flex flex-col gap-2 `}>
                            <div className="flex w-full flex-row">
                                <input
                                    type="text"
                                    name="schoolName"
                                    id="schoolName"
                                    placeholder="대학교"
                                    value={schoolDatas.schoolName}
                                    readOnly
                                    className="h-10 w-full rounded-md border border-solid border-gray-300
                                    px-3 outline-none
                                    focus:outline-none"
                                />
                                <button
                                    className="ml-3 w-24 rounded-md border border-solid border-gray-300 bg-gray-200 text-center hover:bg-gray-300"
                                    onClick={(evnet) => {
                                        evnet.preventDefault();
                                        searchModalHandler(0);
                                    }}
                                >
                                    검색
                                </button>
                            </div>
                            <input
                                type="text"
                                name="majorName"
                                id="majorName"
                                placeholder="전공"
                                className="h-10 w-full rounded-md border border-solid border-gray-300 px-3 focus:outline-none"
                                value={schoolDatas.majorName}
                                readOnly
                            />
                            <input type="hidden" name="majorId" value={schoolDatas.majorId} />
                            {/* majorId를 보내기위함,hidden사용 */}
                            <button
                                className="bg-primary h-10 w-full rounded-md border border-solid border-gray-300 px-3 text-white "
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
                                name="name"
                                id="name"
                                placeholder="이름"
                                className="h-10 w-full rounded-md border border-solid border-gray-300 px-3"
                            />
                            <input
                                type="text"
                                name="year"
                                id="year"
                                placeholder="학번"
                                className="h-10 w-full rounded-md border border-solid border-gray-300 px-3"
                            />

                            <div
                                className={`h-10 w-full rounded-md  border-solid px-3 ${isFocused ? 'border-2 border-blue-500' : 'border border-gray-300'}`}
                            >
                                <select
                                    name="gender"
                                    id="gender"
                                    className="h-full w-full focus:outline-none"
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                >
                                    <option value="" selected disabled>
                                        성별 선택
                                    </option>

                                    <option value="MALE">남성</option>
                                    <option value="FEMALE">여성</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={boolean}
                                className="bg-primary h-10 w-full rounded-md border border-solid border-gray-300 px-3 text-white"
                            >
                                회원가입
                            </button>
                        </div>
                        <div className={`${level === 0 ? 'block' : 'hidden'} flex flex-col gap-2`}>
                            <UniSearch selectSchoolHandler={selectSchoolHandler} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
