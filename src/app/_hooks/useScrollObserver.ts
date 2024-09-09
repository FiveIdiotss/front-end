import { useEffect, useState } from 'react';

export const useScrollObserver = (threshold: number, bottomThreshold?: number) => {
    const [visible, setVisible] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const bottomReached = windowHeight + currentScrollY >= documentHeight - (bottomThreshold || 0);

            if (bottomThreshold !== undefined && bottomReached) {
                setVisible(false); // 바닥으로부터 bottomThreshold만큼 남았을 때 visible을 false로 설정
            } else if (currentScrollY > threshold && currentScrollY > lastScrollY) {
                setVisible(true);
            } else {
                setVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [threshold, lastScrollY, bottomThreshold]); // bottomThreshold를 의존성 배열에 추가

    return visible;
};
