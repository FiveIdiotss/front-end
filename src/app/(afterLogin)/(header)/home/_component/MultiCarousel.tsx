'use client';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
type Props = {
    children: React.ReactNode;
};
function MultiCarousel({ children }: Props) {
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
        <Carousel
            additionalTransfrom={0}
            containerClass="carousel-container"
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            dotListClass=""
            draggable={true}
            focusOnSelect={false}
            itemClass="px-2"
            pauseOnHover
            // minimumTouchDrag
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            showDots={false}
            sliderClass=""
            swipeable
            responsive={responsive}
            ssr={false} // means to render carousel on server-side.
        >
            {children}
        </Carousel>
    );
}

export default MultiCarousel;
