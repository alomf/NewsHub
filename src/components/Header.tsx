import { useState, useRef, useEffect } from 'react';
import { Search, Moon, Sun, X } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce.ts';

interface HeaderProps {
    darkMode: boolean; // Indicates whether dark mode is enabled
    onToggleDarkMode: () => void; // Callback to toggle dark mode
    onSearch: (query: string) => void; // Callback to handle search queries
}

export function Header({ darkMode, onToggleDarkMode, onSearch }: HeaderProps) {
    // State to manage the search input value
    const [searchValue, setSearchValue] = useState('');

    // Debounced version of the search value to reduce frequent updates
    const debouncedSearch = useDebounce(searchValue, 500);

    // Ref to access the search input element
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Effect to trigger the onSearch callback whenever the debounced search value changes
    useEffect(() => {
        onSearch(debouncedSearch);
    }, [debouncedSearch, onSearch]);

    // Clears the search input and focuses the input field
    const handleClearSearch = () => {
        setSearchValue('');
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                        NewsHub
                    </h1>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-xl mx-4">
                        <div className="relative">
                            {/* Search Icon */}
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            
                            {/* Search Input */}
                            <input
                                ref={searchInputRef}
                                type="search"
                                placeholder="Search news..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className="w-full pl-10 pr-10 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-full focus:ring-2 focus:ring-blue-500 dark:text-white"
                            />
                            
                            {/* Clear Button */}
                            {searchValue && (
                                <button
                                    onClick={handleClearSearch}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    <X className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Dark Mode Toggle */}
                    <button
                        onClick={onToggleDarkMode}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                    >
                        {darkMode ? (
                            <Sun className="w-6 h-6 text-gray-300" />
                        ) : (
                            <Moon className="w-6 h-6 text-gray-600" />
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}