import { makeFetchRequest } from "@/utils/http/makeFetchRequest";
import { apiList } from "../api-list";

const { getWebsiteStats } = apiList.webInfo;

export interface ISendContactMessageRequestData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const initGetWebsiteStats = async () => {
  try {
    const response = await makeFetchRequest(getWebsiteStats);
    return response;
  } catch (error) {
    return error;
  }
};
