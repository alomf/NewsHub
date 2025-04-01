// Represents a news article with various metadata
export type Article = {
    id: string;
    title: string;
    description: string;
    source: { name: string };
    category: string;
    url: string;
    imageUrl?: string; // Added optional 'image' property
    publishedAt: string;
  };

// Defines the possible categories for news articles
export type Category = 
    | 'all' // All categories
    | 'world' // World news
    | 'nation' // National news
    | 'business' // Business news
    | 'technology' // Technology news
    | 'entertainment' // Entertainment news
    | 'sports' // Sports news
    | 'science' // Science news
    | 'health'; // Health news

// Represents a user and their preferences
export interface User {
    preferences: {
        categories: Category[]; // List of preferred categories
        darkMode: boolean; // Whether dark mode is enabled
        fontSize: 'small' | 'medium' | 'large'; // Preferred font size
        language: string; // Preferred language (e.g., 'en', 'es')
    };
}

// Represents the response from a news API
export interface NewsApiResponse {
    articles: Article[]; // List of articles returned by the API
    totalArticles?: number; // Optional total number of articles available
}

// Represents a newsletter subscription
export interface NewsLetterSubscription {
    email: string; // Subscriber's email address
    frequency: 'daily' | 'weekly' | 'monthly'; // Frequency of the newsletter
    categories: Category[]; // Categories the subscriber is interested in
}