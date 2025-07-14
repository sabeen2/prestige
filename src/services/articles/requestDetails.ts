import { RequestAuthType, RequestMethod } from "@/interfaces/http.interface";
const articlePrefix = "articles";

const articles = {
  getTopArticles: {
    controllerName: `top-articles`,
    requestMethod: RequestMethod.GET,
    queryKeyName: "GET_TOP_ARTICLES",
    requestAuthType: RequestAuthType.NOAUTH,
  },
  getAllArticles: {
    controllerName: `${articlePrefix}`,
    requestMethod: RequestMethod.GET,
    queryKeyName: "GET_ALL_ARTICLES",
    requestAuthType: RequestAuthType.NOAUTH,
  },
  getArticleBySlug: {
    controllerName: `${articlePrefix}/slug/{articleSlug}`,
    requestMethod: RequestMethod.GET,
    queryKeyName: "GET_ARTICLE_BY_SLUG",
    requestAuthType: RequestAuthType.NOAUTH,
  },
  getRelatedArticlesByCategorySlug: {
    controllerName: `published-articles/{articleId}/categories/slug/{categorySlug}`,
    requestMethod: RequestMethod.GET,
    queryKeyName: "GET_RELATED_ARTICLES_BY_CATEGORY_SLUG",
    requestAuthType: RequestAuthType.NOAUTH,
  },
};

export default articles;
