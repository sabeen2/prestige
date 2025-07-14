import { makeFetchRequest } from "@/utils/http/makeFetchRequest";
import { apiList } from "../api-list";

const { sendContactMessage } = apiList.contact;

export interface ISendContactMessageRequestData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const initSendContactMessage = async (
  requestData: ISendContactMessageRequestData
) => {
  console.log("requestData", requestData);
  try {
    const response = await makeFetchRequest(sendContactMessage, {
      requestData,
    });
    return response;
  } catch (error) {
    return error;
  }
};
