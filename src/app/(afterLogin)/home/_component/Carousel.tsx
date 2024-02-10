import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export type MainCarouselProps = {
    children: React.ReactNode;
    itemsPerSlide: number;
};
function MainCarousel({ children, itemsPerSlide }: MainCarouselProps) {
    return (
        <Carousel
            className="w-full  "
            emulateTouch={true}
            showArrows={itemsPerSlide !== 1}
            showStatus={false}
            renderArrowPrev={(onClickHandler, hasprev) =>
                hasprev && (
                    <button
                        type="button"
                        onClick={onClickHandler}
                        className="absolute top-[calc(50%-1.5rem)] z-10 h-12 w-12 rounded-full border border-neutral-300 hover:border-neutral-400 hover:shadow-lg"
                    >
                        {'<'}
                    </button>
                )
            }
            renderArrowNext={(onClickHandler, hasNext) =>
                hasNext && (
                    <button
                        type="button"
                        onClick={onClickHandler}
                        className="absolute right-0 top-[calc(50%-1.5rem)] z-10 h-12 w-12 rounded-full border border-neutral-300 shadow-sm hover:border-neutral-400 hover:shadow-lg"
                    >
                        {'>'}
                    </button>
                )
            }
        >
            {Array.isArray(children) ? children : [children]}
        </Carousel>
    );
}

export default MainCarousel;
