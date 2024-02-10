'use client';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import MainCarousel from './Carousel';
import MentoPostCard from '../../_component/MentoPostCard';
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

function MentoPosts() {
    const [itemsPerSlide, setItemsPerSlide] = useState<number>(100);
    const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' });
    const isMediumScreen = useMediaQuery({ query: '(min-width: 601px) and (max-width: 1300px)' });
    const isLargeScreen = useMediaQuery({ query: '(min-width: 1301px)' });
    useEffect(() => {
        if (isSmallScreen) {
            setItemsPerSlide(1);
        } else if (isMediumScreen) {
            setItemsPerSlide(3);
        } else if (isLargeScreen) {
            setItemsPerSlide(4);
        }
    }, [isSmallScreen, isMediumScreen, isLargeScreen]);
    const chunkedPosts = Array.from({ length: Math.ceil(mentorPosts.length / itemsPerSlide) }).map((_, i) =>
        mentorPosts.slice(i * itemsPerSlide, i * itemsPerSlide + itemsPerSlide),
    );
    return (
        <div className="flex w-full flex-col ">
            {itemsPerSlide !== 100 && (
                <MainCarousel itemsPerSlide={itemsPerSlide}>
                    {chunkedPosts
                        .filter((chunk) => chunk.length === itemsPerSlide)
                        .map((chunk, i) => (
                            <div key={i} className="flex w-full justify-center   ">
                                <div className="flex w-[calc(100%-48px)] flex-row gap-3">
                                    {chunk.map((post, index) => (
                                        <div
                                            key={index}
                                            className="my-2 flex  flex-1 rounded-lg border border-neutral-100 text-center shadow "
                                        >
                                            <MentoPostCard post={post} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                </MainCarousel>
            )}
        </div>
    );
}

export default MentoPosts;
