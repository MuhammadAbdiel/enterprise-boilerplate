import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

// Base API configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://jsonplaceholder.typicode.com";

// Create axios instance with default config
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add auth token here
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    // Log request in development
    if (process.env.NODE_ENV === "development") {
      console.log("🚀 Request:", config.method?.toUpperCase(), config.url);
    }

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Log response in development
    if (process.env.NODE_ENV === "development") {
      console.log("✅ Response:", response.status, response.config.url);
    }

    return response;
  },
  (error: AxiosError) => {
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      console.error("❌ Response Error:", error.response.status, error.message);

      // Handle specific status codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - redirect to login or refresh token
          console.error("Unauthorized access");
          break;
        case 403:
          // Forbidden
          console.error("Access forbidden");
          break;
        case 404:
          // Not found
          console.error("Resource not found");
          break;
        case 500:
          // Server error
          console.error("Server error");
          break;
        default:
          console.error("An error occurred");
      }
    } else if (error.request) {
      // Request made but no response received
      console.error("❌ Network Error:", error.message);
    } else {
      // Something else happened
      console.error("❌ Error:", error.message);
    }

    return Promise.reject(error);
  }
);

// Helper function to handle API errors
export const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";
    throw new Error(message);
  }
  throw new Error("An unexpected error occurred");
};

// Export configured axios instance
export default axiosInstance;

// Export types for convenience
export type { AxiosError, AxiosRequestConfig };
