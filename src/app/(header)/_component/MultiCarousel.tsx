'use client';
import FaChevronRight from '@/app/_icons/common/chevronRight';
import Carousel, { ArrowProps } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface CustomLeftArrowProps extends ArrowProps {
    myOwnStuff: string;
}
interface CustomRightArrowProps extends ArrowProps {
    myOwnStuff: string;
}
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
                min: 1201,
            },
            items: 4,
            slidesToSlide: 4,
            // partialVisibilityGutter: 20,
        },
        tablet: {
            breakpoint: {
                max: 1200,
                min: 769,
            },
            items: 3,
            slidesToSlide: 3,
            // partialVisibilityGutter: 10,
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
    // const CustomRightArrow = ({ onClick }: CustomRightArrowProps) => {
    //     return (
    //         <button onClick={onClick} className="absolute -right-3 z-20  rounded-full bg-primary p-2 ">
    //             <FaChevronRight className="h-4 w-4" />
    //         </button>
    //     );
    // };

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
            className="u"
            pauseOnHover
            // minimumTouchDrag
            renderArrowsWhenDisabled={false}
            removeArrowOnDeviceType={['miniMobile', 'mobile']}
            renderButtonGroupOutside={true}
            renderDotsOutside={false}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            showDots={false}
            sliderClass=""
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            // customLeftArrow={}
            // customRightArrow={<CustomRightArrow myOwnStuff={''} />}
        >
            {children}
        </Carousel>
    );
}

export default MultiCarousel;
