import React, { useEffect } from 'react';
import { useMemberSubBoardsQuery } from '../../_lib/profileService/profileSubBoardsService';
import SubBoardCard from '../../../posts/_component/subBoard/SubBoardCard';
import Loading from '@/app/_component/Loading';
import ErrorDataUI from '@/app/_component/ErrorDataUI';
import EmptyDataUI from '@/app/_component/EmptyDataUI';
import SimplePagination from '@/app/(afterLogin)/_component/common/SimplePagination';

function ProfileSubBoards({ subBoardType }: { subBoardType: 'QUEST' | 'REQUEST' }) {
    const memberSubBoardsQuery = useMemberSubBoardsQuery({
        subBoardType: subBoardType,
    });

    const { data: subBoardData, isPending, error } = memberSubBoardsQuery;

    useEffect(() => {
        if (subBoardData) {
            console.log(subBoardType === 'QUEST' ? '작성한 질문글 목록' : '작성한 요청글 목록', subBoardData);
        }
    }, [subBoardData]);

    if (isPending) return <Loading description="작성된 멘토링 요청 데이터를 불러오는 중입니다." />;
    if (error)
        return (
            <ErrorDataUI
                text={error?.response?.data.message || '데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.'}
                onReset={memberSubBoardsQuery.refetch}
            />
        );
    return (
        <div className=" flex h-full w-full flex-col">
            {subBoardData?.pageInfo.totalElements === 0 && <EmptyDataUI text="작성한 게시글이 없습니다." />}
            {subBoardData?.data.map((subBoard) => (
                <SubBoardCard key={subBoard.subBoardId} data={subBoard} boardType={subBoardType} />
            ))}
            <SimplePagination totalPages={subBoardData?.pageInfo.totalPages || 1} />
        </div>
    );
}

export default ProfileSubBoards;
