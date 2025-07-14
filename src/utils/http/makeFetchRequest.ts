import {
  APIRequestDetail,
  IApiDetails,
  RequestAuthType,
  RequestBodyType,
  RequestMethod,
  BASE_URL,
} from "@/interfaces/http.interface";

import { sanitizeController } from "./sanitizeController";

// import { transformRequestData } from "./transformRequestData";

// Extended fetch configuration interface for additional options
export interface FetchRequestConfig extends RequestInit {
  // Custom timeout in milliseconds
  timeout?: number;
  // Custom base URL override
  baseURL?: string;
  // Response type expected
  responseType?: "json" | "text" | "blob" | "arrayBuffer" | "formData";
  // Whether to include credentials
  withCredentials?: boolean;
  // Custom headers to merge
  customHeaders?: Record<string, string>;
  // Whether to throw on HTTP error status codes
  throwOnError?: boolean;
  // Custom error handler
  onError?: (error: any) => void;
  // Custom retry logic
  retryAttempts?: number;
  retryDelay?: number;
  // Cache behavior - defaults to "force-cache" (static caching)
  cache?: RequestCache;
}

// Custom error class for HTTP errors
export class HTTPError extends Error {
  public status: number;
  public statusText: string;
  public response: Response;
  public data?: any;

  constructor(response: Response, data?: any) {
    super(`HTTP Error: ${response.status} ${response.statusText}`);
    this.name = "HTTPError";
    this.status = response.status;
    this.statusText = response.statusText;
    this.response = response;
    this.data = data;
  }
}

// Timeout wrapper for fetch
const fetchWithTimeout = (
  url: string,
  options: RequestInit,
  timeout: number = 10000
): Promise<Response> => {
  return Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error("Request timeout")), timeout)
    ),
  ]);
};

// Build query string from params
const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value.toString());
    }
  });
  return searchParams.toString();
};

// Parse response based on content type
const parseResponse = async (
  response: Response,
  responseType?: string
): Promise<any> => {
  if (!responseType) {
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return response.json();
    } else if (contentType?.includes("text/")) {
      return response.text();
    } else {
      return response.blob();
    }
  }

  switch (responseType) {
    case "json":
      return response.json();
    case "text":
      return response.text();
    case "blob":
      return response.blob();
    case "arrayBuffer":
      return response.arrayBuffer();
    case "formData":
      return response.formData();
    default:
      return response.json();
  }
};

// Retry logic wrapper
const withRetry = async <T>(
  fn: () => Promise<T>,
  retryAttempts: number = 0,
  retryDelay: number = 1000
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retryAttempts > 0) {
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      return withRetry(fn, retryAttempts - 1, retryDelay);
    }
    throw error;
  }
};

