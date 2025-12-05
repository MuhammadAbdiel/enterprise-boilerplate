export const SITE_CONFIG = {
  name: "Enterprise Boilerplate",
  description: "A Next.js 15 + Tailwind CSS v4 + Shadcn UI boilerplate",
  url: "https://example.com",
  ogImage: "https://example.com/og.jpg",
  links: {
    twitter: "https://twitter.com/example",
    github: "https://github.com/example/repo",
  },
};

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "https://api.example.com",
  timeout: 10000,
};
