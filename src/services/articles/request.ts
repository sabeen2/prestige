import { makeFetchRequest } from "@/utils/http/makeFetchRequest";
import { apiList } from "../api-list";

const {
  getTopArticles,
  getAllArticles,
  getArticleBySlug,
  getRelatedArticlesByCategorySlug,
} = apiList.articles;

export const initGetTopArticles = async () => {
  try {
    const response = await makeFetchRequest(getTopArticles);
    return response;
  } catch (error) {
    return error;
  }
};

export interface IGetAllArticlesRequestData {
  page: number;
  pageSize: number;
  featured?: boolean;
  popular?: boolean;
  latest?: boolean;
}

export const initGetAllArticles = async (
  requestData: IGetAllArticlesRequestData
) => {
  try {
    const response = await makeFetchRequest(getAllArticles, {
      params: {
        page: requestData.page,
        pageSize: requestData.pageSize,
        featured: requestData.featured ?? false,
        popular: requestData.popular ?? false,
        latest: requestData.latest ?? false,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const initGetArticleBySlug = async (articleSlug: string) => {
  try {
    const response = await makeFetchRequest(getArticleBySlug, {
      pathVariables: {
        articleSlug,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export interface IGetRelatedArticlesByCategorySlugRequestData {
  articleId: string;
  categorySlug: string;
}

export const initGetRelatedArticlesByCategorySlug = async (
  requestData: IGetRelatedArticlesByCategorySlugRequestData
) => {
  try {
    const response = await makeFetchRequest(getRelatedArticlesByCategorySlug, {
      pathVariables: {
        articleId: requestData.articleId,
        categorySlug: requestData.categorySlug,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
