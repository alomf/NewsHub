import { Bookmark, Share2 } from 'lucide-react';
import type { Article } from '../types';

// Define the props for the ArticleCard component
interface ArticleCardProps {
    article: Article; // The article data to display
    isBookmarked: boolean; // Whether the article is bookmarked
    onBookmark: (id: string) => void; // Callback for bookmark action
    onShare: (article: Article) => void; // Callback for share action
}

// ArticleCard component to display an article with actions for bookmarking and sharing
export function ArticleCard({
    article,
    isBookmarked,
    onBookmark,
    onShare,
}: ArticleCardProps) {
    return (
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            {/* Display the article image if available */}
            {article.imageUrl && (
                <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                />
            )}
            <div className="p-4">
                {/* Display the article source and published date */}
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        {article.source}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                </div>
                {/* Display the article title */}
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {article.title}
                </h2>
                {/* Display the article description */}
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {article.description}
                </p>
                <div className="flex items-center justify-between">
                    {/* Link to read the full article */}
                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
                    >
                        Read more
                    </a>
                    <div className="flex items-center gap-2">
                        {/* Button to bookmark or unbookmark the article */}
                        <button
                            onClick={() => onBookmark(article.id)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                            aria-label={
                                isBookmarked
                                    ? 'Remove bookmark'
                                    : 'Add bookmark'
                            }
                        >
                            <Bookmark
                                className={`w-5 h-5 transition-colors ${
                                    isBookmarked
                                        ? 'text-blue-500 fill-current'
                                        : 'text-gray-600 dark:text-gray-300'
                                }`}
                            />
                        </button>
                        {/* Button to share the article */}
                        <button
                            onClick={() => onShare(article)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                            aria-label="Share article"
                        >
                            <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}