export const makeFetchRequest = async (
  apiDetails: IApiDetails,
  apiRequestDetails: APIRequestDetail = {},
  fetchConfig: FetchRequestConfig = {}
): Promise<any> => {
  console.log("process running");

  // Extract configuration options
  const {
    timeout = 10000,
    baseURL,
    responseType = "json",
    withCredentials = false,
    customHeaders = {},
    throwOnError = true,
    onError,
    retryAttempts = 0,
    retryDelay = 1000,
    cache = "force-cache",
    ...fetchOptions
  } = fetchConfig;

  // Sanitize controller with path variables
  const sanitizedRequestDetails = sanitizeController(
    apiDetails,
    apiRequestDetails.pathVariables
  );
  const { controllerName, requestMethod = RequestMethod.GET } =
    sanitizedRequestDetails;

  // Transform request data based on body type
  // const transformedData = transformRequestData(
  //   apiDetails,
  //   apiRequestDetails.requestData
  // );

  const transformedData = apiRequestDetails.requestData;

  // Determine base URL
  const finalBaseURL = "https://api.prestigejournalmedia.com/v1";

  // Build URL with query parameters
  let url = `${finalBaseURL}/${controllerName}`;
  if (apiRequestDetails.params) {
    const queryString = buildQueryString(apiRequestDetails.params);
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  // Determine authentication and credentials
  const authType = apiDetails.requestAuthType || RequestAuthType.AUTH;
  const includeCredentials =
    withCredentials || authType === RequestAuthType.AUTH;

  // Setup headers
  const headers: Record<string, string> = {
    ...customHeaders,
  };

  // Set content type based on request body type
  if (apiDetails.requestBodyType === RequestBodyType.FORMDATA) {
    // Don't set Content-Type for FormData, let the browser set it with boundary
  } else if (transformedData && requestMethod !== RequestMethod.GET) {
    headers["Content-Type"] = "application/json";
  }

  // Add authentication headers if needed
  if (authType === RequestAuthType.AUTH) {
    // const token = apiRequestDetails.initialAuthToken ||
    //   (typeof window !== "undefined" && localStorage.getItem("prestige-auth-token"));
    // if (token) {
    //   headers["Authorization"] = `Bearer ${token}`;
    // }
  }

  // Prepare request body
  let body: any = undefined;
  if (
    transformedData &&
    requestMethod !== RequestMethod.GET &&
    requestMethod !== RequestMethod.HEAD
  ) {
    if (apiDetails.requestBodyType === RequestBodyType.FORMDATA) {
      body = transformedData; // Already FormData from transformRequestData
    } else {
      body = JSON.stringify(transformedData);
    }
  }

  // Build fetch options
  const requestOptions: RequestInit = {
    method: requestMethod,
    headers,
    body,
    credentials: includeCredentials ? "include" : "omit",
    cache,
    ...fetchOptions,
  };

  // Execute request with retry logic
  const executeRequest = async (): Promise<any> => {
    try {
      const response = await fetchWithTimeout(url, requestOptions, timeout);

      // Handle HTTP errors
      if (!response.ok) {
        let errorData: any;
        try {
          errorData = await parseResponse(response, responseType);
        } catch {
          errorData = null;
        }

        const httpError = new HTTPError(response, errorData);

        // Handle specific error formats (matching axios implementation)
        if (errorData?.data && Array.isArray(errorData.data)) {
          const errorMessages: any[] = errorData.data;
          throw {
            message: "Validation failed",
            errorMessages,
            status: response.status,
            statusText: response.statusText,
          };
        }

        const errorMsg =
          errorData?.message ||
          response.statusText ||
          "An unexpected error occurred.";

        if (throwOnError) {
          throw {
            message: errorMsg,
            status: response.status,
            statusText: response.statusText,
            response: errorData,
          };
        }

        return {
          error: true,
          message: errorMsg,
          status: response.status,
          data: errorData,
        };
      }

      // Parse successful response
      return await parseResponse(response, responseType);
    } catch (error: any) {
      // Custom error handling
      if (onError) {
        onError(error);
      }

      // Handle network errors and other exceptions
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        throw {
          message: "Network error - please check your connection",
          originalError: error,
        };
      }

      if (error.message === "Request timeout") {
        throw {
          message: "Request timed out",
          originalError: error,
        };
      }

      // Re-throw formatted errors
      if (error.message && (error.status || error.errorMessages)) {
        throw error;
      }

      // Handle unknown errors
      throw {
        message: "Something went wrong.",
        originalError: error,
      };
    }
  };

  // Execute with retry logic if specified
  if (retryAttempts > 0) {
    return withRetry(executeRequest, retryAttempts, retryDelay);
  }

  return executeRequest();
};

// Convenience methods for common HTTP operations
export const fetchGet = (
  url: string,
  params?: Record<string, any>,
  config?: FetchRequestConfig
) => {
  return makeFetchRequest(
    {
      controllerName: url,
      requestMethod: RequestMethod.GET,
    },
    { params },
    config
  );
};

export const fetchPost = (
  url: string,
  data?: any,
  config?: FetchRequestConfig
) => {
  return makeFetchRequest(
    {
      controllerName: url,
      requestMethod: RequestMethod.POST,
    },
    { requestData: data },
    config
  );
};

export const fetchPut = (
  url: string,
  data?: any,
  config?: FetchRequestConfig
) => {
  return makeFetchRequest(
    {
      controllerName: url,
      requestMethod: RequestMethod.PUT,
    },
    { requestData: data },
    config
  );
};

export const fetchPatch = (
  url: string,
  data?: any,
  config?: FetchRequestConfig
) => {
  return makeFetchRequest(
    {
      controllerName: url,
      requestMethod: RequestMethod.PATCH,
    },
    { requestData: data },
    config
  );
};

export const fetchDelete = (url: string, config?: FetchRequestConfig) => {
  return makeFetchRequest(
    {
      controllerName: url,
      requestMethod: RequestMethod.DELETE,
    },
    {},
    config
  );
};

// Export a configured instance with default settings
export const createFetchInstance = (defaultConfig: FetchRequestConfig = {}) => {
  return {
    request: (
      apiDetails: IApiDetails,
      apiRequestDetails?: APIRequestDetail,
      config?: FetchRequestConfig
    ) =>
      makeFetchRequest(apiDetails, apiRequestDetails, {
        ...defaultConfig,
        ...config,
      }),
    get: (
      url: string,
      params?: Record<string, any>,
      config?: FetchRequestConfig
    ) => fetchGet(url, params, { ...defaultConfig, ...config }),
    post: (url: string, data?: any, config?: FetchRequestConfig) =>
      fetchPost(url, data, { ...defaultConfig, ...config }),
    put: (url: string, data?: any, config?: FetchRequestConfig) =>
      fetchPut(url, data, { ...defaultConfig, ...config }),
    patch: (url: string, data?: any, config?: FetchRequestConfig) =>
      fetchPatch(url, data, { ...defaultConfig, ...config }),
    delete: (url: string, config?: FetchRequestConfig) =>
      fetchDelete(url, { ...defaultConfig, ...config }),
  };
};

// Default instance with common settings
export const fetchInstance = createFetchInstance({
  timeout: 10000,
  throwOnError: true,
  responseType: "json",
});
