import Image from 'next/image';
import React, { use, useEffect } from 'react';
import success from '@/../public/success.png';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

function SuccessStep() {
    const router = useRouter();
    const queryClient = useQueryClient();

    useEffect(() => {}, []);

    return (
        <div className="flex h-full w-full flex-col   ">
            <div className="flex flex-grow flex-col items-center justify-center gap-2">
                <Image src={success} width={40} height={40} alt="signup_success" />
                <span>회원가입이 완료되었습니다!</span>
                <span className="text-sm text-gray-500">지금 바로 멘티토의 다양한 서비스를 이용해보세요!</span>
            </div>

            {/* <span className="font-mono text-3xl font-bold text-primary ">Menteeto</span> */}

            {/* <span>지금 바로 멘티토의 다양한 서비스를 이용해보세요!</span> */}
            <button
                type="button"
                onClick={() => {
                    router.back();
                    setTimeout(() => {
                        window.location.reload();
                    }, 100); // 100ms 정도의 딜레이를 줘서 새로고침, 새로고침 하면서 서버에 세션 업데이트
                }}
                className=" flex w-full  flex-row items-center justify-center gap-2 rounded-md border border-solid border-gray-300 bg-primary p-3 text-white"
            >
                닫기
            </button>
        </div>
    );
}

export default SuccessStep;
