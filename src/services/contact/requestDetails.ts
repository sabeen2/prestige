import { RequestAuthType, RequestMethod } from "@/interfaces/http.interface";

const contact = {
  sendContactMessage: {
    controllerName: `contacts`,
    requestMethod: RequestMethod.POST,
    queryKeyName: "SEND_CONTACT_MESSAGE",
    requestAuthType: RequestAuthType.NOAUTH,
  },
};

export default contact;
