import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NewsCard from '../components/NewsCard';
import ArticleCard from '../components/ArticleCard';
import newsService from '../services/newsService';
import articleService from '../services/articleService';

const StudentDashboard = () => {
 const [news, setNews] = useState([]);
 const [articles, setArticles] = useState([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  fetchData();
 }, []);

 const fetchData = async () => {
  try {
   const [newsData, articlesData] = await Promise.all([
    newsService.getLatestNews(),
    articleService.getAllArticles()
   ]);
   setNews(newsData);
   setArticles(articlesData);
  } catch (error) {
   console.error('Failed to fetch data:', error);
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="min-h-screen">
   <Navbar />

   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {/* Header */}
    <div className="flex justify-between items-center mb-8">
     <h1 className="text-3xl font-bold text-gray-800">Student Dashboard</h1>
     <Link to="/student/post-article" className="btn-primary">
      ✍️ Post Article
     </Link>
    </div>

    {loading ? (
     <div className="text-center py-12">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
     </div>
    ) : (
     <>
      {/* Tech News Section */}
      <section className="mb-12">
       <h2 className="text-2xl font-bold text-gray-800 mb-6">📰 Latest Tech News</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item, index) => (
         <NewsCard key={index} news={item} />
        ))}
       </div>
      </section>

      {/* Student Articles Section */}
      <section>
       <h2 className="text-2xl font-bold text-gray-800 mb-6">📝 Student Articles</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
         <ArticleCard key={article.id} article={article} />
        ))}
       </div>
       {articles.length === 0 && (
        <div className="text-center py-12 text-gray-500">
         No articles yet. Be the first to post!
        </div>
       )}
      </section>
     </>
    )}
   </div>
  </div>
 );
};

export default StudentDashboard;
