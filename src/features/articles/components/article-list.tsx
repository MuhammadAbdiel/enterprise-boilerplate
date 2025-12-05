'use client'

import { useArticles } from '../hooks/use-articles'
import { ArticleCard } from './article-card'
import { Skeleton } from '@/components/ui/skeleton'

export function ArticleList() {
  const { data: articles, isLoading, error } = useArticles()

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading articles: {error.message}
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles?.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}
