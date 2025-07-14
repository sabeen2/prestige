import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { initGetArticleBySlug } from "@/services/articles/request";
import SectionWrapper from "@/components/layout/section-wrapper";
import Ads from "@/components/layout/ads";
import MainArticle from "./components/main-article";
import RelatedNews from "./components/related-news";
import MoreNewsSections from "../index/components/more-news-sections";

export interface Article {
  id: string;
  slug: string;
  title: string;
  categoryId: string;
  author: string;
  post_date: string;
  updated: string;
  image1: string;
  image2: string | null;
  image3: string | null;
  subtext1: string;
  subtext2: string | null;
  subtext3: string | null;
  description: string;
  featured: boolean;
  views: number;
  inserted: string;
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

interface ApiResponse {
  success: boolean;
  data: Article;
  message: string;
}

const ArticleDetailsPage = () => {
  const params = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!params?.articleSlug) {
        setError("Article slug not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const articleSlug = Array.isArray(params.articleSlug)
          ? params.articleSlug[0]
          : params.articleSlug;

        const articleResponse: ApiResponse = await initGetArticleBySlug(
          articleSlug
        );

        if (!articleResponse.success || !articleResponse.data) {
          setError("Article not found");
          return;
        }

        setArticle(articleResponse.data);
      } catch (err) {
        setError("Failed to fetch article");
        console.error("Error fetching article:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params]);

  if (loading) {
    return (
      <SectionWrapper className="min-h-screen bg-background">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </SectionWrapper>
    );
  }

  if (error || !article) {
    return (
      <SectionWrapper className="min-h-screen bg-background">
        <div className="text-center py-8 text-red-500">
          {error || "Article not found"}
        </div>
      </SectionWrapper>
    );
  }

  const categorySlug = article?.category?.slug || "";
  const articleId = article?.id || "";

  return (
    <SectionWrapper className="min-h-screen bg-background">
      <Ads className="h-auto md:w-[70vw] w-full" size="ArticleTop" />
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b">
        <div className=" mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              to="/"
              className="hover:text-primary transition-colors font-medium"
            >
              गृहपृष्ठ
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Badge variant="secondary" className="text-xs">
              {categorySlug}
            </Badge>
          </nav>
        </div>
      </div>

      {/* Article Content */}
      <main className=" mx-auto container px-4 py-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <div className="max-w-4xl">
            <MainArticle article={article} />
          </div>
          <Ads
            className="h-auto max-h-[50vh] md:w-[20vw] w-full "
            size="ArticleSide"
          />
        </div>
        <Ads className="h-auto w-[55vw]" size="ArticleLow" />
      </main>
      {/* Related Articles */}

      <RelatedNews articleId={articleId} categorySlug={categorySlug} />
      <div className="mb-8">
        <Ads className="h-auto w-[900px] " size="FooterAd" />
      </div>
      <MoreNewsSections />
    </SectionWrapper>
  );
};

export default ArticleDetailsPage;
