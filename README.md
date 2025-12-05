# Enterprise Next.js Starter

This project is initialized with Next.js 15 (App Router), Tailwind CSS v4, and Shadcn UI. It follows an enterprise-standard folder structure and best practices.

## Folder Structure

```
src/
├── app/                  # App Router pages and layouts
├── components/
│   ├── ui/               # Reusable UI components (Shadcn)
│   ├── shared/           # Shared components used across features
│   └── feature-name/     # Feature-specific components (optional, or use features/ dir)
├── features/             # Feature-based modules (Domain Driven Design)
│   ├── articles/         # Articles feature with TanStack Query
│   └── users/            # User management with CRUD operations
│       ├── components/
│       ├── hooks/        # TanStack Query hooks
│       ├── services/     # API services using Axios
│       └── types/
├── hooks/                # Global custom hooks
├── lib/
│   ├── axios.ts          # Centralized Axios configuration
│   └── utils.ts          # Utility functions
├── providers/            # Global providers (Theme, Query, etc.)
│   ├── query-provider.tsx    # TanStack Query provider
│   └── theme-provider.tsx    # Theme provider
├── services/             # API services and data fetching
├── stores/               # Zustand stores for state management
│   ├── user-store.ts     # User state with persistence
│   ├── filter-store.ts   # Filter state
│   └── ui-store.ts       # UI state (modals, sidebar)
├── types/                # Global TypeScript definitions
└── utils/                # Helper functions
```

## Features

- **Next.js 15**: Latest App Router features.
- **Tailwind CSS v4**: Modern styling with zero runtime.
- **Shadcn UI**: Accessible, customizable components.
- **Localization (i18n)**: Built-in support for EN, ID, JP using `next-intl`.
- **Theme Provider**: Dark mode support via `next-themes`.
- **Sonner**: Stacked toast notifications.
- **Axios**: Centralized HTTP client with interceptors. [📖 Guide](./AXIOS_GUIDE.md)
- **TanStack Query**: Server state management with caching and mutations.
- **Zustand**: Lightweight client state management with DevTools.
- **Strict TypeScript**: Type safety.
- **ESLint**: Code quality.

## Getting Started

1.  **Install dependencies**:

    ```bash
    npm install
    ```

2.  **Run development server**:

    ```bash
    npm run dev
    ```

3.  **Environment Variables** (Optional):
    Create `.env.local` file:
    ```env
    NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
    ```

## Enterprise Patterns

- **Feature-First Architecture**: Code related to a specific feature (like "authentication" or "dashboard") is co-located in `src/features`.
- **Shared Components**: Generic UI components live in `src/components/ui` (shadcn) or `src/components/shared`.
- **Providers**: Global state and context providers are wrapped in `src/providers` and consumed in `src/app/layout.tsx`.
- **Centralized API Client**: All API calls use the configured Axios instance from `src/lib/axios.ts`.
- **State Management**:
  - Server state with TanStack Query (data fetching, caching, mutations)
  - Client state with Zustand (UI state, filters, user selections)

## Documentation

- **[Axios Configuration Guide](./docs/AXIOS_GUIDE.md)** - HTTP client setup and usage
- **[API Service Template](./src/services/example-api.template.ts)** - Template for creating new API services

## Pages

- **Home** (`/`) - Landing page with hero section
- **Features** (`/features`) - Feature showcase
- **Articles** (`/articles`) - Article list with TanStack Query
- **Users** (`/users`) - User management dashboard with CRUD operations
