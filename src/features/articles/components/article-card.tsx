import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Article } from "../types";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl capitalize line-clamp-1">
          {article.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{article.body}</p>
      </CardContent>
    </Card>
  );
}
