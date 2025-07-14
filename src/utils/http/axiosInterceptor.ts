// import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
// import { toast } from "sonner";

// const axiosInstance = axios.create();

// let isHandlingTokenExpiration = false;

// axiosInstance.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const token = localStorage.getItem("prestige-auth-token");

//     if (token) {
//       try {
//         const parsedToken = JSON.parse(token);
//         if (parsedToken?.state?.authToken) {
//           config.headers.Authorization = `Bearer ${parsedToken.state.authToken}`;
//         }
//       } catch (error) {
//         console.error("Error parsing auth token:", error);
//       }
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => {
//     if (error.response?.status === 401 && !isHandlingTokenExpiration) {
//       isHandlingTokenExpiration = true;

//       try {

//         localStorage.removeItem("prestige-auth-token");

//         toast.error("Your session has expired. You have been logged out.");

//         const currentPath = window.location.pathname;
//         if (!currentPath.includes(paths.loginPath())) {
//           customWindowReplace(paths.loginPath());
//         }
//       } catch (e: any) {
//         toast.error("Error handling token expiration:", e);
//       } finally {
//         setTimeout(() => {
//           isHandlingTokenExpiration = false;
//         }, 1000);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
