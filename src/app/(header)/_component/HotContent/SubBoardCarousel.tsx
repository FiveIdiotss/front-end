'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules'; // Autoplay 모듈 가져오기
import HotSubBoard from './HotSubBoard';
import 'swiper/css/autoplay'; // autoplay 기능을 사용하는 경우
import 'swiper/css';
import 'swiper/css/pagination'; // Pagination 스타일
import { useHomeHotSuboardsQuery } from '../../_lib/homeHotContentService';
import HotIcon from '@/app/_icons/common/HotIcon';

function SubBoardCarousel() {
    const {
        data: questsData,
        isPending: isQuestsPending,
        error: qeustsError,
    } = useHomeHotSuboardsQuery({ subBoardType: 'QUEST' });
    const {
        data: requestsData,
        isPending: isRequestsPending,
        error: requestsError,
    } = useHomeHotSuboardsQuery({ subBoardType: 'REQUEST' });
    return (
        <div className="relative h-fit rounded-md border   border-neutral-300 py-3 ">
            <div className="absolute left-3 top-3  z-10 flex gap-1  bg-gray-50  ">
                <span className="text-sm font-semibold">주간 TOP5</span>
                <HotIcon className="h-4 w-4 text-red-500" />
            </div>
            <Swiper
                spaceBetween={30}
                modules={[Autoplay, Pagination]} // Autoplay 모듈 등록
                slidesPerView={1}
                autoplay={{ delay: 4000 }}
                loop={true}
                pagination={{
                    clickable: true,
                    dynamicBullets: true, // 동적 크기 변환
                }} // 점 표시기 활성화 및 클릭 가능
            >
                <SwiperSlide>
                    <HotSubBoard data={questsData} type="QUEST" isPending={isQuestsPending} />
                </SwiperSlide>
                <SwiperSlide>
                    <HotSubBoard data={requestsData} type="REQUEST" isPending={isRequestsPending} />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default SubBoardCarousel;
