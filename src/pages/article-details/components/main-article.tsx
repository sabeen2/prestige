import React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, Eye, Clock } from "lucide-react";
import { Article } from "../index";
import { getImageUrl } from "@/components/layout/image-compoent";
import Ads from "@/components/layout/ads";
import { formatNepaliDateTime } from "@/utils/helpers";
import { ShareButton } from "@/components/share-button";

const MainArticle = ({ article }: { article: Article }) => {
  // Helper function to calculate read time (approximate)
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
    const wordCount = textContent.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} मिनेट पढ्ने समय`;
  };

  // Helper function to create excerpt from description
  const createExcerpt = (description: string, maxLength: number = 200) => {
    const textContent = description.replace(/<[^>]*>/g, ""); // Remove HTML tags
    return textContent.length > maxLength
      ? textContent.substring(0, maxLength) + "..."
      : textContent;
  };

  // Helper function to split content for ads placement
  const splitContentForAds = (content: string) => {
    const textContent = content.replace(/<[^>]*>/g, ""); // Remove HTML tags to count actual text
    const words = textContent.split(/\s+/);
    const midPoint = Math.floor(words.length / 2);

    // For HTML content, we need to split more carefully
    // This is a simple approach - split by paragraphs or major breaks
    const paragraphs = content.split(/<\/p>|<br\s*\/?>|<\/div>/i);
    const midParagraph = Math.floor(paragraphs.length / 2);

    const firstHalf =
      paragraphs.slice(0, midParagraph).join("</p>") +
      (paragraphs.length > midParagraph ? "</p>" : "");
    const secondHalf = paragraphs.slice(midParagraph).join("</p>");

    return { firstHalf, secondHalf };
  };

  if (!article) {
    return (
      <div className="space-y-8">
        <div className="text-center text-muted-foreground">
          समाचार फेला परेन
        </div>
      </div>
    );
  }

  return (
    <article className="space-y-8">
      {/* Article Header */}
      <header className="space-y-6">
        <div className="flex items-center gap-2">
          <Badge variant="default" className="font-semibold">
            {article.category.name}
          </Badge>
          <Badge variant="outline" className="text-xs">
            <Clock className="h-3 w-3 mr-1" />
            {calculateReadTime(article.description)}
          </Badge>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
          {article.title}
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
          {createExcerpt(article.description)}
        </p>

        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            <span className="font-medium text-foreground">
              {article.author}
            </span>
          </div>

          <Separator orientation="vertical" className="h-4" />

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatNepaliDateTime(article.post_date)}</span>
          </div>

          <Separator orientation="vertical" className="h-4" />

          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>{article.views} पटक पढिएको</span>
          </div>
          <ShareButton article={article as any} />
        </div>
      </header>

      {/* Featured Image */}
      <div className="relative  overflow-hidden">
        <img
          src={getImageUrl(article.image1)}
          alt={article.title}
          className="w-full h-64 sm:h-80 lg:h-96 object-cover"
        />
      </div>

      {/* Article Body */}
      <div className="prose prose-lg max-w-none">
        {(() => {
          const { firstHalf, secondHalf } = splitContentForAds(
            article.description
          );
          return (
            <>
              <div
                className="text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: firstHalf }}
                style={{
                  fontSize: "18px",
                  lineHeight: "1.8",
                }}
              />

              {/* Ads in the middle of content */}
              <div className="my-8">
                <Ads
                  className="h-auto max-h-[50vh] md:w-[50vw] w-full"
                  size="ArticleMid"
                />
              </div>

              <div
                className="text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: secondHalf }}
                style={{
                  fontSize: "18px",
                  lineHeight: "1.8",
                }}
              />
            </>
          );
        })()}
      </div>

      {/* Sources */}
      {article.source && article.source.length > 0 && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">स्रोतहरू:</h3>
          <div className="space-y-2">
            {article.source.map((source, index) => (
              <div key={source.id} className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {index + 1}
                </Badge>
                <a
                  href={source.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {source.source}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default MainArticle;
