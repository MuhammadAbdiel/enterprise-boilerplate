# 🚀 TanStack Query & Zustand Integration Guide

## 📋 Overview

This project demonstrates the integration of **TanStack Query** (React Query) for server state management and **Zustand** for client state management in a Next.js 15 application.

## 🎯 Implementation Summary

### 1. **TanStack Query Setup**

#### Installation

```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

#### Provider Configuration

- **File**: `src/providers/query-provider.tsx`
- **Features**:
  - QueryClient with default options (1-minute stale time)
  - React Query DevTools for debugging
  - Wrapped in layout for global access

### 2. **Zustand Stores**

#### Installation

```bash
npm install zustand
```

#### Stores Created:

##### a. User Store (`src/stores/user-store.ts`)

- **Purpose**: Manage selected user state
- **Features**:
  - Persist middleware (localStorage)
  - DevTools integration
  - CRUD operations for users

##### b. Filter Store (`src/stores/filter-store.ts`)

- **Purpose**: Manage search and sort filters
- **Features**:
  - Search query state
  - Sort by (name, email, company)
  - Sort order (asc, desc)

##### c. UI Store (`src/stores/ui-store.ts`)

- **Purpose**: Manage UI state (sidebar, modals)
- **Features**:
  - Sidebar toggle
  - Modal open/close
  - Modal content management

## 🔥 Features Implemented

### 1. **Articles Feature (Refactored)**

- **Location**: `src/features/articles/`
- **Changes**:
  - Converted from Server Component to Client Component
  - Uses `useArticles` hook with TanStack Query
  - Automatic loading and error states
  - Data caching and refetching

**Files**:

- `hooks/use-articles.ts` - Custom hook for fetching articles
- `components/article-list.tsx` - Client component with query

### 2. **User Management Feature (New)**

- **Location**: `src/features/users/`
- **Demonstrates**:
  - Full CRUD operations with TanStack Query mutations
  - Real-time statistics computed from query data
  - Client-side filtering and sorting with Zustand
  - Optimistic updates
  - Toast notifications on mutations

**Components**:

- `user-list.tsx` - List with filtering/sorting
- `user-card.tsx` - Individual user card
- `user-filters.tsx` - Search and sort controls
- `user-stats.tsx` - Real-time statistics

**Hooks**:

- `useUsers()` - Fetch all users
- `useUser(id)` - Fetch single user
- `useCreateUser()` - Create mutation
- `useUpdateUser()` - Update mutation
- `useDeleteUser()` - Delete mutation

## 🎨 Key Patterns

### TanStack Query Pattern

```typescript
// Custom hook
export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};

// Mutation with optimistic updates
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully!");
    },
  });
};
```

### Zustand Pattern

```typescript
// Store definition
export const useFilterStore = create<FilterState>()(
  devtools((set) => ({
    searchQuery: "",
    setSearchQuery: (query) => set({ searchQuery: query }),
  }))
);

// Usage in component
const { searchQuery, setSearchQuery } = useFilterStore();
```

### Combined Pattern (Query + Store)

```typescript
// Fetch data with TanStack Query
const { data: users } = useUsers();

// Get filter state from Zustand
const { searchQuery, sortBy } = useFilterStore();

// Compute filtered data
const filtered = useMemo(() => {
  return users?.filter(/* ... */).sort(/* ... */);
}, [users, searchQuery, sortBy]);
```

## 📁 Project Structure

```
src/
├── app/
│   └── [locale]/
│       ├── page.tsx              # Home page
│       ├── features/page.tsx     # Features page
│       ├── articles/page.tsx     # Articles page
│       └── users/page.tsx        # User management page
├── features/
│   ├── articles/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   └── users/
│       ├── components/
│       │   ├── user-list.tsx
│       │   ├── user-card.tsx
│       │   ├── user-filters.tsx
│       │   └── user-stats.tsx
│       ├── hooks/
│       │   └── use-users.ts
│       ├── services/
│       │   └── api.ts
│       └── types/
│           └── index.ts
├── stores/
│   ├── user-store.ts
│   ├── filter-store.ts
│   └── ui-store.ts
└── providers/
    ├── query-provider.tsx
    └── theme-provider.tsx
```

## 🚀 Usage Examples

### Fetching Data

```typescript
const { data, isLoading, error } = useUsers();
```

### Mutations

```typescript
const deleteMutation = useDeleteUser();
deleteMutation.mutate(userId);
```

### State Management

```typescript
const selectedUser = useUserStore((state) => state.selectedUser);
const setSelectedUser = useUserStore((state) => state.setSelectedUser);
```

## 🎯 Benefits

### TanStack Query

- ✅ Automatic caching and background refetching
- ✅ Loading and error states out of the box
- ✅ Optimistic updates
- ✅ DevTools for debugging
- ✅ Request deduplication

### Zustand

- ✅ Minimal boilerplate
- ✅ No providers needed (except for persistence)
- ✅ TypeScript support
- ✅ DevTools integration
- ✅ Middleware support (persist, devtools)

## 🔧 DevTools

### React Query DevTools

- Press the React Query icon in the bottom corner
- View all queries and their states
- Manually trigger refetches
- Inspect cache

### Zustand DevTools

- Open Redux DevTools extension
- View state changes
- Time-travel debugging

## 📚 Learn More

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Zustand Docs](https://zustand-demo.pmnd.rs/)
- [Next.js Docs](https://nextjs.org/docs)
