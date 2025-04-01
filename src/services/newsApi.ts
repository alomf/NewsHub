import type { Article } from '../types';

// API key and base URL for the news API
const API_KEY = '6808c9079c721b993faa3c842d27e996'; // Free API key for demo purposes
const BASE_URL = 'https://gnews.io/api/v4';

/**
 * Fetches news articles from the API based on the provided category and query.
 * 
 * @param category - The category of news to fetch (e.g., 'sports', 'technology'). Defaults to 'all'.
 * @param query - A search query to filter news articles. Defaults to an empty string.
 * @returns A promise that resolves to an object containing an array of articles.
 */
export async function fetchNews(category: string = 'all', query: string = '') {
    try {
        // Determine the API endpoint based on whether a query is provided
        const endpoint = query ? 'search' : 'top-headlines';

        // Construct query parameters for the API request
        const params = new URLSearchParams({
            apikey: API_KEY, // API key for authentication
            lang: 'en', // Language of the articles
            country: 'us', // Country filter
            max: '10', // Maximum number of articles to fetch
            ...(query ? { q: query } : {}), // Add query parameter if provided
            ...(category !== 'all' ? { topic: category } : {}) // Add category filter if not 'all'
        });

        // Make the API request
        const response = await fetch(`${BASE_URL}/${endpoint}?${params}`);
        
        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`News API request failed: ${response.statusText}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Transform the response to match the Article type
        return {
            articles: data.articles.map((article: Article, index: number) => ({
                id: String(index + 1), // Generate a unique ID for each article
                title: article.title || 'Untitled', // Default title if missing
                description: article.description || 'No description available', // Default description if missing
                source: article.source?.name || 'Unknown Source', // Default source if missing
                category: category === 'all' ? 'general' : category, // Assign category
                url: article.url || '#', // Default URL if missing
                imageUrl: article.image, // Article image URL
                publishedAt: article.publishedAt || new Date().toISOString() // Default to current date if missing
            }))
        };
    } catch (error) {
        // Log and rethrow the error for further handling
        console.error('Error fetching news:', error);
        throw error;
    }
}