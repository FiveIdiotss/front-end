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
                'gradient-1': 'linear-gradient(to right, rgba(225, 207, 235, 0.6), rgba(183, 217, 243, 0.6))',
                'gradient-2': 'linear-gradient(to right, rgba(225, 207, 235, 0.7), rgba(183, 217, 243, 0.7))',
                'gradient-3': 'linear-gradient(to right, rgba(225, 207, 235), rgba(183, 217, 243 ))',
            },

            colors: {
                primary: {
                    DEFAULT: '#8977D9',
                },
                // primary: {
                //     DEFAULT: '#3b82f6',
                // },
                secondary: {
                    DEFAULT: '#C1BBEB',
                },
                modal: {
                    DEFAULT: '#28282887',
                },
            },
            boxShadow: {
                right: '10px 0 10px -3px rgba(0, 0, 0, 0.05), 4px 0 4px -2px rgba(0, 0, 0, 0.025)',
                bottom: '0 10px 10px -3px rgba(0, 0, 0, 0.05), 0 4px 4px -2px rgba(0, 0, 0, 0.025)',
                'sm-right': '5px 0 5px -2px rgba(0, 0, 0, 0.05), 2px 0 2px -1px rgba(0, 0, 0, 0.025)',
                'sm-bottom': '0 3px 5px -2px rgba(0, 0, 0, 0.05), 0 2px 2px -1px rgba(0, 0, 0, 0.025)',
                'md-right': '15px 0 15px -4px rgba(0, 0, 0, 0.05), 6px 0 6px -3px rgba(0, 0, 0, 0.025)',
                'md-bottom': '0 10px 15px -4px rgba(0, 0, 0, 0.05), 0 6px 6px -3px rgba(0, 0, 0, 0.025)',
                'lg-right': '20px 0 20px -5px rgba(0, 0, 0, 0.05), 8px 0 8px -4px rgba(0, 0, 0, 0.025)',
                'lg-bottom': '0 15px 20px -5px rgba(0, 0, 0, 0.05), 0 8px 8px -4px rgba(0, 0, 0, 0.025)',
                top: '0 -10px 10px -3px rgba(0, 0, 0, 0.05), 0 -4px 4px -2px rgba(0, 0, 0, 0.025)',
                left: '-10px 0 10px -3px rgba(0, 0, 0, 0.05), -4px 0 4px -2px rgba(0, 0, 0, 0.025)',
                'sm-top': '0 -3px 5px -2px rgba(0, 0, 0, 0.05), 0 -2px 2px -1px rgba(0, 0, 0, 0.025)',
                'sm-left': '-5px 0 5px -2px rgba(0, 0, 0, 0.05), -2px 0 2px -1px rgba(0, 0, 0, 0.025)',
                'md-top': '0 -10px 15px -4px rgba(0, 0, 0, 0.05), 0 -6px 6px -3px rgba(0, 0, 0, 0.025)',
                'md-left': '-15px 0 15px -4px rgba(0, 0, 0, 0.05), -6px 0 6px -3px rgba(0, 0, 0, 0.025)',
                'lg-top': '0 -15px 20px -5px rgba(0, 0, 0, 0.05), 0 -8px 8px -4px rgba(0, 0, 0, 0.025)',
                'lg-left': '-20px 0 20px -5px rgba(0, 0, 0, 0.05), -8px 0 8px -4px rgba(0, 0, 0, 0.025)',
            },

            objectFit: ['cover', 'contain'],
            keyframes: {
                fadeIn: {
                    '0%': {
                        opacity: '0',
                    },
                    '100%': {
                        opacity: '1',
                    },
                },
                fadeOut: {
                    '0%': {
                        opacity: '1',
                    },
                    '100%': {
                        opacity: '0',
                    },
                },
            },
            animation: {
                fadeIn: 'fadeIn 0.5s ease-out',
                fadeOut: 'fadeOut 0.5s ease-out ',
            },
        },
    },
    plugins: [],
};
export default config;
