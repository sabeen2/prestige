import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { Clock, Eye, TrendingUp } from "lucide-react";
import {
  IGetAllArticlesRequestData,
  initGetAllArticles,
} from "@/services/articles/request";
import { getImageUrl } from "@/components/layout/image-compoent";

interface Article {
  id: string;
  slug: string;
  title: string;
  categoryId: string;
  author: string;
  post_date: string;
  updated: string;
  image1: string;
  description: string;
  views: number;
  inserted: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

const MoreNewsSections = () => {
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [popularArticles, setPopularArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const latestRequestData: IGetAllArticlesRequestData = {
          page: 1,
          pageSize: 5,
          latest: true,
        };
        const popularRequestData: IGetAllArticlesRequestData = {
          page: 1,
          pageSize: 5,
          popular: true,
        };

        const [latestResponse, popularResponse] = await Promise.all([
          initGetAllArticles(latestRequestData),
          initGetAllArticles(popularRequestData),
        ]);

        setLatestArticles(latestResponse?.data?.data || []);
        setPopularArticles(popularResponse?.data?.data || []);
      } catch (err) {
        setError("Failed to fetch news sections");
        console.error("Error fetching news sections:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Helper function to strip HTML tags
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "");
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
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card rounded-lg border p-6">
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
        <div className="bg-card rounded-lg border p-6">
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card rounded-lg border p-6">
          <div className="text-center py-8 text-red-500">{error}</div>
        </div>
        <div className="bg-card rounded-lg border p-6">
          <div className="text-center py-8 text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-6 bg-primary rounded-full"></div>
          <h2 className="text-xl font-bold text-foreground">ताजा समाचार</h2>
        </div>
        <div className="space-y-4">
          {latestArticles.slice(0, 4).map((article: Article) => (
            <Link key={article.id} to={`/${article.slug}`}>
              <article className="flex gap-4 pb-4 border-b border-border last:border-b-0 hover:bg-muted/50 p-2  transition-colors group cursor-pointer">
                <div className="relative flex-shrink-0">
                  <img
                    src={getImageUrl(article.image1)}
                    alt={article.title}
                    className="w-24 h-16 object-cover  group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{getRelativeTime(article.inserted)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{article.views}</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-6 bg-primary rounded-full"></div>
          <h2 className="text-xl font-bold text-foreground">लोकप्रिय समाचार</h2>
          <TrendingUp className="w-4 h-4 text-primary" />
        </div>
        <div className="space-y-4">
          {popularArticles
            .slice(0, 4)
            .map((article: Article, index: number) => (
              <Link key={article.id} to={`/${article.slug}`}>
                <article className="flex gap-4 pb-4 border-b border-border last:border-b-0 hover:bg-muted/50 p-2  transition-colors group cursor-pointer">
                  <div className="relative flex-shrink-0">
                    <img
                      src={getImageUrl(article.image1)}
                      alt={article.title}
                      className="w-24 h-16 object-cover  group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-1 right-1 bg-secondary text-secondary-foreground text-xs px-1 rounded">
                      #{index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{getRelativeTime(article.inserted)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{article.views}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MoreNewsSections;
