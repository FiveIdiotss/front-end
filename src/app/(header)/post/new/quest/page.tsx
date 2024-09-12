'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useQuestMutation } from '../../_lib/uploadSubBoardService';
import { debounce } from 'lodash';
import SubmitButton from '../../_components/SubmitButton';
import dynamic from 'next/dynamic';
import InfoModal from '../../_components/InfoModal';
import { useRouter } from 'next/navigation';
import { pushNotification } from '@/app/util/pushNotification';
const QuillEditor = dynamic(() => import('../../_components/Editor'), { ssr: false });

function QuestFormPage() {
    const categoryRef = useRef<HTMLSelectElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const postMutation = useQuestMutation();
    const [content, setContent] = useState<string>('');
    const [mainImage, setMainImage] = useState<File[]>([]);
    const [completeModalOpen, setCompleteModalOpen] = React.useState(false);

    const router = useRouter();

    const debouncedHandleSubmit = useCallback(
        debounce((value: string) => {
            setContent(value);
        }, 400), // 디바운스 시간을 300ms로 설정
        [],
    ); //
    const handleMainImage = async (file: File) => {
        setMainImage([...mainImage, file]);
    };

    const onSubmit = async () => {
        if (!categoryRef.current?.value) {
            return pushNotification({
                msg: '🚨  카테고리를 선택해주세요.',
                type: 'error',
                theme: 'light',
                isIcon: false,
                textColor: '#d4c114',
            });
            return;
        }
        if (!titleRef.current?.value) {
            return pushNotification({
                msg: '🚨  제목을 입력해주세요.',
                type: 'error',
                theme: 'light',
                isIcon: false,
                textColor: '#d4c114',
            });
            return;
        }
        if (!content) {
            return pushNotification({
                msg: '🚨  내용을 입력해주세요.',
                type: 'error',
                theme: 'light',
                isIcon: false,
                textColor: '#d4c114',
            });
            return;
        }
        postMutation.mutate(
            {
                request: {
                    title: titleRef.current?.value,
                    content: content,
                    boardCategory: categoryRef.current?.value,
                    subBoardType: 'QUEST',
                    platform: 'WEB',
                },

                images: mainImage,
            },
            {
                onSuccess: () => {
                    setCompleteModalOpen(true);
                },
            },
        );
    };
    const handleInfoClose = () => {
        setCompleteModalOpen(false);
        router.push('/posts/quest');
    };
    useEffect(() => {
        console.log('error', postMutation.error?.response?.data);
    }, [postMutation.error]);

    useEffect(() => {
        console.log('content', content);
    }, [content]);
    useEffect(() => {
        console.log('mainImage', mainImage);
    }, [mainImage]);
    return (
        <form className="flex w-full flex-col pb-36">
            <div className=" mt-10 flex min-h-12 w-full flex-row items-center justify-center rounded-lg bg-indigo-100 p-3">
                <span className="text-2xl">🙋‍♂️</span>
                <span className="  ml-4 text-sm text-primary mobile:text-base ">궁금한 것들 질문하세요!</span>
            </div>
            <select
                ref={categoryRef}
                className="mt-6 w-52 cursor-pointer rounded-md  border border-neutral-400 bg-inherit bg-white p-2  text-sm text-gray-400  outline-none"
                defaultValue="" // 기본값 설정 필수
            >
                <option disabled hidden value="">
                    카테고리 선택(필수)
                </option>
                <option value="이공">이공</option>
                <option value="자연">자연</option>
                <option value="인문">인문</option>
                <option value="사회">사회</option>
                <option value="의약">의약</option>
                <option value="예체능">예체능</option>
                <option value="사범">사범</option>
            </select>
            <input
                ref={titleRef}
                className="mb-3 mt-6 w-full bg-inherit text-2xl outline-none"
                placeholder="제목에 핵심 내용을 요약해보세요."
            />
            {/* <QuestRequestEditor content={content} setContent={debouncedHandleSubmit} /> */}

            <QuillEditor setContent={debouncedHandleSubmit} content={content} setMainImage={handleMainImage} />

            <SubmitButton cancelUrl="/quest" type="button" onSubmit={onSubmit} isLoading={postMutation.isPending} />
            <InfoModal
                open={completeModalOpen}
                onClose={handleInfoClose}
                completeText={'등록이 완료되었습니다.'}
                pageText={'잠시후 질문 게시판으로 이동합니다.'}
            />
        </form>
    );
}

export default QuestFormPage;
