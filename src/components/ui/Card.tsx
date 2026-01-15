import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'outlined' | 'elevated';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    interactive?: boolean;
}

/**
 * iOS-style Card component with minimal shadows and clean borders
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        {
            className,
            variant = 'default',
            padding = 'md',
            interactive = false,
            children,
            ...props
        },
        ref
    ) => {
        const baseStyles = 'bg-ios-white rounded-ios-lg transition-all duration-250';

        const variants = {
            default: 'bg-ios-white border border-ios-gray-200',
            outlined: 'bg-transparent border-2 border-ios-gray-300',
            elevated: 'bg-ios-white shadow-ios-lg border-0',
        };

        const paddings = {
            none: '',
            sm: 'p-3',
            md: 'p-5',
            lg: 'p-6',
        };

        return (
            <div
                ref={ref}
                className={cn(
                    baseStyles,
                    variants[variant],
                    paddings[padding],
                    interactive && 'tap-feedback hover:shadow-ios-md hover:border-ios-gray-300 cursor-pointer',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

export default Card;
