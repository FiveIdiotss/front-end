import { usePathname, useRouter } from 'next/navigation';
import usePrevPageStore from '../_store/prevUrlStore';

export const useRouteLogin = ({ isLoginRequired = false }: { isLoginRequired?: boolean }) => {
    const pathName = usePathname();
    const router = useRouter();
    const { prevUrl, setPrevUrl } = usePrevPageStore();

    const routeUrl = '/auth/login' + (isLoginRequired ? '?loginRequired=true' : '');

    const navigateToLogin = () => {
        console.log('prevUrl', pathName);
        setPrevUrl(pathName);
        router.push(routeUrl);
    };

    return { navigateToLogin, prevUrl }; // 이전 URL 저장 및 반환
};
