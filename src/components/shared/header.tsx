import { Zap } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
import { ModeToggle } from "./mode-toggle";
import { Link } from "@/i18n/routing";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-14 px-12 items-center justify-between">
        <Link href="/" className="font-bold flex items-center gap-2">
          <Zap className="h-5 w-5 fill-yellow-500 text-yellow-500" />
          <span>EnterpriseApp</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/features"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="/articles"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Articles
          </Link>
          <Link
            href="/users"
            className="text-sm font-medium transition-colors hover:text-primary"
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
  );
}
