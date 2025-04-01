import { useState, useEffect } from 'react';

/**
 * Custom hook that debounces a value.
 * 
 * This hook delays updating the returned value until after a specified delay
 * has passed since the last time the input value was changed.
 * 
 * @template T - The type of the value being debounced.
 * @param value - The value to debounce.
 * @param delay - The delay in milliseconds before updating the debounced value.
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, delay: number): T {
    // State to store the debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Set a timer to update the debounced value after the delay
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup the timer if the value or delay changes
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]); // Re-run the effect when value or delay changes

    return debouncedValue;
}