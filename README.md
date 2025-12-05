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
│   └── auth/             # Example feature
│       ├── components/
│       ├── hooks/
│       └── utils/
├── hooks/                # Global custom hooks
├── lib/                  # Utility functions and shared libraries
├── providers/            # Global providers (Theme, Auth, etc.)
├── services/             # API services and data fetching (Server Actions / API clients)
├── types/                # Global TypeScript definitions
└── utils/                # Helper functions
```

## Features

- **Next.js 15**: Latest App Router features.
- **Tailwind CSS v4**: Modern styling with zero runtime.
- **Shadcn UI**: Accessible, customizable components.
- **Theme Provider**: Dark mode support via `next-themes`.
- **Sonner**: Stacked toast notifications.
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

## Enterprise Patterns

- **Feature-First Architecture**: Code related to a specific feature (like "authentication" or "dashboard") is co-located in `src/features`.
- **Shared Components**: Generic UI components live in `src/components/ui` (shadcn) or `src/components/shared`.
- **Providers**: Global state and context providers are wrapped in `src/providers` and consumed in `src/app/layout.tsx`.
