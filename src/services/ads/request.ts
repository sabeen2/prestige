import { makeFetchRequest } from "@/utils/http/makeFetchRequest";
import { apiList } from "../api-list";

const { getAds, getAdsById } = apiList.ads;

export const initGetAds = async (size?: string) => {
  try {
    const response = await makeFetchRequest(getAds, {
      params: {
        page: 1,
        limit: 100,
        size,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const initGetAdsById = async (adsId: string) => {
  try {
    const response = await makeFetchRequest(getAdsById, {
      pathVariables: {
        adsId,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
