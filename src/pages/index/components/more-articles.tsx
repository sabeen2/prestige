import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { Clock, Eye } from "lucide-react";
import {
  initGetAllArticles,
  initGetRelatedArticlesByCategorySlug,
} from "@/services/articles/request";
import { getImageUrl } from "@/components/layout/image-compoent";
import MobileGrid from "@/components/layout/mobile-grid";

interface Article {
  id: string;
  slug: string;
  title: string;
  categoryId: string;
  author: string;
  post_date: string;
  schedule_date: string;
  image1: string | null;
  image2: string | null;
  image3: string | null;
  subtext1: string;
  subtext2: string;
  subtext3: string;
  description: string;
  featured: boolean;
  views: number;
  inserted: string;
  updated: string;
  category: {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    image: string | null;
    featured: boolean;
    disabled: boolean;
    order: number;
    inserted: string;
    updated: string;
  };
  source: Array<{
    id: string;
    source: string;
    link: string;
    articleId: string;
    inserted: string;
    updated: string;
  }>;
}

interface IGetAllArticlesResponse {
  success: boolean;
  data: {
    data: Article[];
  };
  message: string;
}

const MoreArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMoreArticles = async () => {
      try {
        setLoading(true);
        const relatedArticlesResponse: IGetAllArticlesResponse =
          await initGetAllArticles({
            page: 1,
            pageSize: 6,
            featured: false,
          });
        setArticles(relatedArticlesResponse?.data?.data || []);
      } catch (err) {
        setError("Failed to fetch articles");
        console.error("Error fetching more articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMoreArticles();
  }, []);

  // Helper function to strip HTML tags
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "");
  };

  // Helper function to create excerpt
  const createExcerpt = (description: string, maxLength: number = 100) => {
    const textContent = stripHtml(description);
    return textContent.length > maxLength
      ? textContent.substring(0, maxLength) + "..."
      : textContent;
  };

  // Helper function to format relative time
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60)
      );
      return `${diffInMinutes} मिनेट अगाडि`;
    } else if (diffInHours < 24) {
      return `${diffInHours} घण्टा अगाडि`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} दिन अगाडि`;
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-8 text-red-500">{error}</div>
      </div>
    );
  }

  // Show up to 6 related articles
  const displayArticles = articles;

  if (displayArticles.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">अन्य समाचारहरू...</h2>
        <div className="text-center text-muted-foreground py-8">
          सम्बन्धित समाचारहरू फेला परेन
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Secondary News Grid */}
      <h2 className="text-2xl font-bold mb-4"> थप समाचारहरू...</h2>
      <div className="mb-12">
        {/* Desktop Grid - Hidden on Mobile */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {displayArticles.map((article: Article) => (
            <Link key={article.id} to={`/${article.slug}`}>
              <article className="bg-card border  overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/20 group cursor-pointer">
                <div className="relative">
                  <img
                    src={getImageUrl(article.image1)}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                      {article.category.name}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {createExcerpt(article.description)}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {getRelativeTime(article.inserted)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{article.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Mobile Grid - Only visible on Mobile */}
        <div className="md:hidden">
          <MobileGrid articles={displayArticles} />
        </div>
      </div>
    </div>
  );
};

export default MoreArticles;
