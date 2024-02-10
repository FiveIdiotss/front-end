'use client';
import Sidebar_L from '@/app/(afterLogin)/_component/layout/sideBar_L';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 1500 },
        items: 4,
        slidesToSlide: 4,
    },
    desktop: {
        breakpoint: { max: 1499, min: 1024 },
        items: 3,
        slidesToSlide: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 570 },
        items: 2,
        slidesToSlide: 2,
    },
    mobile: {
        breakpoint: { max: 570, min: 0 },
        items: 1,
        slidesToSlide: 1,
    },
};

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
    'title 17',
    'title 18',
    'title 19',
    'title 20',
]; //하드코딩 된 멘토 글
function Home() {
    return (
        <div className=" mx-auto flex max-w-screen-xl flex-row">
            <div className="w-60">
                <Sidebar_L />
            </div>

            <section className="flex-grow">
                <Carousel responsive={responsive} containerClass="carousel-container">
                    {mentorPosts.map((post, index) => (
                        <div
                            key={index}
                            className=" mx-3 my-2 h-40   rounded-lg border border-neutral-100 text-center shadow"
                        >
                            <span>{post}</span>
                        </div>
                    ))}
                </Carousel>
            </section>
        </div>
    );
}

export default Home;
