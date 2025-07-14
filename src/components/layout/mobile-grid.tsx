import { Link } from "react-router-dom";
import { Calendar, User, Eye } from "lucide-react";
import { getImageUrl } from "@/components/layout/image-compoent";
import { formatNepaliDateTime } from "@/utils/helpers";

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

interface MobileGridProps {
  articles: Article[];
}

export const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>/g, "");
};

export default function MobileGrid({ articles }: MobileGridProps) {
  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <Link key={article.id} to={`/${article.slug}`}>
          <article className="group bg-card mb-2 border rounded-xl p-4 hover:shadow-lg transition-all duration-300">
            <div className="flex gap-4">
              {/* Content Section - Left Side */}
              <div className="flex-1">
                {/* Title - Can extend above image */}
                <h3 className="text-base font-semibold text-foreground line-clamp-3 leading-tight mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>

                {/* Content and Image Row */}
                <div className="flex gap-4 items-start">
                  {/* Description and Meta */}
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground line-clamp-4 mb-3">
                      {stripHtml(article.description)}
                    </p>

                    <div className="space-y-1">
                      {/* <div className="text-xs text-muted-foreground">
                        {formatNepaliDateTime(article.post_date)}
                      </div> */}

                      <div className="flex items-center gap-x-4">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <User className="w-3 h-3" />
                          <span className="truncate">{article.author}</span>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Eye className="w-3 h-3" />
                          <span>{article.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Image Section - Right Side */}
                  <div className="w-28 h-20 flex-shrink-0 relative overflow-hidden ">
                    <img
                      src={getImageUrl(article.image1)}
                      alt={article.title}
                      width={112}
                      height={80}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
