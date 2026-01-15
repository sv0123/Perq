import { useState, useEffect } from 'react';

/**
 * Custom hook for localStorage management with TypeScript
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
    // State to store our value
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error loading ${key} from localStorage:`, error);
            return initialValue;
        }
    });

    // Return a wrapped version of useState's setter function that
    // persists the new value to localStorage
    const setValue = (value: T | ((val: T) => T)) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);

            window.localStorage.setItem(key, JSON.stringify(valueToStore));

            // Dispatch custom event for cross-tab synchronization
            window.dispatchEvent(
                new CustomEvent('localStorageChange', {
                    detail: { key, value: valueToStore },
                })
            );
        } catch (error) {
            console.error(`Error saving ${key} to localStorage:`, error);
        }
    };

    // Listen for changes from other tabs
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === key && e.newValue) {
                try {
                    setStoredValue(JSON.parse(e.newValue));
                } catch (error) {
                    console.error(`Error parsing ${key} from storage event:`, error);
                }
            }
        };

        const handleCustomEvent = (e: Event) => {
            const customEvent = e as CustomEvent;
            if (customEvent.detail.key === key) {
                setStoredValue(customEvent.detail.value);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('localStorageChange', handleCustomEvent);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('localStorageChange', handleCustomEvent);
        };
    }, [key]);

    return [storedValue, setValue] as const;
}
