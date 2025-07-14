import { RequestAuthType, RequestMethod } from "@/interfaces/http.interface";

const adsPrefix = "ads";

const ads = {
  getAds: {
    controllerName: `${adsPrefix}`,
    requestMethod: RequestMethod.GET,
    queryKeyName: "GET_ADS",
    requestAuthType: RequestAuthType.NOAUTH,
  },
  getAdsById: {
    controllerName: `${adsPrefix}/{adsId}`,
    requestMethod: RequestMethod.GET,
    queryKeyName: "GET_ADS_BY_ID",
    requestAuthType: RequestAuthType.NOAUTH,
  },
};

export default ads;
