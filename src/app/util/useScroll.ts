import { debounce } from 'lodash';
import { useState, useEffect } from 'react';

const useScroll = () => {
    const [scroll, setScroll] = useState<number>(0);
    const [prevScroll, setPrevScroll] = useState<number>(0);
    const [scrollDir, setScrollDir] = useState<'up' | 'down' | 'top'>('top');

    // FUNCTION 현재 스크롤 저장
    const onScrollDoc = () => {
        setScroll(document.scrollingElement?.scrollTop || 0);
    };

    //  FUNCTION 스크롤 감지
    useEffect(() => {
        if (!document) return;
        document.addEventListener('scroll', debounce(onScrollDoc, 300));

        return () => document.removeEventListener('scroll', debounce(onScrollDoc, 300));
    }, []);

    // FUNCTION 스크롤 방향 설정
    useEffect(() => {
        if (scroll === 0) {
            // 스크롤이 최상단에 있을 때를 감지하는 것이 필요하여 top 상태를 만들었는데, 최상단만 감지하는 로직으로 따로 빼면 더 좋았을 것 같습니다..!
            setScrollDir('top');
        } else if (prevScroll < scroll) {
            setScrollDir('down');
        } else if (prevScroll > scroll) {
            setScrollDir('up');
        }
        setPrevScroll(scroll);
    }, [scroll, prevScroll]);

    return { scroll, scrollDir };
};

export default useScroll;
