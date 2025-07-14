import { CancelTokenSource, Method } from "axios";

export type PrimitiveType = string | boolean | number;

export type RequestDataType = any;

export enum UploadFileType {
  ARRAY = "ARRAY",
  FILE = "FILE",
}

export interface IServerSideParams {
  currentPageIndex?: number;
  numberOfElements?: number;
  totalElements?: number;
  totalPages?: number;
}

export interface IGenericPaginatedResponse<T> extends IServerSideParams {
  content: T[];
}

export enum RequestMethod {
  GET = "GET",
  DELETE = "DELETE",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  PURGE = "PURGE",
  LINK = "LINK",
  UNLINK = "UNLINK",
}

export enum RequestBodyType {
  /** If request id in application/x-www-form-urlencoded as string */
  QUERYSTRING = "QUERY-STRING",
  /** If request is in formdata */
  FORMDATA = "FORM-DATA",

  FILE = "FILE",
}

export enum RequestAuthType {
  /** If request requires Bearer */
  AUTH = "AUTH",
  /** If request is open but needs basic auth */
  NOAUTH = "NO-AUTH",
  /** If request is open and needs no auth */
  NOBASICAUTH = "NO-BASIC-AUTH",
}

export enum MultipleUploadType {
  ARRAY = "ARRAY",
  FILE = "FILE",
}

export enum BASE_URL {
  BASE_URL = "BASE_URL",
  NEXTJS_API = "NEXTJS_API",
}

export interface IApiDetails {
  /** Request API URI */
  controllerName: string;
  /** Request Method; Defaults as GET */
  requestMethod?: RequestMethod;
  /** Request Body Type */
  requestBodyType?: RequestBodyType;
  requestAuthType?: RequestAuthType;
  queryKeyName?: string;
  baseUrl?: BASE_URL;
}

export interface RequestParam {
  [key: string]: PrimitiveType | undefined;
}

export interface APIRequestDetail {
  /** Request data for the API */
  requestData?: RequestDataType;
  /** REST API Method
   *
   * This will override requestMethod provided by apiDetails
   */
  requestMethod?: Method;
  /** Path variables present in controller
   *
   * Provided pathVariables -> {id: 1, type: 'test'}
   * Converts controller-url/{id}/{type} -> controller-url/1/test
   */
  pathVariables?: { [key: string]: PrimitiveType };
  /** Request params
   *
   * Provided params -> {id: 1, type: 'test'}
   * Converts controller-url -> controller-url?id=1&type=test
   */
  params?: RequestParam;
  /** Axios cancel token source */
  cancelSource?: CancelTokenSource;
  /** Disable Success Toast */
  disableSuccessToast?: boolean;
  /** Disable Failure Toast */
  disableFailureToast?: boolean;
  enableSuccessToast?: boolean;
  initialAuthToken?: string;
  /** Multiple Upload Type */
  arrayUploadKeys?: string[];
}

export interface IGenericPaginatedRequest {
  page: number;
  row: number;
  name?: string;
}
