import { usePathname, useRouter } from 'next/navigation';
import usePrevPageStore from '../_store/prevUrlStore';

export const useRouteSignup = () => {
    const pathName = usePathname();
    const router = useRouter();
    const { setPrevUrl } = usePrevPageStore();

    const routeUrl = '/account/signup';

    const navigateToSignup = () => {
        setPrevUrl(pathName);
        router.push(routeUrl);
    };

    return { navigateToSignup }; // 이전 URL 저장 및 반환
};
