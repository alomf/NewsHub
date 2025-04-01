import type { Article } from '../types';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://gnews.io/api/v4';

export async function fetchNews(category: string = 'all', query: string = '') {
    try {
        const endpoint = query ? 'search' : 'top-headlines';

        const params = new URLSearchParams({
            apiKey: API_KEY,
            lang: 'en',
            country: 'us',
            max: '10',
            ...(query ? {q: query} : {}),
            ...(category !== 'all' ? {category} : {}),
        });

        const response = await fetch(`${BASE_URL}/${endpoint}?${params}`);
        if (!response.ok) {
            throw new Error(`Error fetching news: ${response.statusText}`);
        }

        const data = await response.json();

        return {
            articles: data.articles.map((article: Article, index: number) => ({
                id: String(index + 1),
                title: article.title || 'Untitled',
                description: article.description || 'No description available',
                source: article.source?.name || 'Unknown Source',
                category: category === 'all' ? 'general' : category,
                url: article.url || '#',
                imageUrl: article.image,
                publishedAt: article.publishedAt || new Date().toISOString(),
            })),
        };
    } catch(error) {
        console.error('Error fetching news:', error);
        throw error;
    }
}