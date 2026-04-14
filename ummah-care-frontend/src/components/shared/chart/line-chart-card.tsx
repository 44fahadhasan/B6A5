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
import { TypographyMuted } from "../typography";

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
        {data.length > 0 ? (
          <ChartContainer
            config={config}
            className="mx-auto aspect-square max-h-62.5"
          >
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
        ) : (
          <div className="flex h-62.5 flex-col items-center justify-center">
            <TypographyMuted className="text-sm">
              No data available
            </TypographyMuted>
            <TypographyMuted className="text-xs">
              Nothing to display for this period
            </TypographyMuted>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
