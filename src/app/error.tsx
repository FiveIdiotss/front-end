'use client';

import FallbackUI from './_component/FallbackUI';

type Props = {
    error: Error;
    reset: () => void;
};
export default function ErrorBoundary({ error, reset }: Props) {
    return <FallbackUI error={error} resetErrorBoundary={reset} />;
}
