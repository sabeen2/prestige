// import {
//   APIRequestDetail,
//   IApiDetails,
//   RequestAuthType,
//   RequestBodyType,
// } from "@/interfaces/http.interface";
// import axios, { AxiosError, AxiosRequestConfig } from "axios";

// import { sanitizeController } from "./sanitizeController";
// import { transformRequestData } from "./transformRequestData";

// export const axiosInstance = axios.create();

// export const makeHttpRequest = async (
//   apiDetails: IApiDetails,
//   apiRequestDetails: APIRequestDetail = {}
// ): Promise<any> => {
//   // const token =
//   //   typeof window !== "undefined" && localStorage.getItem("prestige-auth-token");

//   const sanitizedRequestDetails = sanitizeController(
//     apiDetails,
//     apiRequestDetails.pathVariables
//   );
//   const { controllerName, requestMethod } = sanitizedRequestDetails;

//   const transformedData = transformRequestData(
//     apiDetails,
//     apiRequestDetails.requestData
//   );
//   const baseApiEndpoint = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT || "";

//   let config: AxiosRequestConfig = {
//     baseURL: baseApiEndpoint,
//     url: `/${controllerName}`,
//     method: requestMethod,
//     responseType: "json",

//     headers: {
//       "Content-Type":
//         apiDetails.requestBodyType === RequestBodyType.FORMDATA
//           ? "multipart/form-data"
//           : "application/json",
//     },

//     data: transformedData,
//   };

//   const authType = apiDetails.requestAuthType || RequestAuthType.AUTH;

//   config.withCredentials = authType === RequestAuthType.AUTH;

//   if (apiRequestDetails.params) {
//     config = {
//       ...config,
//       params: apiRequestDetails.params,
//     };
//   }

//   try {
//     // const res = await axios.request(config);
//     const res = await axiosInstance.request(config);
//     return res.data;
//   } catch (error: any) {
//     if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError<any>;

//       if (
//         axiosError.response?.data?.data &&
//         Array.isArray(axiosError.response.data.data)
//       ) {
//         const errorMessages: any[] = axiosError.response.data.data;
//         throw {
//           message: "Validation failed",
//           errorMessages,
//         };
//       }

//       const errorMsg =
//         axiosError.response?.data?.message ||
//         axiosError.message ||
//         "An unexpected error occurred.";

//       throw {
//         message: errorMsg,
//       };
//     } else {
//       throw {
//         message: "Something went wrong.",
//       };
//     }
//   }
// };
