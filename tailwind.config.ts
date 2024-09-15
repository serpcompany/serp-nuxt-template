import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
    theme: {
        fontFamily: {
            sans: [
                '-apple-system',
                'BlinkMacSystemFont',
                'Segoe UI',
                'Noto Sans',
                'Helvetica',
                'Arial',
                'sans-serif',
                'Apple Color Emoji',
                'Segoe UI Emoji',
            ],
        },
        extend: {
            aspectRatio: {
                auto: 'auto',
                square: '1 / 1',
                video: '16 / 9',
            },
        },
    },
};
