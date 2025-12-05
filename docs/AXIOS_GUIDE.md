# 🔧 Axios Configuration Guide

## 📋 Overview

This project uses **Axios** as the HTTP client for all API requests. The configuration is centralized in `src/lib/axios.ts` for consistent behavior across all services.

## 🚀 Setup

### Installation

```bash
npm install axios
```

### Configuration File

**Location**: `src/lib/axios.ts`

## 🎯 Features

### 1. **Centralized Configuration**

- Single axios instance for the entire app
- Base URL configuration from environment variables
- Default timeout (10 seconds)
- Default headers (Content-Type: application/json)

### 2. **Request Interceptor**

- Automatic auth token injection (ready for implementation)
- Request logging in development mode
- Error handling for failed requests

### 3. **Response Interceptor**

- Response logging in development mode
- Automatic error handling for different status codes:
  - `401` - Unauthorized (ready for redirect to login)
  - `403` - Forbidden
  - `404` - Not Found
  - `500` - Server Error
- Network error handling

## 📁 File Structure

```
src/
├── lib/
│   └── axios.ts              # Centralized axios configuration
└── features/
    ├── articles/
    │   └── services/
    │       └── api.ts        # Articles API using axios
    └── users/
        └── services/
            └── api.ts        # Users API using axios
```

## 🔑 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
```

**Default**: If not set, defaults to `https://jsonplaceholder.typicode.com`

## 💻 Usage Examples

### Basic GET Request

```typescript
import axiosInstance from "@/lib/axios";

export const getUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get<User[]>("/users");
  return response.data;
};
```

### GET with Query Parameters

```typescript
export const getArticles = async (): Promise<Article[]> => {
  const response = await axiosInstance.get<Article[]>("/posts", {
    params: { _limit: 6 },
  });
  return response.data;
};
```

### POST Request

```typescript
export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const response = await axiosInstance.post<User>("/users", user);
  return response.data;
};
```

### PATCH Request

```typescript
export const updateUser = async (
  id: number,
  user: Partial<User>
): Promise<User> => {
  const response = await axiosInstance.patch<User>(`/users/${id}`, user);
  return response.data;
};
```

### DELETE Request

```typescript
export const deleteUser = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/users/${id}`);
};
```

## 🔐 Adding Authentication

To add authentication tokens to all requests, uncomment and modify the request interceptor:

```typescript
// In src/lib/axios.ts
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

## 🎨 Custom Headers

Add custom headers for specific requests:

```typescript
const response = await axiosInstance.get("/users", {
  headers: {
    "X-Custom-Header": "value",
  },
});
```

## ⚙️ Request Configuration

Override default configuration per request:

```typescript
const response = await axiosInstance.get("/users", {
  timeout: 5000,           // Override default timeout
  params: { page: 1 },     // Query parameters
  headers: { ... },        // Custom headers
});
```

## 🐛 Error Handling

Errors are automatically handled by the response interceptor. In your components/hooks:

```typescript
// TanStack Query automatically catches errors
export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers, // Errors propagate to onError
  });
};

// Manual error handling
try {
  const users = await getUsers();
} catch (error) {
  if (axios.isAxiosError(error)) {
    console.error(error.response?.data);
  }
}
```

## 📊 Logging

### Development Mode

All requests and responses are logged to console:

- 🚀 Request: `GET /users`
- ✅ Response: `200 /users`
- ❌ Error: `404 /users/999`

### Production Mode

Logging is automatically disabled in production.

## 🔄 Migration from Fetch

### Before (Fetch)

```typescript
export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};
```

### After (Axios)

```typescript
export const getUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get<User[]>("/users");
  return response.data;
};
```

## ✅ Benefits

1. **Cleaner Code**: Less boilerplate compared to fetch
2. **Type Safety**: Full TypeScript support with generics
3. **Automatic JSON Parsing**: No need for `.json()`
4. **Better Error Handling**: Automatic error throwing for non-2xx responses
5. **Interceptors**: Centralized request/response modification
6. **Request Cancellation**: Built-in support (AbortController)
7. **Progress Tracking**: Upload/download progress events
8. **CSRF Protection**: Built-in XSRF token handling

## 🔧 Advanced Configuration

### Retry Logic

```typescript
import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
});
```

### Request Cancellation

```typescript
const controller = new AbortController();

const response = await axiosInstance.get("/users", {
  signal: controller.signal,
});

// Cancel request
controller.abort();
```

## 📚 Learn More

- [Axios Documentation](https://axios-http.com/docs/intro)
- [Axios GitHub](https://github.com/axios/axios)
- [TanStack Query + Axios](https://tanstack.com/query/latest/docs/react/guides/query-functions)
