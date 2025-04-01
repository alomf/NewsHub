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
            // Attempt to retrieve the item from localStorage.
            const item = window.localStorage.getItem(key);
            // Parse the item if it exists, otherwise use the initial value.
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // Log any errors and fall back to the initial value.
            console.error(error);
            return initialValue;
        }
    });

    // Effect to update localStorage whenever the stored value or key changes.
    useEffect(() => {
        try {
            // Save the current value to localStorage.
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            // Log any errors that occur during the save operation.
            console.error(error);
        }
    }, [key, storedValue]);

    // Return the stored value and the function to update it as a tuple.
    return [storedValue, setStoredValue] as const;
}