import Loading from '@/app/_component/Loading';
import { useSession } from 'next-auth/react';
import { usePostsStore } from '@/app/_store/postsStore';
import Image from 'next/image';
import light from '@/../public/light-bulb.png';
import { useMutation } from '@tanstack/react-query';
import Axios from '@/app/util/axiosInstance';
import { th } from '@faker-js/faker';
import InfoModal from '@/app/(header)/post/_components/InfoModal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function MentoStepConsultationReview({ id }: { id: number }) {
    const { data: session, status } = useSession();
    const { pageStep, setPageStep, mentoForm, mentoName, title, setErrorMessage } = usePostsStore();
    const [completeModalOpen, setCompleteModalOpen] = useState(false);
    const router = useRouter();
    const mutation = useMutation({
        mutationFn: (data: { content: string; date: string; time: string }) => Axios.post(`/api/board/${id}`, data),
        onSuccess: () => {
            setCompleteModalOpen(true);
        },
        onError: (err) => {
            if (err.message === 'Request failed with status code 400') {
                return setErrorMessage('이미 신청한 멘토링입니다.');
            }

            setErrorMessage('등록에 실패했습니다. 다시 시도해주세요.');
        },
    });

    const onSubmit = () => {
        const data = {
            content: mentoForm.content,
            date: mentoForm.date,
            time: mentoForm.time.startTime,
        };
        mutation.mutate(data);
        console.log('제출', data);
    };
    const handleInfoClose = () => {
        setCompleteModalOpen(false);
        router.push('/post');
    };

    if (status === 'loading') return <Loading />;
    return (
        <>
            <div className="mt-7 flex  w-full flex-grow flex-col justify-between gap-10 overflow-y-auto">
                <dl className="flex flex-col gap-3">
                    <div className="flex flex-row ">
                        <dt className="w-20 flex-shrink-0 font-semibold text-neutral-800">멘토링명</dt>
                        <dd className="font-light text-neutral-700 ">{title}</dd>
                    </div>
                    <div className="flex flex-row ">
                        <dt className="w-20 font-semibold text-neutral-800">멘토</dt>
                        <dd className="font-light text-neutral-700 ">{mentoName}</dd>
                    </div>
                    <div className="flex flex-row ">
                        <dt className="w-20 font-semibold text-neutral-800">멘티</dt>
                        <dd className="font-light text-neutral-700 ">{session?.user?.memberDTO.name}</dd>
                    </div>
                    <div className="flex flex-row ">
                        <dt className="w-20 font-semibold text-neutral-800">일정</dt>
                        <dd className="font-light text-neutral-700 ">
                            {mentoForm.date.replaceAll('-', '.')} / {mentoForm.time.startTime}~{mentoForm.time.endTime}
                        </dd>
                    </div>
                    <div className="flex flex-row ">
                        <dt className="w-20 font-semibold text-neutral-800">메세지</dt>
                        <dd className="font-light text-neutral-700 ">{mentoForm.content}</dd>
                    </div>
                </dl>
                <div className="mb-7 flex w-full flex-row items-center gap-3 rounded-md bg-indigo-50 px-5 py-6">
                    <div className="">
                        <Image src={light} width={40} height={40} alt="전구" />
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <span className="text-sm text-neutral-700">{`멘토가 멘토링 요청 수락시 홈 하단의 채팅에 채팅방이 생성됩니다.`}</span>
                        <span className="text-sm text-neutral-700">{`신청 진행 현황은 마이페이지 -> 멘토링 신청 내역에서 확인할 수 있습니다.`}</span>
                    </div>
                </div>
            </div>
            <div className="flex h-fit   flex-row justify-end gap-2 ">
                <button
                    className="mt-7 h-10 w-24 rounded-md border border-solid border-gray-300 px-5 text-neutral-500 "
                    onClick={() => setPageStep(pageStep - 1)}
                >
                    이전
                </button>
                <button
                    className={`mt-7 h-10 w-24 rounded-md border border-solid border-gray-300 bg-primary px-5 text-white ${mutation.isPending ? 'hidden' : ''} `}
                    onClick={onSubmit}
                >
                    완료
                </button>
                <button
                    className={`mt-7 h-10 w-24 rounded-md border border-solid border-gray-300 bg-primary px-5 text-white ${mutation.isPending ? '' : 'hidden'}`}
                >
                    <Loading />
                </button>
            </div>
            <InfoModal
                open={completeModalOpen}
                onClose={handleInfoClose}
                completeText={'신청이 완료되었습니다.'}
                pageText={'잠시후 마이페이지로 이동합니다.'}
            />
        </>
    );
}

export default MentoStepConsultationReview;
