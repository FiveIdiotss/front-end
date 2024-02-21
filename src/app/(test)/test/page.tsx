'use client';
import MenteePostCard from '@/app/(afterLogin)/_component/MenteePostCard';
import MentoPostCard from '@/app/(afterLogin)/_component/MentoPostCard';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const mentorPosts = [
    'title 1',
    'title 2',
    'title 3',
    'title 4',
    'title 5',
    'title 6',
    'title 7',
    'title 8',
    'title 9',
    'title 10',
    'title 11',
    'title 12',
    'title 13',
    'title 14',
    'title 15',
    'title 16',
]; //하드코딩 된 멘토 글

function page() {
    const responsive = {
        desktop: {
            breakpoint: {
                max: 3000,
                min: 1460,
            },
            items: 5,
            slidesToSlide: 5,
        },

        tablet: {
            breakpoint: {
                max: 1459,
                min: 1200,
            },
            items: 4,
            slidesToSlide: 4,
        },
        mobile: {
            breakpoint: {
                max: 1199,
                min: 600,
            },
            items: 3,
            slidesToSlide: 3,
        },
        smallMobile: {
            breakpoint: {
                max: 601,
                min: 0,
            },
            items: 2,
            slidesToSlide: 2,
        },
    };

    return (
        <div className="  flex h-full  flex-row items-center ">
            <div className="w-full px-3 sm:px-10 lg:w-[calc(100%-240px)]">
                <section className="flex  w-full ">
                    <Carousel
                        containerClass="carousel-container"
                        arrows
                        autoPlaySpeed={3000}
                        centerMode={false}
                        className=""
                        dotListClass=""
                        draggable
                        focusOnSelect={false}
                        infinite
                        itemClass="px-2"
                        keyBoardControl
                        minimumTouchDrag={80}
                        pauseOnHover
                        renderArrowsWhenDisabled={false}
                        renderButtonGroupOutside={false}
                        renderDotsOutside={false}
                        rewind={false}
                        rewindWithAnimation={false}
                        rtl={false}
                        shouldResetAutoplay
                        showDots={false}
                        sliderClass=""
                        swipeable
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                    >
                        {mentorPosts.map((post, index) => (
                            <MentoPostCard key={index} post={post} />
                        ))}
                    </Carousel>
                </section>
            </div>
            <div className="hidden h-full  w-60 bg-zinc-800 md:block ">
                <div className="flex flex-col p-5">
                    <div className=" h-80 w-full rounded-lg bg-slate-200"></div>
                </div>
            </div>
        </div>
    );
}

export default page;
