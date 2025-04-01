import React from 'react';
import { Category } from '../types';

// Define the props for the CategoryBar component
interface CategoryBarProps {
    selectedCategory: Category; // Currently selected category
    onSelectCategory: (category: Category) => void; // Callback to handle category selection
}

// List of categories to display in the CategoryBar
const categories: Category[] = [
    'all', 
    'world', 
    'nation', 
    'business', 
    'technology', 
    'entertainment', 
    'sports', 
    'science', 
    'health'
];

// CategoryBar component
export function CategoryBar({ selectedCategory, onSelectCategory }: CategoryBarProps) {
    return (
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4">
                {/* Horizontal scrollable category buttons */}
                <div className="flex items-center gap-4 overflow-x-auto py-3 no-scrollbar">
                    {categories.map((category) => (
                        <button
                            key={category} // Unique key for each category
                            onClick={() => onSelectCategory(category)} // Handle category selection
                            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors
                                ${
                                    selectedCategory === category
                                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' // Active category styles
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800' // Inactive category styles
                                }`}
                        >
                            {/* Capitalize the first letter of the category */}
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}