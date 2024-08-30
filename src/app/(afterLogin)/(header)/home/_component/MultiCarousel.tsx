'use client';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
type Props = {
    children: React.ReactNode;
};
function MultiCarousel({ children }: Props) {
    const responsive = {
        // desktop: {
        //     breakpoint: {
        //         max: 3000,
        //         min: 1801,
        //     },
        //     items: 5,
        //     slidesToSlide: 5,
        // },

        desktop: {
            breakpoint: {
                max: 3000,
                min: 120,
            },
            items: 4,
            slidesToSlide: 4,
        },
        tablet: {
            breakpoint: {
                max: 1200,
                min: 769,
            },
            items: 3,
            slidesToSlide: 3,
        },
        mobile: {
            breakpoint: {
                max: 768,
                min: 580,
            },
            items: 2,
            slidesToSlide: 2,
            partialVisibilityGutter: 70,
        },
        miniMobile: {
            breakpoint: {
                max: 579,
                min: 0,
            },
            items: 1,
            slidesToSlide: 1,
            partialVisibilityGutter: 70,
        },
    };
    return (
        <Carousel
            partialVisible={true}
            additionalTransfrom={0}
            containerClass="carousel-container"
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            dotListClass=""
            draggable={true}
            focusOnSelect={false}
            itemClass="px-1"
            pauseOnHover
            // minimumTouchDrag
            renderArrowsWhenDisabled={false}
            removeArrowOnDeviceType={['miniMobile', 'mobile']}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            showDots={false}
            sliderClass=""
            responsive={responsive}
            ssr={false} // means to render carousel on server-side.
        >
            {children}
        </Carousel>
    );
}

export default MultiCarousel;
