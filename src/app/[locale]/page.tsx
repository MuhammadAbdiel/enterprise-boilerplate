import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Header } from "@/components/shared/header";
import { Link } from "@/i18n/routing";

export default function Home() {
  const t = useTranslations("HomePage");
  const tCommon = useTranslations("Common");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="flex flex-1 flex-col items-center justify-center space-y-10 py-24 text-center md:py-32">
        <div className="container flex max-w-5xl flex-col items-center gap-4 text-center">
          <div className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium">
            Enterprise Standard Boilerplate
          </div>
          <h1 className="font-heading text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            {t("title")} <span className="text-primary">Next.js 15</span>
          </h1>
          <p className="max-w-2xl leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            {t("subtitle")}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/features">
                {tCommon("getStarted")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/articles">View Articles</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://github.com/shadcn-ui/ui"
                target="_blank"
                rel="noreferrer"
              >
                {tCommon("docs")}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
