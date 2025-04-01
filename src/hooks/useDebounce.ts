import { useState, useEffect } from 'react';

/**
 * Custom hook that debounces a value.
 * 
 * @template T - The type of the value being debounced.
 * @param value - The value to debounce.
 * @param delay - The debounce delay in milliseconds.
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, delay: number): T {
    // State to store the debounced value
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Set a timer to update the debounced value after the specified delay
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup function to clear the timer if the effect is re-run
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]); // Re-run the effect when `value` or `delay` changes

    return debouncedValue;
}