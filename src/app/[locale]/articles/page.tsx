import { useTranslations } from 'next-intl'
import { Header } from '@/components/shared/header'
import { ArticleList } from '@/features/articles/components/article-list'

export default function ArticlesPage() {
  const tArticles = useTranslations('Articles')

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Articles Section */}
      <section className="container px-12 py-12 md:py-24">
        <div className="mb-8 flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">
            {tArticles('title')}
          </h1>
          <p className="text-muted-foreground">{tArticles('loading')}</p>
        </div>
        <ArticleList />
      </section>
    </div>
  )
}
