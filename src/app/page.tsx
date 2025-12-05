import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle2,
  LayoutTemplate,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="flex flex-1 flex-col items-center justify-center space-y-10 py-24 text-center md:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <div className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium">
            Enterprise Standard Boilerplate
          </div>
          <h1 className="font-heading text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            Build your next big idea with{" "}
            <span className="text-primary">Next.js 15</span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            A comprehensive starter kit featuring App Router, Tailwind CSS v4,
            Shadcn UI, and a scalable folder structure designed for modern web
            applications.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild>
              <a href="#features">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://github.com/shadcn-ui/ui"
                target="_blank"
                rel="noreferrer"
              >
                Documentation
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            This boilerplate comes batteries-included with everything you need
            to ship production-ready apps.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <FeatureCard
            icon={<LayoutTemplate className="h-10 w-10" />}
            title="App Router"
            description="Built on the latest Next.js 15 App Router for optimal performance and DX."
          />
          <FeatureCard
            icon={<Zap className="h-10 w-10" />}
            title="Tailwind CSS v4"
            description="The latest utility-first CSS framework with zero runtime and modern features."
          />
          <FeatureCard
            icon={<ShieldCheck className="h-10 w-10" />}
            title="Type Safety"
            description="Strict TypeScript configuration and Zod validation for robust code."
          />
          <FeatureCard
            icon={<CheckCircle2 className="h-10 w-10" />}
            title="Shadcn UI"
            description="Beautiful, accessible components that you can copy and paste into your apps."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="flex flex-col items-center justify-center p-4 text-center hover:bg-muted/50 transition-colors">
      <CardHeader>
        <div className="mb-2 text-primary">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
