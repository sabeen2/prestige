import { useState, useEffect } from "react";
import SectionWrapper from "@/components/layout/section-wrapper";
import { initGetTopArticles } from "@/services/articles/request";
import Ads from "@/components/layout/ads";
import PopupAd from "@/components/layout/popup-ad";
import FeaturedArticles from "./components/featured-articles";
import MainNewsCard from "./components/main-news-card";
import MoreArticles from "./components/more-articles";

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

export default function PrestigeHomepage() {
  const [topArticles, setTopArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopArticles = async () => {
      try {
        setLoading(true);
        const response = await initGetTopArticles();
        setTopArticles(response?.data || []);
      } catch (err) {
        setError("Failed to fetch articles");
        console.error("Error fetching top articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopArticles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Ads className="h-auto" size="HeaderAd" />
        <SectionWrapper>
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </SectionWrapper>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Ads className="h-auto" size="HeaderAd" />
        <SectionWrapper>
          <div className="text-center py-8 text-red-500">{error}</div>
        </SectionWrapper>
      </div>
    );
  }

  // Extract articles data
  const articles = topArticles || [];
  const mainFeaturedArticle = articles[0]?.article;
  const gridArticles = articles
    .slice(1, 5)
    .map((article: { article: any }) => article.article);

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <SectionWrapper>
        <Ads className="h-auto max-h-44 max-w-5xl " size="HeaderAd" />

        {mainFeaturedArticle && (
          <FeaturedArticles
            mainFeaturedArticle={mainFeaturedArticle}
            gridArticles={gridArticles}
          />
        )}
        <Ads className="h-auto w-[700px]" size="HomeAd1" />
        <MainNewsCard />
        <Ads className="h-auto w-[700px]" size="HomeAd3" />
        <Ads className="h-auto w-[700px]" size="HomeAd4" />
        <MoreArticles />
      </SectionWrapper>
      <Ads className="h-auto w-[900px]" size="FooterAd" />

      {/* Popup Ad - only shows on main page */}
      <PopupAd onMainPage={true} />
    </div>
  );
}
