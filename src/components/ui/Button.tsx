import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    fullWidth?: boolean;
}

/**
 * iOS-style Button component with tap feedback and smooth animations
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            isLoading = false,
            fullWidth = false,
            disabled,
            children,
            ...props
        },
        ref
    ) => {
        const baseStyles = 'ios-button inline-flex items-center justify-center font-medium transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed';

        const variants = {
            primary: 'bg-ios-black text-white hover:opacity-90 active:opacity-80',
            secondary: 'bg-ios-white text-black border-2 border-ios-gray-300 hover:border-ios-black hover:bg-ios-gray-50',
            ghost: 'bg-transparent text-black hover:bg-ios-gray-50 active:bg-ios-gray-100',
            danger: 'bg-status-error text-status-error-text border border-status-error-text hover:bg-status-error-text hover:text-white',
        };

        const sizes = {
            sm: 'px-3 py-1.5 text-footnote rounded-ios-sm min-h-[32px]',
            md: 'px-5 py-2.5 text-body rounded-ios min-h-[44px]',
            lg: 'px-6 py-3.5 text-callout rounded-ios-lg min-h-[52px]',
        };

        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    fullWidth && 'w-full',
                    className
                )}
                {...props}
            >
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Loading...</span>
                    </div>
                ) : (
                    children
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
