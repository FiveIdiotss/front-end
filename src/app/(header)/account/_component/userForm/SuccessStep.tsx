import Image from 'next/image';
import React, { use, useEffect } from 'react';
import success from '@/../public/success.png';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { signIn, useSession } from 'next-auth/react';
import { FormikProps } from 'formik';
import { SignupFormType } from '@/app/Models/SignupType';
import usePrevPageStore from '@/app/_store/prevUrlStore';
import { pushNotification } from '@/app/util/pushNotification';

function SuccessStep({ formik }: { formik: FormikProps<SignupFormType> }) {
    const { prevUrl } = usePrevPageStore();

    const onLogin = async () => {
        try {
            // 여기서는 비동기 처리를 가정하고 await를 사용합니다.
            await signIn('credentials', {
                username: formik.values.email,
                password: formik.values.password,
                callbackUrl: prevUrl || '/',
            });
            // 성공적인 로그인 후의 처리를 추가할 수 있습니다.
        } catch (error) {
            // 에러 처리 로직을 추가합니다.
            pushNotification({
                msg: '바로 로그인에 실패했습니다. 다시 시도해주세요.',
                type: 'error',
                theme: 'light',
            });
        }
    };

    return (
        <div className="flex h-full w-full flex-col items-center   ">
            <div className="flex flex-grow flex-col items-center justify-center gap-4   px-3 text-gray-700">
                <span className=" mb-6 text-2xl font-semibold">
                    <span className="text-green-600">{formik.values.name}</span>님 멘티토 커뮤니티에 오신 것을
                    환영합니다! 🎉
                </span>
                <Image src={success} width={60} height={60} alt="signup_success" />
                <span className="mt-4">회원가입이 성공적으로 완료되었습니다.</span>
                <span className="text-sm text-gray-500">
                    이제 멘티토의 모든 서비스를 자유롭게 이용하실 수 있습니다.
                </span>
            </div>

            {/* <span className="font-mono text-3xl font-bold text-primary ">Menteeto</span> */}

            {/* <span>지금 바로 멘티토의 다양한 서비스를 이용해보세요!</span> */}
            <button
                type="button"
                onClick={onLogin}
                className=" flex w-full  flex-row items-center justify-center gap-2 rounded-md border border-solid border-gray-300 bg-primary p-3 text-white"
            >
                바로 로그인하기
            </button>
        </div>
    );
}

export default SuccessStep;
