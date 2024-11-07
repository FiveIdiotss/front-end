const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development', // 개발 모드에서는 PWA 비활성화
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,

    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
            {
                protocol: 'http',
                hostname: '**',
            },
        ],
    },
};

module.exports = withPWA(nextConfig);
