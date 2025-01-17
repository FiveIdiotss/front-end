// Next.js의 app/providers.jsx
'use client';

// 서버 컴포넌트에서는 useState나 useRef를 사용할 수 없기 때문에,
// 이 부분을 별도의 파일로 추출하고 맨 위에 'use client'를 추가한다.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type Props = {
    children: React.ReactNode;
};

// QueryClient 인스턴스 생성
function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // SSR에서는 보통 클라이언트에서 즉시 refetch하는 것을 피하기 위해
                // 0 이상의 staleTime을 설정하는 것이 좋다.
                staleTime: 60,
                refetchOnMount: true,
                refetchOnReconnect: false,
            },
        },
    });
}

// 브라우저에서 생성된 QueryClient 인스턴스 저장
let browserQueryClient: QueryClient | undefined = undefined;

// 서버 또는 클라이언트에 따라 QueryClient 인스턴스를 반환한다.
function getQueryClient() {
    if (typeof window === 'undefined') {
        // 서버: 항상 새 query client를 만든다.
        return makeQueryClient();
    } else {
        // 브라우저: 아직 없는 경우 새 query client를 만든다.
        // 초기 렌더링 중 React가 일시 중단되면 새 클라이언트를 다시 만들지 않도록 하는 것이 매우 중요하다.
        // query client 생성 아래에 suspense boundary가 있는 경우에는 필요하지 않을 수 있다.
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}

export default function ServerRQProvider({ children }: Props) {
    // 참고: 일시 중단될 수 있는 코드와 이 코드 사이에 suspense boundary가 없는 경우
    // query client를 초기화할 때 useState를 피해야 한다.
    // 초기 렌더링에서 일시 중단되고 boundary가 없으면 React가 클라이언트를 "버린"다.
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children} <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    );
}
