import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  title: string;
  value: string | number;
  description: string;
  footer: string;
  icon: React.ElementType;
  trendIcon: React.ElementType;
  trendText: string;
};

export function StatCard({
  title,
  value,
  description,
  footer,
  icon: Icon,
  trendIcon: TrendIcon,
  trendText,
}: Props) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription className="flex items-center gap-2">
          <Icon className="size-4 text-muted-foreground" />
          {title}
        </CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {value}
        </CardTitle>
        <CardAction>
          <Badge variant="outline" className="flex items-center gap-1">
            <TrendIcon className="size-3" />
            {trendText}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="font-medium">{description}</div>
        <div className="text-muted-foreground">{footer}</div>
      </CardFooter>
    </Card>
  );
}
