import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Flag to prevent looping redirects
let isRedirecting = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If 401 Unauthorized = token expired/invalid
    if (error.response?.status === 401 && !isRedirecting) {
      if (typeof window !== "undefined" && window.location.pathname !== "/login") {
        isRedirecting = true;
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
