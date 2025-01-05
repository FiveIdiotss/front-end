'use client';
import React, { useState } from 'react';
import { useQuestMutation, useUpdateQuestMutation } from '../../_lib/uploadSubBoardService';
import SubmitButton from '../SubmitButton';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';

import { CustomToast } from '@/app/util/customToast/CustomToast';
import { useSubBoardInitialValue } from '../../_util/useSubBoardInitialValue';
import Loading from '@/app/_component/Loading';
import { pushNotification } from '@/app/util/pushNotification';
const QuillEditor = dynamic(() => import('../Editor'), { ssr: false });

interface ErrMsgType {
    [key: string]: string;
    title: string;
    content: string;
    boardCategory: string;
}
const ERR_MSG: ErrMsgType = {
    title: '제목을 입력해주세요.',
    content: '내용을 입력해주세요.',
    boardCategory: '카테고리를 선택해주세요.',
};

function QuestForm({ editId }: { editId?: number }) {
    const router = useRouter();
    const postMutation = useQuestMutation(); //게시글 작성
    const updateQuestMutation = useUpdateQuestMutation(editId); //게시글 수정

    const isEditPage = Boolean(editId);

    const { initialValues, isPending } = useSubBoardInitialValue({
        boardType: 'QUEST',
        editId,
    });

    const formik = useFormik({
        initialValues,
        validateOnChange: false, // change 이벤트 발생시 validate 실행 여부
        enableReinitialize: true,

        onSubmit: (values) => {
            let errorMessage: string[] = [];

            Object.keys(values).forEach((key) => {
                const value = values[key];
                if (value === '' || (Array.isArray(value) && value.length === 0)) {
                    if (key === 'mainImage') {
                        return;
                    }
                    formik.setFieldError(key, ERR_MSG[key]);
                    errorMessage = [...errorMessage, ERR_MSG[key]];
                }
            });

            if (errorMessage.length > 0) {
                CustomToast({
                    msg: errorMessage[0],
                    position: 'top-center',
                });
                return;
            }

            if (isEditPage) {
                console.log('updateQuestMutation.mutate');
                updateQuestMutation.mutate(
                    {
                        title: values.title,
                        content: values.content,
                        boardCategory: values.boardCategory,
                        subBoardType: 'QUEST',
                        platform: 'WEB',
                        images: values.mainImage,
                    },
                    {
                        onSuccess: () => {
                            pushNotification({
                                msg: '게시글이 성공적으로 수정되었습니다.',
                                type: 'success',
                                theme: 'dark',
                            });
                            router.back();
                            router.refresh();
                        },
                    },
                );
            } else {
                console.log('postMutation.mutate');
                postMutation.mutate(
                    {
                        title: values.title,
                        content: values.content,
                        boardCategory: values.boardCategory,
                        subBoardType: 'QUEST',
                        platform: 'WEB',
                        images: values.mainImage,
                    },
                    {
                        onSuccess: () => {
                            pushNotification({
                                msg: '게시글이 성공적으로 등록되었습니다.',
                                type: 'success',
                                theme: 'dark',
                            });
                            router.push('/posts/quest');
                            router.refresh();
                        },
                    },
                );
            }
        },
    });

    if (isPending) return <Loading description="잠시만 기다려주세요..." />;

    return (
        <form className="flex w-full flex-col pb-36" onSubmit={formik.handleSubmit}>
            <div className=" flex min-h-12 w-full flex-row items-center justify-center  bg-orange-100 p-3">
                <span className="text-2xl">🙋‍♂️</span>
                <span className="  ml-4 text-sm text-black mobile:text-base ">궁금한 것들 질문하세요!</span>
            </div>
            <select
                onChange={(e) => formik.setFieldValue('boardCategory', e.target.value)}
                className="mt-6 w-52 cursor-pointer rounded-md  border border-neutral-400 bg-inherit bg-white p-2  text-sm text-gray-400  outline-none"
                value={formik.values.boardCategory}
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
                onChange={(e) => formik.setFieldValue('title', e.target.value)}
                className="mb-3 mt-6 w-full bg-inherit text-2xl outline-none"
                placeholder="제목에 핵심 내용을 요약해보세요."
                value={formik.values.title} // 기본값 설정 필수
            />

            <QuillEditor formik={formik} />

            <SubmitButton
                cancelUrl="/quest"
                type="submit"
                submitLabel={isEditPage ? '수정하기' : '작성하기'}
                isLoading={postMutation.isPending}
            />
        </form>
    );
}

export default QuestForm;
