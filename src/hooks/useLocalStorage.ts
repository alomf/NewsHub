import { useState, useEffect } from 'react';

/**
 * Custom hook to manage state synchronized with localStorage.
 * 
 * @template T - The type of the stored value.
 * @param key - The key under which the value is stored in localStorage.
 * @param initialValue - The initial value to use if no value is found in localStorage.
 * @returns A tuple containing the stored value and a function to update it.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
    // State to store the current value, initialized from localStorage or the provided initial value.
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue; // Parse the stored JSON or use the initial value.
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return initialValue; // Fallback to the initial value in case of an error.
        }
    });

    // Effect to update localStorage whenever the key or stored value changes.
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue)); // Save the value as a JSON string.
        } catch (error) {
            console.error('Error writing to localStorage:', error);
        }
    }, [key, storedValue]); // Dependencies: re-run effect when key or storedValue changes.

    // Return the stored value and the setter function as a tuple.
    return [storedValue, setStoredValue] as const;
}