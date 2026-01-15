import React, { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'success' | 'warning' | 'error';
}

/**
 * iOS-style Badge component for status and category indicators
 */
const Badge: React.FC<BadgeProps> = ({ className, variant = 'default', children, ...props }) => {
    const baseStyles = 'ios-badge';

    const variants = {
        default: 'bg-ios-gray-100 text-ios-gray-700',
        success: 'bg-status-success text-status-success-text',
        warning: 'bg-status-warning text-status-warning-text',
        error: 'bg-status-error text-status-error-text',
    };

    return (
        <span className={cn(baseStyles, variants[variant], className)} {...props}>
            {children}
        </span>
    );
};

export default Badge;
