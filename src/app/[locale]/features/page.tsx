import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, LayoutTemplate, ShieldCheck, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { Header } from "@/components/shared/header";

export default function FeaturesPage() {
  const t = useTranslations("HomePage");
  const tFeature = useTranslations("Feature");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Features Section */}
      <section className="container space-y-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-232 flex-col items-center space-y-4 text-center">
          <h1 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            {t("featuresTitle")}
          </h1>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            {t("featuresDesc")}
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-5xl md:grid-cols-3">
          <FeatureCard
            icon={<LayoutTemplate className="h-10 w-10" />}
            title={tFeature("AppRouter")}
            description={tFeature("AppRouterDesc")}
          />
          <FeatureCard
            icon={<Zap className="h-10 w-10" />}
            title={tFeature("Tailwind")}
            description={tFeature("TailwindDesc")}
          />
          <FeatureCard
            icon={<ShieldCheck className="h-10 w-10" />}
            title={tFeature("TypeSafety")}
            description={tFeature("TypeSafetyDesc")}
          />
          <FeatureCard
            icon={<CheckCircle2 className="h-10 w-10" />}
            title={tFeature("Shadcn")}
            description={tFeature("ShadcnDesc")}
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
      <div className="flex flex-col items-center justify-center">
        <div className="mb-2 text-primary">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </div>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
