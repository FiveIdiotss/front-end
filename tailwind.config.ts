import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        screens: {
            mobile: '768px',
            // => @media (min-width: 640px) { ... }
            tablet: '992px',

            laptop: '1200px',
            // => @media (min-width: 1024px) { ... }

            desktop: '1380px',
            // => @media (min-width: 1280px) { ... }

            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
        },
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                primary: {
                    DEFAULT: '#6554BD',
                },
                secondary: {
                    DEFAULT: '#C1BBEB',
                },
                modal: {
                    DEFAULT: '#28282887',
                },
            },
            boxShadow: {
                right: '10px 0 10px -3px rgba(0, 0, 0, 0.05), 4px 0 4px -2px rgba(0, 0, 0, 0.025)',
            },

            objectFit: ['cover', 'contain'],
        },
    },
    plugins: [],
};
export default config;
