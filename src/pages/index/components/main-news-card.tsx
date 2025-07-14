import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";
import {
  Clock,
  Eye,
  TrendingUp,
  Bookmark,
  Share2,
  Calendar,
  User,
} from "lucide-react";
import MoreNewsSections from "./more-news-sections";
import {
  IGetAllArticlesRequestData,
  initGetAllArticles,
  initGetTopArticles,
} from "@/services/articles/request";
import { getImageUrl } from "@/components/layout/image-compoent";
import Ads from "@/components/layout/ads";
import { formatNepaliDateTime } from "@/utils/helpers";
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

const MainNewsCard = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedArticles = async () => {
      try {
        setLoading(true);
        const requestData: IGetAllArticlesRequestData = {
          page: 1,
          pageSize: 5,
          featured: true,
        };
        const featuredArticles = await initGetAllArticles(requestData);
        setArticles(featuredArticles?.data?.data?.slice(0, 4) || []);
      } catch (err) {
        setError("Failed to fetch featured articles");
        console.error("Error fetching featured articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedArticles();
  }, []);

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ne-NP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  // Helper function to strip HTML tags
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "");
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

  const featuredArticle = articles[0];
  const secondaryArticles = articles.slice(1, 4);

  if (!featuredArticle) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-8 text-muted-foreground">
          No articles available
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Featured News Section */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-t-lg font-medium">
          <TrendingUp className="w-4 h-4" />
          मुख्य समाचार
        </div>

        <div className="flex flex-col xl:flex-row items-start justify-center gap-6">
          <Link to={`/${featuredArticle.slug}`} className="flex-1">
            <article className="bg-card border border-t-0 rounded-b-lg rounded-tr-lg overflow-hidden transition-all duration-300 cursor-pointer">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-primary uppercase tracking-wide">
                    ब्रेकिंग
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight hover:text-primary transition-colors">
                  {featuredArticle.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="font-medium">
                      {featuredArticle.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {formatNepaliDateTime(featuredArticle.post_date)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{featuredArticle.views} पटक पढियो</span>
                  </div>
                </div>

                <div className="relative mb-6 group">
                  <img
                    src={getImageUrl(featuredArticle.image1)}
                    alt={featuredArticle.title}
                    className="w-full md:h-80 object-cover  transition-transform duration-300"
                  />
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed line-clamp-2">
                  {stripHtml(featuredArticle.description)}
                </p>
              </div>
            </article>
          </Link>

          {/* Fixed ads container */}
          <div className="w-full xl:w-auto xl:min-w-[300px] xl:max-w-[400px] flex-shrink-0">
            <Ads className="h-auto max-h-[600px] w-full" size="HomeSideAd" />
          </div>
        </div>
      </div>

      {/* Secondary News Grid */}
      <div className="mb-12">
        {/* Desktop Grid - Hidden on Mobile */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {secondaryArticles.map((article: Article, index: number) => (
            <Link key={article.id} to={`/${article.slug}`}>
              <article className="bg-card border  overflow-hidden transition-all duration-300 hover:border-primary/20 group cursor-pointer">
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
                    {stripHtml(article.description)}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(article.post_date).toLocaleDateString(
                          "ne-NP"
                        )}
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
          <MobileGrid articles={secondaryArticles} />
        </div>
      </div>
      <Ads className="h-auto w-[700px] mx-auto" size="HomeAd2" />

      {/* More News Sections */}
      <MoreNewsSections />
    </div>
  );
};

export default MainNewsCard;
