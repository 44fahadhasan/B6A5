"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

type Series = {
  key: string;
  colorVar: string;
};

type Props<T> = {
  title: string;
  description?: string;
  data: T[];
  config: ChartConfig;
  xKey: string;
  series: Series[];
};

export function LineChartCard<T>({
  title,
  description,
  data,
  config,
  xKey,
  series,
}: Props<T>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent>
        <ChartContainer config={config}>
          <LineChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey={xKey} />
            <ChartTooltip content={<ChartTooltipContent />} />
            {series.map((s) => (
              <Line
                key={s.key}
                dataKey={s.key}
                stroke={`var(--color-${s.key})`}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
