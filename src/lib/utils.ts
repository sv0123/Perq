import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format number as Indian Rupee currency
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
}

/**
 * Format credit card number with spaces (XXXX XXXX XXXX XXXX)
 */
export function formatCardNumber(cardNumber: string): string {
    return cardNumber.replace(/(\d{4})/g, '$1 ').trim();
}

/**
 * Mask credit card number (XXXX XXXX XXXX 1234)
 */
export function maskCardNumber(cardNumber: string): string {
    const last4 = cardNumber.slice(-4);
    return `•••• •••• •••• ${last4}`;
}

/**
 * Calculate INR value from reward points
 * @param points - Number of reward points
 * @param conversionRate - Points per rupee (default: 4)
 */
export function calculatePointsValue(points: number, conversionRate: number = 4): number {
    return points / conversionRate;
}

/**
 * Format large numbers with K, L, Cr suffixes (Indian system)
 */
export function formatNumber(num: number): string {
    const absNum = Math.abs(num);

    if (absNum >= 10000000) {
        // Crores
        return `${(num / 10000000).toFixed(2)}Cr`;
    } else if (absNum >= 100000) {
        // Lakhs
        return `${(num / 100000).toFixed(2)}L`;
    } else if (absNum >= 1000) {
        // Thousands
        return `${(num / 1000).toFixed(1)}K`;
    }

    return num.toString();
}

/**
 * Calculate days remaining until date
 */
export function daysUntil(date: Date): number {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Format date in readable format
 */
export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(date);
}

/**
 * Format relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(date: Date): string {
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffSeconds < 60) return 'Just now';
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)} min ago`;
    if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)} hours ago`;
    if (diffSeconds < 604800) return `${Math.floor(diffSeconds / 86400)} days ago`;

    return formatDate(date);
}

/**
 * Generate random ID
 */
export function generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Validate credit card number (Luhn algorithm)
 */
export function validateCardNumber(cardNumber: string): boolean {
    const cleaned = cardNumber.replace(/\s/g, '');

    if (!/^\d{13,19}$/.test(cleaned)) {
        return false;
    }

    let sum = 0;
    let isEven = false;

    for (let i = cleaned.length - 1; i >= 0; i--) {
        let digit = parseInt(cleaned[i], 10);

        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isEven = !isEven;
    }

    return sum % 10 === 0;
}

/**
 * Debounce function for search/filter
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            timeout = null;
            func(...args);
        };

        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(later, wait);
    };
}

/**
 * Get contrast color (black or white) for given background
 */
export function getContrastColor(hexColor: string): string {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
}
