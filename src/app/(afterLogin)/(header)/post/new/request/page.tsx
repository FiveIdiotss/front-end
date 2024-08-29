'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRequestMutation } from '../../_lib/uploadFile';
import { debounce } from 'lodash';
import QuillEditor from '../../_components/Editor';
import SubmitButton from '../../_components/SubmitButton';

function RequestFormPage() {
    const categoryRef = useRef<HTMLSelectElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const postMutation = useRequestMutation();
    const [content, setContent] = useState<string>('');
    const [mainImage, setMainImage] = useState<File[]>([]);

    const debouncedHandleSubmit = useCallback(
        debounce((value: string) => {
            setContent(value);
        }, 400), // 디바운스 시간을 300ms로 설정
        [],
    ); //

    const onSubmit = async () => {
        if (!categoryRef.current?.value) {
            alert('카테고리를 선택해주세요.');
            return;
        }
        if (!titleRef.current?.value) {
            alert('제목을 입력해주세요.');
            return;
        }
        if (!content) {
            alert('내용을 입력해주세요.');
            return;
        }
        postMutation.mutate({
            request: {
                title: titleRef.current?.value,
                content: content,
                boardCategory: categoryRef.current?.value,
                subBoardType: 'REQUEST',
                platform: 'WEB',
            },
            images: [],
        });
    };
    const handleMainImage = async (file: File) => {
        setMainImage([...mainImage, file]);
    };

    useEffect(() => {
        console.log('content', content);
    }, [content]);

    return (
        <div className="flex flex-grow flex-col pb-36">
            <div className=" mt-10 flex h-14 flex-row items-center justify-center rounded-lg bg-indigo-100">
                <span className="text-2xl">🙋‍♂️</span>
                <span className="  ml-4 text-base text-primary ">필요한 멘토링을 요청해요! </span>
            </div>
            <select
                ref={categoryRef}
                className="mt-6 w-52 cursor-pointer rounded-md  border border-neutral-400 bg-inherit bg-white p-2  text-sm  outline-none"
            >
                <option selected disabled hidden value="">
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

            <SubmitButton cancelUrl="/post" onSubmit={onSubmit} isLoading={postMutation.isPending} />
        </div>
    );
}

export default RequestFormPage;
