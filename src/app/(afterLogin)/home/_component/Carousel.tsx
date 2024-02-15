'use client';
import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import backImage from '@/../public/back.svg';
import nextIamge from '@/../public/next.svg';

export type MainCarouselProps = {
    children: React.ReactNode;
    itemsPerSlide: number;
};
function MainCarousel({ children, itemsPerSlide }: MainCarouselProps) {
    return (
        <Carousel
            className="w-full"
            emulateTouch={true}
            showArrows={itemsPerSlide !== 1}
            showStatus={false}
            showThumbs={false}
            renderArrowPrev={(onClickHandler, hasprev) =>
                hasprev && (
                    <button
                        type="button"
                        onClick={onClickHandler}
                        className="absolute top-[calc(50%-1.5rem)] z-10 h-12 w-12 rounded-full border border-neutral-300  bg-primary bg-opacity-10 p-2 hover:border-neutral-400 hover:shadow-lg"
                    >
                        <Image src={backImage} alt={''}></Image>
                    </button>
                )
            }
            renderArrowNext={(onClickHandler, hasNext) =>
                hasNext && (
                    <button
                        type="button"
                        onClick={onClickHandler}
                        className="absolute right-0 top-[calc(50%-1.5rem)] z-10  h-12 w-12  rounded-full border border-neutral-300  bg-primary bg-opacity-10 p-2 shadow-sm hover:border-neutral-400 hover:shadow-lg"
                    >
                        <Image src={nextIamge} alt={''} />
                    </button>
                )
            }
        >
            {Array.isArray(children) ? children : [children]}
        </Carousel>
    );
}

export default MainCarousel;
