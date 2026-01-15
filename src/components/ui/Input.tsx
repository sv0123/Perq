import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

/**
 * iOS-style Input component with clean borders and focus states
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, helperText, type = 'text', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-subhead font-medium text-ios-gray-700 mb-2">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    type={type}
                    className={cn(
                        'ios-input',
                        error && 'border-status-error-text focus:ring-status-error-text',
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="mt-1.5 text-footnote text-status-error-text">{error}</p>
                )}
                {helperText && !error && (
                    <p className="mt-1.5 text-footnote text-ios-gray-500">{helperText}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
