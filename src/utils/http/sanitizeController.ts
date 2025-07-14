import { IApiDetails, PrimitiveType } from "@/interfaces/http.interface";

export const sanitizeController = (
  apiDetails: IApiDetails,
  pathVariables?: { [key: string]: PrimitiveType }
) => {
  return pathVariables && Object.keys(pathVariables).length
    ? {
        ...apiDetails,
        controllerName: Object.entries(pathVariables).reduce(
          (acc, [key, value]) =>
            (acc = acc.replace(`{${key}}`, value?.toString())),
          apiDetails.controllerName
        ),
      }
    : apiDetails;
};

// import { IApiDetails, PrimitiveType } from "@/interface/schemas/http.schema";

// export const sanitizeController = (
//   apiDetails: IApiDetails,
//   pathVariables?: { [key: string]: PrimitiveType }
// ) => {
//   return pathVariables && Object.keys(pathVariables).length
//     ? {
//         ...apiDetails,
//         controllerName: Object.entries(pathVariables).reduce(
//           (acc, [key, value]) =>
//             acc.endsWith("/") // Check if trailing slash exists
//               ? `${acc}${value?.toString()}`
//               : `${acc}/${value?.toString()}`,
//           apiDetails.controllerName
//         ),
//       }
//     : apiDetails;
// };
