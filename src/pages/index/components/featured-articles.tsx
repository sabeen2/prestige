import { Link } from "react-router-dom";
import { Calendar, User, Eye } from "lucide-react";
import { getImageUrl } from "@/components/layout/image-compoent";
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

interface FeaturedArticlesProps {
  mainFeaturedArticle: Article | null;
  gridArticles: Article[];
}

export default function FeaturedArticles({
  mainFeaturedArticle,
  gridArticles,
}: FeaturedArticlesProps) {
  // Safety check for missing data
  if (!mainFeaturedArticle) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-8 text-muted-foreground">
          Featured article not available
        </div>
      </div>
    );
  }

  // Ensure gridArticles is an array
  const safeGridArticles = Array.isArray(gridArticles) ? gridArticles : [];

  return (
    <>
      <div className="space-y-16 mt-6">
        {/* Featured Articles */}
        <Link className="" to={`/${mainFeaturedArticle.slug}`}>
          <article
            className={`group 
             rounded-xl p-6 md:p-8 border bg-muted transition-all duration-300 cursor-pointer`}
          >
            {/* Category Badge */}
            <div className="mb-6 flex justify-center">
              <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                {mainFeaturedArticle.category?.name || "समाचार"}
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight text-center group-hover:text-primary transition-colors line-clamp-2 cursor-pointer">
              {mainFeaturedArticle.title}
            </h1>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-medium">
                  {mainFeaturedArticle.author}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {formatNepaliDateTime(mainFeaturedArticle.post_date)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{mainFeaturedArticle.views} पटक पढियो</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8">
              <div className="relative overflow-hidden  bg-muted">
                <img
                  src={getImageUrl(mainFeaturedArticle.image1)}
                  alt={mainFeaturedArticle.title}
                  className="w-full   object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </div>
            </div>
          </article>
        </Link>
      </div>

      {safeGridArticles.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="space-y-6 mb-16">
            {/* Desktop Grid - Hidden on Mobile */}
            <div className="hidden md:grid md:grid-cols-2 gap-6">
              {safeGridArticles.map((article: Article, index: number) => (
                <div key={article.id}>
                  <Link to={`/${article.slug}`}>
                    {/* Article Card */}
                    <article className="relative h-80  overflow-hidden cursor-pointer group">
                      <img
                        src={getImageUrl(article.image1)}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black group-hover:from-black/30 group-hover:to-black/90 transition-colors"></div>

                      {/* Content Overlay */}
                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <h2 className="text-white text-xl md:text-2xl font-bold mb-3 leading-tight line-clamp-2 group-hover:text-primary-foreground transition-colors">
                          {article.title}
                        </h2>

                        <div className="flex items-center gap-2 text-white text-sm">
                          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                            <span className="text-red-600 text-xs font-bold">
                              {article.author.charAt(0).toUpperCase()}
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
              <MobileGrid articles={safeGridArticles} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
