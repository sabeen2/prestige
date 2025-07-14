import { makeFetchRequest } from "@/utils/http/makeFetchRequest";
import { apiList } from "../api-list";

const { getCategories, getArticlesByCategorySlug } = apiList.categories;

export const initGetCategories = async () => {
  try {
    const response = await makeFetchRequest(getCategories, {
      params: {
        page: 1,
        limit: 100,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const initGetArticlesByCategorySlug = async (categorySlug: string) => {
  try {
    const response = await makeFetchRequest(getArticlesByCategorySlug, {
      params: {
        page: 1,
        limit: 100,
      },
      pathVariables: {
        categorySlug,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
