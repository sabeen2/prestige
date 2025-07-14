import { RequestAuthType, RequestMethod } from "@/interfaces/http.interface";

const webInfo = {
  getWebsiteStats: {
    controllerName: `article-stats`,
    requestMethod: RequestMethod.GET,
    queryKeyName: "ARTICLE_STATS",
    requestAuthType: RequestAuthType.NOAUTH,
  },
};

export default webInfo;
