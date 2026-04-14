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
import { LabelList, Pie, PieChart } from "recharts";
import { TypographyMuted } from "../typography";

type Props<T> = {
  title: string;
  description?: string;
  data: T[];
  config: ChartConfig;
  dataKey: keyof T & string;
  nameKey: keyof T & string;
};

export function PieChartCard<T>({
  title,
  description,
  data,
  config,
  dataKey,
  nameKey,
}: Props<T>) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        {data.length > 0 ? (
          <ChartContainer
            config={config}
            className="mx-auto aspect-square max-h-62.5"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />

              <Pie data={data} dataKey={dataKey} nameKey={nameKey}>
                <LabelList dataKey={nameKey} className="fill-background" />
              </Pie>
            </PieChart>
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
