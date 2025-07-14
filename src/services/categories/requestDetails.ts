import { RequestAuthType, RequestMethod } from "@/interfaces/http.interface";

const categoryPrefix = "categories";

const categories = {
  getCategories: {
    controllerName: `${categoryPrefix}`,
    requestMethod: RequestMethod.GET,
    queryKeyName: "GET_CATEGORIES",
    requestAuthType: RequestAuthType.NOAUTH,
  },
  getArticlesByCategorySlug: {
    controllerName: `articles/categories/slug/{categorySlug}`,
    requestMethod: RequestMethod.GET,
    queryKeyName: "GET_ARTICLES_BY_CATEGORY_SLUG",
    requestAuthType: RequestAuthType.NOAUTH,
  },

  // getRelatedArticles: {
  //   // controllerName: `articles/{articleId}/categories/slug/{categorySlug}`,
  //   controllerName: `published-articles/{articleId}/categories/slug/{categorySlug}`,
  //   requestMethod: RequestMethod.GET,
  //   queryKeyName: "GET_RELATED_ARTICLES",
  //   requestAuthType: RequestAuthType.NOAUTH,
  // },
};

export default categories;
