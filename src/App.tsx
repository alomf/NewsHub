import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CategoryBar } from './components/CategoryBar';
import { ArticleCard } from './components/ArticleCard';
import { ShareModal } from './components/ShareModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { fetchNews } from './services/newsApi';
import type { Article, Category } from './types';

// Mock data for initial state and fallback
const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of AI in Healthcare',
    description:
      'Artificial Intelligence is revolutionizing healthcare with breakthrough innovations in diagnosis and treatment...',
    source: { name: 'Tech Daily' },
    category: 'technology',
    url: 'https://example.com',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80',
    publishedAt: '2024-03-10T10:00:00Z',
  },
  {
    id: '2',
    title: 'Global Climate Summit Reaches Historic Agreement',
    description:
      'World leaders have reached a landmark agreement on reducing carbon emissions...',
    source: { name: 'World News' },
    category: 'politics',
    url: 'https://example.com',
    image:
      'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?auto=format&fit=crop&q=80',
    publishedAt: '2024-03-09T15:30:00Z',
  },
  {
    id: '3',
    title: 'Breaking Records at the Olympics',
    description:
      'Athletes from around the world continue to push boundaries and set new records...',
    source: { name: 'Sports Central' },
    category: 'sports',
    url: 'https://example.com',
    image:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80',
    publishedAt: '2024-03-08T20:15:00Z',
  },
];

function App() {
  // State for dark mode, persisted in localStorage
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

  // State for selected category and search query
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // State for articles, loading, and error handling
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for sharing an article
  const [shareArticle, setShareArticle] = useState<Article | null>(null);

  // State for bookmarked articles, persisted in localStorage
  const [bookmarkedArticles, setBookmarkedArticles] = useLocalStorage<string[]>(
    'bookmarks',
    []
  );

  // Fetch articles whenever the selected category or search query changes
  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch articles from the API
        const response = await fetchNews(selectedCategory, searchQuery);

        // Update articles state with fetched data or fallback to mock data
        if (response && response.articles) {
          setArticles(
            response.articles.map((article: Article, index: number) => ({
              ...article,
              id: article.id || String(index + 1),
            }))
          );
        } else {
          setArticles(mockArticles);
        }
      } catch (err) {
        // Handle errors and fallback to mock data
        console.error('Error fetching articles:', err);
        setError('Failed to load articles. Please try again later.');
        setArticles(mockArticles);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [selectedCategory, searchQuery]);

  // Toggle bookmark for an article
  const toggleBookmark = (articleId: string) => {
    setBookmarkedArticles((prev) =>
      prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId]
    );
  };

  // Handle sharing an article
  const handleShare = (article: Article) => {
    setShareArticle(article);
  };

  // Filter articles based on the selected category
  const categoryFilteredArticles =
    selectedCategory === 'all'
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  // Sort articles to show bookmarked ones first
  const sortedArticles = [...categoryFilteredArticles].sort((a, b) => {
    const aBookmarked = bookmarkedArticles.includes(a.id);
    const bBookmarked = bookmarkedArticles.includes(b.id);

    if (aBookmarked && !bBookmarked) return -1;
    if (!aBookmarked && bBookmarked) return 1;

    // Maintain original order based on publishedAt date
    return (
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  });

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header component */}
        <Header
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onSearch={setSearchQuery}
        />

        {/* CategoryBar component */}
        <CategoryBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Error message */}
        {error && (
          <div className="container mx-auto px-4 py-4">
            <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-lg">
              {error}
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="container mx-auto px-4 py-8">
          {loading ? (
            // Loading spinner
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            // Articles grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  isBookmarked={bookmarkedArticles.includes(article.id)}
                  onBookmark={() => toggleBookmark(article.id)}
                  onShare={() => handleShare(article)}
                />
              ))}
            </div>
          )}
        </main>

        {/* ShareModal component */}
        {shareArticle && (
          <ShareModal
            article={shareArticle}
            onClose={() => setShareArticle(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
