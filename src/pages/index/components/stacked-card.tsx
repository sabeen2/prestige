import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "@/components/layout/image-compoent";
import { initGetArticlesByCategorySlug } from "@/services/categories/request";
import React from "react";
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

const StackedCard = ({ categorySlug }: { categorySlug: string }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryArticles = async () => {
      try {
        setLoading(true);
        const categoryArticles = await initGetArticlesByCategorySlug(
          categorySlug
        );
        setArticles(categoryArticles?.data || []);
      } catch (err) {
        setError("Failed to fetch category articles");
        console.error("Error fetching category articles:", err);
      } finally {
        setLoading(false);
      }
    };

    if (categorySlug) {
      fetchCategoryArticles();
    }
  }, [categorySlug]);

  // Helper function to strip HTML tags
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "");
  };

  // Helper function to get author initials
  const getAuthorInitials = (author: string) => {
    return author
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2);
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

  // Take only first 4 articles for the grid
  const displayArticles = articles.slice(0, 4);

  if (displayArticles.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-muted-foreground">
          यस श्रेणीमा कुनै समाचार उपलब्ध छैन
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-6 mb-16">
        {/* Desktop Grid - Hidden on Mobile */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {displayArticles.map((article: Article) => (
            <div key={article.id}>
              <Link to={`/${article.slug}`}>
                <article className="relative h-80  overflow-hidden group cursor-pointer">
                  <img
                    src={getImageUrl(article.image1)}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black"></div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h2 className="text-white text-xl font-bold mb-3 leading-tight group-hover:text-primary-foreground transition-colors">
                      {article.title}
                    </h2>

                    <div className="flex items-center gap-2 text-white text-sm">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <span className="text-red-600 text-xs font-bold">
                          {getAuthorInitials(article.author)}
                        </span>
                      </div>
                      <span>{article.author}</span>
                    </div>
                  </div>
                </article>
              </Link>
            </div>
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

export default StackedCard;
