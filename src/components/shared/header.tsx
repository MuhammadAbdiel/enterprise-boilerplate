import { Zap } from 'lucide-react'
import { LanguageSwitcher } from './language-switcher'
import { ModeToggle } from './mode-toggle'
import { Link } from '@/i18n/routing'

export function Header() {
  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-14 items-center justify-between px-12">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Zap className="h-5 w-5 fill-yellow-500 text-yellow-500" />
          <span>EnterpriseApp</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/features"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Features
          </Link>
          <Link
            href="/articles"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Articles
          </Link>
          <Link
            href="/users"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Users
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ModeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}
