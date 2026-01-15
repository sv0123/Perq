/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            colors: {
                // iOS-inspired black & white palette
                ios: {
                    white: '#FFFFFF',
                    'gray-50': '#F5F5F7',
                    'gray-100': '#E5E5EA',
                    'gray-200': '#D1D1D6',
                    'gray-300': '#C7C7CC',
                    'gray-400': '#AEAEB2',
                    'gray-500': '#8E8E93',
                    'gray-600': '#6E6E73',
                    'gray-700': '#48484A',
                    'gray-800': '#3A3A3C',
                    'gray-900': '#2C2C2E',
                    'gray-950': '#1C1C1E',
                    black: '#000000',
                },
                // Subtle status tints (very minimal color)
                status: {
                    success: '#F0FFF4',
                    'success-text': '#064E3B',
                    warning: '#FFFBEB',
                    'warning-text': '#78350F',
                    error: '#FEF2F2',
                    'error-text': '#7F1D1D',
                }
            },
            fontFamily: {
                // SF Pro-inspired system fonts
                sans: [
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'SF Pro Display',
                    'SF Pro Text',
                    'Segoe UI',
                    'system-ui',
                    'sans-serif'
                ],
                mono: [
                    'SF Mono',
                    'Monaco',
                    'Courier New',
                    'monospace'
                ]
            },
            fontSize: {
                // iOS typography scale
                'large-title': ['34px', { lineHeight: '41px', fontWeight: '700' }],
                'title-1': ['28px', { lineHeight: '34px', fontWeight: '700' }],
                'title-2': ['22px', { lineHeight: '28px', fontWeight: '700' }],
                'title-3': ['20px', { lineHeight: '25px', fontWeight: '600' }],
                'body': ['17px', { lineHeight: '22px', fontWeight: '400' }],
                'callout': ['16px', { lineHeight: '21px', fontWeight: '400' }],
                'subhead': ['15px', { lineHeight: '20px', fontWeight: '400' }],
                'footnote': ['13px', { lineHeight: '18px', fontWeight: '400' }],
                'caption': ['12px', { lineHeight: '16px', fontWeight: '400' }],
            },
            borderRadius: {
                'ios': '12px',
                'ios-sm': '8px',
                'ios-lg': '16px',
                'ios-xl': '20px',
            },
            boxShadow: {
                // iOS-style minimal shadows
                'ios-sm': '0 1px 3px rgba(0, 0, 0, 0.06)',
                'ios': '0 2px 8px rgba(0, 0, 0, 0.08)',
                'ios-md': '0 4px 16px rgba(0, 0, 0, 0.1)',
                'ios-lg': '0 8px 24px rgba(0, 0, 0, 0.12)',
            },
            keyframes: {
                tap: {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(0.95)' },
                    '100%': { transform: 'scale(1)' },
                },
                slideIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
            },
            animation: {
                // iOS-style animations (150-300ms)
                'tap': 'tap 150ms cubic-bezier(0.25, 0.1, 0.25, 1)',
                'slide-in': 'slideIn 300ms cubic-bezier(0.25, 0.1, 0.25, 1)',
                'fade-in': 'fadeIn 250ms ease-in-out',
                'scale-in': 'scaleIn 200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                'marquee': 'marquee 45s linear infinite',
            },
            transitionDuration: {
                '150': '150ms',
                '250': '250ms',
            },
            transitionTimingFunction: {
                'ios': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
            },
        },
    },
    plugins: [],
}
